const inputRef = document.getElementById('phone');
const handleInput = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const data = event.data;
    let value = event.target.value;
    const { selectionStart, selectionEnd } = event.target;
    if (!value) return;
    value = value.replace(/\D/g, "")
    
    if (!'1234567890'.includes(data)) {
        inputRef.value = value.substring(0, value.length - 1);
    }
    const length = value.length;
    if (length < 3) {
        inputRef.value = value;
    } else if (length === 3) {
        inputRef.value = `(${inputRef.value}) `
    } else if (length < 6) {
        inputRef.value = `(${value.substring(0, 3)}) ${value.substring(3, length)}`;
    } else if (length === 6) {
        inputRef.value = `(${value.substring(0, 3)}) ${value.substring(3, length)}-`;
    } else {
        inputRef.value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 10)}`
    }
    if (!data) {
        inputRef.selectionStart = Math.min(selectionStart, value.length);
        inputRef.selectionEnd = Math.min(selectionEnd, value.length);
    }
}
inputRef.addEventListener('input', handleInput);