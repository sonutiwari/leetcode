const inputRef = document.getElementById('phone');
const runTestBtn = document.getElementById('runTestBtn');
const handleRunTestButtonClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Handle empty cases.
    console.log("1. Testing if input box and label exist", inputRef === null ? 'Failed': 'Passed');
    console.assert(inputRef !== null, "Input box can not be null.");
    
    // check if input box takes non digit input value
    inputRef.value = 'a';
    inputRef.dispatchEvent(new InputEvent('input', { value: "a", data: 'a'}));
    console.log("2. Testing if input box does not accept non digit input", inputRef.value !== '' ? 'Failed': 'Passed');
    console.assert(inputRef.value === '', "Input box does not accept non digit input value")
    
    // Handle case with 3 digit input value.
    inputRef.value = '123'
    inputRef.dispatchEvent(new InputEvent('input', { value: "123", data: '123'}));
    console.log("3. Testing if input box formats the 3 digit input", inputRef.value !== '(123) ' ? 'Failed': 'Passed');
    console.assert(inputRef.value === '(123) ', "Input box formats the 3 digit input");
    
    // Handle case with 3 digit input value.
    inputRef.value += '456'
    inputRef.dispatchEvent(new InputEvent('input', { value: "456", data: '456'}));
    console.log("4. Testing if input box formats the 6 digit input", inputRef.value !== '(123) 456-' ? 'Failed': 'Passed');
    console.assert(inputRef.value === '(123) 456-', "Input box formats the 6 digit input");
    
    // Handle case with 3 digit input value.
    inputRef.value += '7890'
    inputRef.dispatchEvent(new InputEvent('input', { value: "7890", data: '7890'}));
    console.log("5. Testing if input box formats the 10 digit input", inputRef.value !== '(123) 456-7890' ? 'Failed': 'Passed');
    console.assert(inputRef.value === '(123) 456-7890', "Input box formats the 10 digit input");
}

runTestBtn.addEventListener('click', handleRunTestButtonClick);