const nickname = document.getElementById('nickname');
const start = document.getElementById('start');
const click = document.getElementById('click');
const bestCurrent = document.getElementById('bestCurrent');
const bestEver = document.getElementById('bestEver');
const clBestCurrent = document.getElementById('clBestCurrent');
const clBestEver = document.getElementById('clBestEver');
const emptyNicknameValue = {
    name: 'emptyNicknameValue',
    message: 'Empty nickname'
}
let clicksAmount = 0;
const timeToClick = 5000;

start.addEventListener('click', () => {
    try {
        if (nickname.value.trim() === '') {
            throw emptyNicknameValue;
        }
        clicksAmount = 0;
        setTimeout(() => {
            alert(`You clicked ${clicksAmount} times`);
            let scores = JSON.parse(sessionStorage.getItem('scores'));
            let scoresLocal = JSON.parse(localStorage.getItem('scores'));

            if (scores) {
                if (scores.hasOwnProperty(nickname.value)) {
                    if (scores[nickname.value] < clicksAmount) {
                        scores[nickname.value] = clicksAmount;
                    }
                } else {
                    scores[nickname.value] = clicksAmount;
                }
            } else {
                scores = {};
                scores[nickname.value] = clicksAmount;
            }

            if (scoresLocal) {
                if (scoresLocal.hasOwnProperty(nickname.value)) {
                    if (scores[nickname.value] > scoresLocal[nickname.value]) {
                        scoresLocal[nickname.value] = clicksAmount;
                    }
                } else {
                    scoresLocal[nickname.value] = clicksAmount;
                }
            } else {
                scoresLocal = {};
                scoresLocal[nickname.value] = clicksAmount;
            }

            sessionStorage.setItem('scores', JSON.stringify(scores));
            localStorage.setItem('scores', JSON.stringify(scoresLocal));
        }, timeToClick);
    } catch (emptyNicknameValue) {
        alert(emptyNicknameValue.message);
    }
})

click.addEventListener('click', () => {
    clicksAmount++;
})

bestCurrent.addEventListener('click', () => {
    let scores = JSON.parse(sessionStorage.getItem('scores'));
    let keys = [];
    if (scores) {
        keys = Object.keys(scores);
    }
    let highest = 0;
    for (let i of keys) {
        if (scores[i] > highest) {
            highest = scores[i];
        }
    }
    alert(`Best result is: ${highest}`);
})

bestEver.addEventListener('click', () => {
    let scoresLocal = JSON.parse(localStorage.getItem('scores'));
    let keys = [];
    let user = null;
    if (scoresLocal) {
        keys = Object.keys(scoresLocal);
    }
    let highest = 0;
    for (let i of keys) {
        if (scoresLocal[i] > highest) {
            highest = scoresLocal[i];
            user = i;
        }
    }
    alert(`Best result for the whole time is: ${highest} by ${user}`);
})

clBestCurrent.addEventListener('click', () => {
    sessionStorage.clear();
    alert('Best result is cleared');
})

clBestEver.addEventListener('click', () => {
    localStorage.clear();
    alert('Best result for the whole time is cleared');
})