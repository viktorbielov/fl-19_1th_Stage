// #1
function calculateSum(arr) {
    let accumulatte = 0;
    for (let i of arr) {
        accumulatte += i;
    }
    return accumulatte;
}

//console.log(calculateSum([1, 2, 3, 4, 5])); //15

// #2
function isTriangle(a, b, c) {
    if (a <= 0 | b <= 0 | c <= 0) {
        return false;
    } else if (a + b > c && a + c > b && c + b > a) {
        return true;
    } else {
        return false;
    }
}

//console.log(isTriangle(5, 6, 7)); //true
//console.log(isTriangle(2, 9, 3)); //false

// #3
function isIsogram(word) {
    const isTrueCondition = new Set(word.toLowerCase()).size === word.length;
    return isTrueCondition;
}

//console.log(isIsogram('Dermatoglyphics')); //true
//console.log(isIsogram('abab')); //false

// #4
function isPalindrome(word) {
    return word.toLowerCase() === [...word.toLowerCase()].reverse().join('');
}

//console.log(isPalindrome('Dermatoglyphics')); //false
//console.log(isPalindrome('abbabba')); //true

// #5
function showFormattedDate(dateObj) {
    const choix = { month: 'long' };
    const month = dateObj.toLocaleString('en-EN', choix);
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${day} of ${month}, ${year}`;
}

//console.log(showFormattedDate(new Date('05/12/22'))); //'12 of May, 2022'

// #6
const letterCount = (str, letter) => {
    const lettres = str.split('').filter(lettre => lettre === letter);
    return lettres.length;
}

//console.log(letterCount('abbaba', 'b')); //3

// #7
function countRepetitions(arr) {
    const uniqueArray = {};
    const sieveUnique = arr;
    sieveUnique.forEach(function(indice) {
        uniqueArray[indice] = (uniqueArray[indice] || 0) + 1;
    })
    return uniqueArray;
}

//console.log(countRepetitions(['banana', 'apple', 'banana'])); // { banana: 2, apple: 1 }

// #8
function calculateNumber(arr) {
    const base = 2;
    const ligne = parseInt(arr.join(''), base);
    return ligne;
}

//console.log(calculateNumber([0, 1, 0, 1])); //5
//console.log(calculateNumber([1, 0, 0, 1])); //9