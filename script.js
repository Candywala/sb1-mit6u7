document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('inputText');
    const output = document.getElementById('output');

    input.addEventListener('input', () => {
        output.textContent = input.value;
    });
});