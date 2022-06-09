const firstNum = parseInt(prompt('Please, enter the first number below this text.'));
const secondNum = parseInt(prompt('Please, enter the second number below this text.'));

let massiveOfNumbers = [];

if (isNaN(firstNum) || isNaN(secondNum) || firstNum > secondNum) {
    alert('Invalid input data.');
} else {
    for (let increment = firstNum + 1; increment < secondNum; increment++) {
        massiveOfNumbers.push(increment);
    }
    alert('First number: ' + firstNum + '\n' + 'Second number: ' +
        secondNum + '\n\n' + 'Numbers between: ' + massiveOfNumbers.join(' '));
}