import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [selection, setSelection] = useState({ selectionStart: 0, selectionEnd: 0 });

  const handleInputChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let value = event.target.value;
    const { selectionStart, selectionEnd } = event.target;
    if (value.length < inputValue.length) { // deletion case.
      console.log({ selectionStart: selectionStart, selectionEnd: selectionEnd });
      setInputValue(value);
      return;
    }
    value = value.replace(/\D/g, "");
    const length = value.length;
    if (length < 3) {
      value = value.trim();
    } else if (length === 3) {
      value = `(${value}) `
    } else if (length < 6) {
      value = `(${value.substring(0, 3)}) ${value.substring(3, length)}`;
    } else if (length === 6) {
      value = `(${value.substring(0, 3)}) ${value.substring(3, length)}-`;
    } else if (length > 6) {
      value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 10)}`
    }
    setInputValue(value)
    setSelection({
      selectionStart: Math.min(selectionStart, value.length),
      selectionEnd: Math.min(selectionEnd, value.length)
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="tel"
          id="phone"
          maxLength={16}
          placeholder="mobile number"
          autoComplete="off"
          onChange={handleInputChange}
          value={inputValue}
          selectionStart={selection.selectionStart}
          selectionEnd={selection.selectionEnd}
        />
        <div><label htmlFor="phone">(123) 456-7890</label></div>
        <button id="runTestBtn">Run Test Cases</button>
      </header>
    </div>
  );
}

export default App;
