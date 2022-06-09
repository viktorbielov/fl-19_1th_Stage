// #1
function extractCurrencyValue(param) {
    let digitellos = param.replace(/\s\w+/g, '');
    let digitellosCut = digitellos.replace(/\.\d+/g, '');
    if (digitellosCut.length >= 16) {
        digitellos = BigInt(digitellosCut);
    } else {
        digitellos = parseFloat(digitellos);
    }
    return digitellos;
}

console.log(extractCurrencyValue('120 USD')); // 120
console.log(extractCurrencyValue('1283948234720742 EUR')); // 1283948234720742n



// #2

let object = {
    name: 'Ann',
    age: 16,
    hobbies: undefined,
    degree: null,
    isChild: false,
    isTeen: true,
    isAdult: false
}

function clearObject(obj) {
    for (let key in obj) {
        if (!obj[key]) {
            delete obj[key];
        }
    }
    return obj;
}

console.log(clearObject(object)); // { name: 'Ann', age: 16, isTeen: true }


// #3

function getUnique(param) {
    return Symbol(param);
}

console.log(getUnique('Test')) // Symbol('Test')


// #4

function countBetweenTwoDays(startDate, endDate) {
    const laDateUne = Date.parse(startDate);
    const laDateDeux = Date.parse(endDate);
    const difference = laDateDeux - laDateUne;

    const leJour = difference / (1000 * 60 * 60 * 24);
    const laSemaine = Math.round(leJour / 7);
    const leMois = Math.round(leJour / 30);
    return `The difference between dates is: ${leJour} day(-s), ${laSemaine} week(-s), ${leMois} month(-s)`;
}

console.log(countBetweenTwoDays('03/22/22', '05/25/22')); // The difference between dates is: 64 day(-s), 9 week(-s), 2 month(-s)


// #5

function filterArrayWithSet(arr) {
    const sieveArrayUntilUnique = new Set(arr);
    return [...sieveArrayUntilUnique];
}

function filterArrayWithoutSet(arr) {
    const sieveArrayUntilUnique = arr.filter((leChiffre, lIndice) => arr.indexOf(leChiffre) === lIndice);
    return sieveArrayUntilUnique;
}

console.log(filterArrayWithSet([1, 2, 2, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 8, 9])); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(filterArrayWithoutSet([1, 2, 2, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 8, 9])); // [1, 2, 3, 4, 5, 6, 7, 8, 9]