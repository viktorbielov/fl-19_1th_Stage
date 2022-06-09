import { dictionary } from './dictionary.js';

const lengthOfWord = 5
const animationMsDuration = 500
const animationMsDivider = 10
const guessGrid = document.querySelector('[data-tiles-section]')
let targetWord = dictionary[Math.floor(Math.random() * dictionary.length)]

startGame()

function startGame() {
    document.addEventListener('click', handleMouseClick)
    document.addEventListener('keydown', handleKeyPress)
}

function stopGame() {
    document.removeEventListener('keydown', handleKeyPress)
}

function handleMouseClick(e) {
    if (e.target.matches('[data-reset]')) {
        resetGrid()
        targetWord = dictionary[Math.floor(Math.random() * dictionary.length)]
        startGame()
        return
    }
    if (e.target.matches('[data-check]')) {
        checkWord()
        return
    }
    if (e.target.matches('input.tile')) {
        e.target.addEventListener('keydown', event => {
            if (event.key.match(/^[а-яА-ЯёЁЇїІіЄєҐґ]$/)) {
                e.target.dataset.letter = event.key.toLowerCase()
                e.target.value = event.key.toLowerCase()
                e.target.dataset.state = 'active'
            }
            if (event.key === 'Backspace') {
                e.target.value = ''
                delete e.target.dataset.state
                delete e.target.dataset.letter
                return
            }
            return
        })
        return
    }
}

function handleKeyPress(e) {
    if (e.target.matches('input.tile')) {
        return
    }
    if (e.key === 'Enter') {
        checkWord()
        return
    }
    if (e.key === 'Backspace') {
        deleteLastLetter()
        return
    }
    if (e.key.match(/^[а-яА-ЯёЁЇїІіЄєҐґ]$/)) {
        pressKey(e.key)
        return
    }
}

function pressKey(key) {
    const activeTiles = getActiveTiles()
    if (activeTiles.length >= lengthOfWord) {
        return
    }
    const nextTile = guessGrid.querySelector(':not([data-letter])')
    nextTile.dataset.letter = key.toLowerCase()
    nextTile.value = key
    nextTile.dataset.state = 'active'
}

function resetGrid() {
    const allTiles = getAllTiles()
    const lastTile = allTiles[allTiles.length - 1]
    if (lastTile === null) {
        return
    }
    allTiles.forEach(elem => {
        elem.value = ''
        delete elem.dataset.letter
        delete elem.dataset.state
    })
}

function deleteLastLetter() {
    const activeTiles = getActiveTiles()
    const lastTile = activeTiles[activeTiles.length - 1]
    if (lastTile === null) {
        return
    }
    lastTile.value = ''
    delete lastTile.dataset.state
    delete lastTile.dataset.letter
}

function checkWord() {
    const activeTiles = [...getActiveTiles()]
    if (activeTiles.length !== lengthOfWord) {
        alert('Not enough letters')
        return
    }

    const guess = activeTiles.reduce((word, tile) => {
        return word + tile.dataset.letter
    }, '')

    if (!dictionary.includes(guess)) {
        alert('Not in word list')
        return
    }
    activeTiles.forEach((...params) => flipTile(...params, guess))
}

function flipTile(tile, index, array, guess) {
    const letter = tile.dataset.letter
    if (targetWord[index] === letter) {
        tile.dataset.state = 'correct'
    } else if (targetWord.includes(letter)) {
        tile.dataset.state = 'wrong-location'
    } else {
        tile.dataset.state = 'wrong'
    }
    if (index === array.length - 1) {
        checkWinLose(guess, array)
    }
}

function getAllTiles() {
    return guessGrid.querySelectorAll('[data-state]')
}

function getActiveTiles() {
    return guessGrid.querySelectorAll('[data-state="active"]')
}

function checkWinLose(guess, tiles) {
    if (guess === targetWord) {
        alert('Congratulations! You won.')
        rotateTiles(tiles)
        stopGame()
        return
    }
    const remainingTiles = guessGrid.querySelectorAll(':not([data-letter])')
    if (remainingTiles.length === 0) {
        alert('Game over.')
        stopGame()
    }
}

function rotateTiles(tiles) {
    tiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('rotate')
            tile.addEventListener(
                'animationend',
                () => {
                    tile.classList.remove('rotate')
                }, { once: true }
            )
        }, index * animationMsDuration / animationMsDivider)
    })
}