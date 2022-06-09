let decision = confirm('Do you want to play a game?');
let continuePlaying = true;
let numberOfAttempts = 3;
let maxRangeNumber;

const numbersGrowth = 4;
const minRangeNumber = 0;
const multiplier = 2;
const initialRange = 8;

function play() {
    let totalGain = 0;
    let continueGame = true;
    let iter = 0;
    let numberToGuess;
    let maxGuessValue;
    let userGuess;
    const basisMaxGuessValue = 100;
    while (continueGame) {
        maxRangeNumber = initialRange + numbersGrowth * iter;
        numberToGuess = Math.floor(Math.random() * (maxRangeNumber + 1));
        maxGuessValue = basisMaxGuessValue * Math.pow(multiplier, iter);
        for (let attempt = 0; attempt < numberOfAttempts; attempt++) {
            userGuess = parseInt(prompt(`Choose a roulette pocket number from 0 to ${maxRangeNumber}
Attempts left: ${numberOfAttempts-attempt}
Total prize: ${totalGain}$
Possible prize on current attempt: ${maxGuessValue/Math.pow(multiplier, attempt)}$`));
            if (userGuess === numberToGuess) {
                switch (attempt) {
                    case 0:
                        totalGain += maxGuessValue / Math.pow(multiplier, attempt);
                        break;
                    case 1:
                        totalGain += maxGuessValue / Math.pow(multiplier, attempt);
                        break;
                    case numberOfAttempts - 1:
                        totalGain += maxGuessValue / Math.pow(multiplier, attempt);
                        break;
                    default:
                        break;
                }
                let prize = maxGuessValue / Math.pow(multiplier, attempt);
                continueGame = confirm(`Congratulation, you won! Your prize is: ${prize}$. Do you want to continue?`);
                break;
            } else {
                continue;
            }
        }
        if (userGuess === numberToGuess) {
            if (continueGame) {
                iter++;
            } else {
                alert(`Thank you for your participation. Your prize is: ${totalGain}$`);
            }
        } else {
            totalGain = 0;
            alert(`Thank you for your participation. Your prize is: ${totalGain}$`);
            continueGame = false;
        }
    }
    continuePlaying = confirm('Do you want to play again?');
}

if (!decision) {
    alert('You did not become a billionaire, but can.');
} else {
    while (continuePlaying) {
        play();
    }
}