function getWeekDay(date) {
    return new Date(date).toLocaleString('en-US', { weekday: 'long' });
}

/* getWeekDay(Date.now()); // "Thursday" (if today is the 22nd October)
getWeekDay(new Date(2020, 9, 22)); // "Thursday" */

function getAmountDaysToNewYear() {
    const currentDay = new Date();
    const nouvelAn = new Date(currentDay.getFullYear() + 1, 0, 1);
    const msInOneDay = 1000 * 60 * 60 * 24;
    const daysToNewYear = Math.ceil((nouvelAn.getTime() - currentDay.getTime()) / msInOneDay);
    return daysToNewYear;
}

//getAmountDaysToNewYear();

function getApprovedToPass(bday) {
    const today = new Date();
    const yearDiff = today.getFullYear() - bday.getFullYear();
    const monthDiff = today.getMonth() - bday.getMonth();
    const dayDiff = today.getDate() - bday.getDate();
    if (yearDiff > 18 || yearDiff === 18 && monthDiff >= 0 && dayDiff >= 0) {
        return 'Hello adventurer, you may pass!';
    } else {
        if (yearDiff === 18 && monthDiff === 0 && dayDiff < 0 || yearDiff === 18 && monthDiff < 0) {
            return 'Hello adventurer, you are to yang for this quest wait for few more months!';
        } else {
            let years = yearDiff;
            if (monthDiff === 0 && dayDiff < 0 || monthDiff < 0) {
                years -= 1;
            }
            return `Hello adventurer, you are to yang for this quest wait for ${18-years} years more!`;
        }
    }
}

/* const birthday17 = new Date(2004, 11, 29);
const birthday15 = new Date(2006, 11, 29);
const birthday22 = new Date(2000, 9, 22);
getApprovedToPass(birthday17);
getApprovedToPass(birthday15);
getApprovedToPass(birthday22); */

//const elementP = 'tag="p" class="text" style={color: #aeaeae;} value="Aloha!"';

function transformStringToHtml(inputStr) {
    const [tagName] = inputStr.match(new RegExp('(?<=tag=")[a-z]+(?=")', 'g'));
    const [tagValue] = inputStr.match(new RegExp('(?<=value=")[^"]+(?=")', 'g'));
    const tagAttributes = inputStr.replace(/(tag=".*?"\s)/g, '').replace(/({|}\s)/g, '"').replace(/(value=".*?")/g, '');
    return `<${tagName} ${tagAttributes}>${tagValue}</${tagName}>`;
}

//transformStringToHtml(elementP);

function isValidIdentifier(nom) {
    const regularExp = new RegExp(/^(?!\d)[a-zA-Z0-9$_]+$/g);
    const validation = regularExp.test(nom);
    return validation;
}

/* isValidIdentifier('myVar!'); // false
isValidIdentifier('myVar$'); // true
isValidIdentifier('myVar_1'); // true
isValidIdentifier('1_myVar'); // false */

const testStr = 'My name is John Smith. I am 27.';

function capitalize(strToCapitalize) {
    const regularExp = new RegExp(/\b[a-z]?/g);
    const capitalizedText = strToCapitalize.replace(regularExp, letter => letter.toUpperCase());
    return capitalizedText;
}

//capitalize(testStr); // "My Name Is John Smith. I Am 27."

function isValidPassword(password) {
    const regularExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&_]{8,}$/g);
    const validation = regularExp.test(password);
    return validation;
}

/* isValidPassword('agent007'); // false (no uppercase letter)
isValidPassword('AGENT007'); // false (no lowercase letter)
isValidPassword('AgentOOO'); // false (no numbers)
isValidPassword('Age_007'); // false (too short)
isValidPassword('Agent007'); // true */

function bubbleSort(arr) {
    let array = JSON.parse(JSON.stringify(arr));
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                let holder = array[j];
                array[j] = array[j + 1];
                array[j + 1] = holder;
            }
        }
    }
    return array;
}

//console.log(bubbleSort([7, 5, 2, 4, 3, 9]));

const inventory = [
    { name: 'milk', brand: 'happyCow', price: 2.1 },
    { name: 'chocolate', brand: 'milka', price: 3 },
    { name: 'beer', brand: 'hineken', price: 2.2 },
    { name: 'soda', brand: 'coca-cola', price: 1 }
];

function sortByItem({ item, array }) {
    return array.sort((x, y) => {
        if (x[item] > y[item]) {
            return 1;
        }
        if (x[item] < y[item]) {
            return -1;
        }
        return 0;
    });
}

//console.log(sortByItem({ item: 'name', array: inventory }));