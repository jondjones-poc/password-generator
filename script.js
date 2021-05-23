const result = document.getElementById('result');
const number = document.getElementById('number');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const symbols = document.getElementById('symbols');
const clipboard = document.getElementById('clipboard');
const generate = document.getElementById('generate');
const passwordLength = document.getElementById('password-length');

const getRandomLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

const getRandomUpper = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

const getRandomNumber = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

const getRandomSymbol = () => {
    const symbols = '!@#$%^&*()[]<>/'
    return symbols[Math.floor(Math.random() * symbols.length)]
}

const random = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
}

const generatePassword = (length, lower, upper, symbol, number) => {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const types = [{lower},{upper},{number},{symbol}].filter(item => Object.values(item)[0])

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        types.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += random[funcName]();
        });
    }

    return generatedPassword.slice(0, length);
}

generate.addEventListener('click', () => {
    const length = passwordLength.value;
    const hasLower = lowercase.checked;
    const hasUpper = uppercase.checked;
    const hasSymbol = symbols.checked;
    const hasNumber = number.checked;

    result.innerText = generatePassword(length, hasLower, hasUpper, hasSymbol, hasNumber)
})

clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = result.innerText;

    if (!password) {
        return
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Copied')

})