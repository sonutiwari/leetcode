import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

function backspace(element) {
  let actuallyTyped = element.value;
  const { selectionStart, selectionEnd } = element;

  const backspaceKey = {
    key: 'Backspace',
    code: 8,
    inputType: 'deleteContentBackward',
  };

  const sharedEventConfig = {
    key: backspaceKey.key,
    charCode: backspaceKey.code,
    keyCode: backspaceKey.code,
    which: backspaceKey.code,
    modifier: backspaceKey.modifier,
  };
  const downEvent = fireEvent.keyDown(element, sharedEventConfig);

  if (downEvent) {
    actuallyTyped = actuallyTyped.substring(0, selectionStart - 1) + actuallyTyped.substring(selectionEnd + 1, actuallyTyped.length) 

    fireEvent.input(element, {
      target: { value: actuallyTyped, selectionStart, selectionEnd },
      inputType: backspaceKey.inputType,
      bubbles: true,
      cancelable: true,
    });
  }

  fireEvent.keyUp(element, sharedEventConfig);
}

test('renders App', () => {
  render(<App />);
  const linkElement = screen.getByText(/Run Test Cases/i);
  expect(linkElement).toBeInTheDocument();
  
});

test('see if input is there', () => {
  render(<App />);
  const inputElement = document.getElementById('phone');
  expect(inputElement).toBeInTheDocument();
});

test('Input should not allow non digits', () => {
  render(<App />);
  const inputElement = document.getElementById('phone');
  fireEvent.change(inputElement, { target: { value: 'abc' } });
  expect(inputElement.value).toBe('');
});

test('check for less than 3 digit Input', () => {
  render(<App />);
  const inputElement = document.getElementById('phone');
  fireEvent.change(inputElement, { target: { value: '12' } });
  expect(inputElement.value).toBe('12');
});

test('check for 3 digit Input', () => {
  render(<App />);
  const inputElement = document.getElementById('phone');
  fireEvent.change(inputElement, { target: { value: '123' } });
  expect(inputElement.value).toBe('(123) ');
});

test('check for less than 6 digit Input', () => {
  render(<App />);
  const inputElement = document.getElementById('phone');
  fireEvent.change(inputElement, { target: { value: '12345' } });
  expect(inputElement.value).toBe('(123) 45');
});

test('check for 6 digit Input', () => {
  render(<App />);
  const inputElement = document.getElementById('phone');
  fireEvent.change(inputElement, { target: { value: '123456' } });
  expect(inputElement.value).toBe('(123) 456-');
});

test('check for less than 10 digit Input', () => {
  render(<App />);
  const inputElement = document.getElementById('phone');
  fireEvent.change(inputElement, { target: { value: '12345678' } });
  expect(inputElement.value).toBe('(123) 456-78');
});

test('check for 10 digit Input', () => {
  render(<App />);
  const inputElement = document.getElementById('phone');
  fireEvent.change(inputElement, { target: { value: '1234567890' } });
  expect(inputElement.value).toBe('(123) 456-7890');
});

test('check for more than 10 digit Input', () => {
  render(<App />);
  const inputElement = document.getElementById('phone');
  fireEvent.change(inputElement, { target: { value: '123456789012345' } });
  expect(inputElement.value).toBe('(123) 456-7890');
});

test('check for 10 digit Input', () => {
  render(<App />);
  const inputElement = document.getElementById('phone');
  fireEvent.change(inputElement, { target: { value: '1234567890' } });
  expect(inputElement.value).toBe('(123) 456-7890');
});

test('check for Delete from last', () => {
  render(<App />);
  const inputElement = document.getElementById('phone');
  fireEvent.change(inputElement, { target: { value: '1234567890' } });
  backspace(inputElement)
  expect(inputElement.value).toBe('(123) 456-789');
});

test('check for Delete from middle', () => {
  render(<App />);
  const inputElement = document.getElementById('phone');
  fireEvent.change(inputElement, { target: { value: '1234567890' } });
  inputElement.selectionStart = 5
  inputElement.selectionEnd = 6
  backspace(inputElement)
  backspace(inputElement)
  expect(inputElement.selectionStart).toBe(5);
  expect(inputElement.selectionEnd).toBe(6);
});
