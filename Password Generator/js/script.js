/*
  Project: Password Generator
  Author: Gianluca Grasso (https://github.com/gian-grasso)
  License: http://www.apache.org/licenses/LICENSE-2.0
*/

const generateBtn = document.getElementById('generate-btn');
const result = document.getElementById('result');
const copyBtn = document.getElementById('copy-btn');

const chars = {
    letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!£$%&/=@+"
};

generateBtn.addEventListener('click', () => {
    let length = parseInt(document.getElementById('length').value) || 12;
    let includeSymbols = document.getElementById('include-symbols').checked;

    let charSet = chars.letters + chars.numbers;
    if(includeSymbols) charSet += chars.symbols;

    let password = '';
    for(let i=0; i<length; i++){
        password += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }

    result.value = password;
});

copyBtn.addEventListener('click', () => {
    if(result.value){
        result.select();
        result.setSelectionRange(0, 99999);
        document.execCommand('copy');
        alert("Password copied to clipboard!");
    }
});
