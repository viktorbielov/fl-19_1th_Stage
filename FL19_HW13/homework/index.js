document.addEventListener('DOMContentLoaded', () => {
    const X_CLASS = 'playerX'
    const O_CLASS = 'playerO'
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    let oTurn
    let isActiveTile = false
    const grid = document.querySelector('.container')
    const reset = document.querySelector('#reset')
    const currentPlayer = document.querySelector('.display-player')
    for (let i = 0; i < 9; i++) {
        const tile = document.createElement('div')
        grid.appendChild(tile).className = 'tile'
    }
    const gridElements = document.querySelectorAll('.tile')
    const announcer = document.querySelector('.announcer')
    const draggables = document.querySelectorAll('img.avatar-icon')
    const avatarContainers = document.querySelectorAll('.avatar-container')
    let draggableIcon

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggableIcon = draggable.dataset.item
        })
    })

    avatarContainers.forEach(container => {
        container.addEventListener('dragover', drag)
    })

    avatarContainers.forEach(container => {
        container.addEventListener('drop', dragNDrop)
    })

    function drag(e) {
        e.preventDefault()
    }

    function dragNDrop(e) {
        e.preventDefault()
        const draggable = document.querySelector(`[data-item="${draggableIcon}"]`)
        this.appendChild(draggable)
        this.removeEventListener('dragover', drag)
        this.removeEventListener('drop', dragNDrop)
        if (document.querySelector('.icons').childElementCount === 2) {
            startGame()
        }
    }

    reset.addEventListener('click', startGame)

    const enterEvent = new CustomEvent('EnterPressed')

    function startGame() {
        oTurn = false
        isActiveTile = false
        currentPlayer.innerText = 'X'
        currentPlayer.classList.remove(O_CLASS)
        currentPlayer.classList.add(X_CLASS)
        grid.childNodes.forEach(e => {
            e.className = 'tile'
            e.innerText = ''
        })
        announcer.innerHTML = ''
        announcer.classList.add('hide')
        grid.removeEventListener('click', clickHandler)
        grid.addEventListener('click', clickHandler)
        window.addEventListener('keydown', checkKey)
        for (let i = 0; i < gridElements.length; i++) {
            gridElements[i].addEventListener('EnterPressed', enterKeyInGrid)
        }
    }

    function enterKeyInGrid(e) {
        if (e.target.matches('div.tile') && e.target.innerText === '') {
            const tile = e.target
            const currentClass = oTurn ? O_CLASS : X_CLASS
            insertMark(tile, currentClass)
            if (checkWin(currentClass)) {
                endGame(false, currentClass)
            } else if (isDraw()) {
                endGame(true, currentClass)
            } else {
                currentPlayer.innerText = oTurn ? 'X' : 'O'
                currentPlayer.classList.toggle(O_CLASS)
                currentPlayer.classList.toggle(X_CLASS)
                changeTurn()
            }
        }
    }

    function checkKey(e) {
        e = e || window.event;
        if (e.keyCode === 37) {
            // left arrow
            pressArrow(e)
        }
        if (e.keyCode === 39) {
            // right arrow
            pressArrow(e)
        }
        if (e.key === 'Enter') {
            for (let i = 0; i < gridElements.length; i++) {
                if (gridElements[i].classList.contains('active')) {
                    gridElements[i].dispatchEvent(enterEvent)
                }
            }
        }
    }

    function pressArrow(key) {
        if (!isActiveTile) {
            gridElements[0].classList.add('active')
            isActiveTile = true
            return
        }
        for (let i = 0; i < gridElements.length; i++) {
            if (gridElements[i].classList.contains('active')) {
                if (key.keyCode === 37 && i > 0) {
                    gridElements[i].classList.remove('active')
                    gridElements[i - 1].classList.add('active')
                    return
                } else if (key.keyCode === 39 && i < gridElements.length - 1) {
                    gridElements[i].classList.remove('active')
                    gridElements[i + 1].classList.add('active')
                    return
                }
            }
        }
    }

    function clickHandler(e) {
        if (e.target.matches('div.tile') && e.target.innerText === '') {
            const tile = e.target
            const currentClass = oTurn ? O_CLASS : X_CLASS
            insertMark(tile, currentClass)
            if (checkWin(currentClass)) {
                endGame(false, currentClass)
            } else if (isDraw()) {
                endGame(true, currentClass)
            } else {
                currentPlayer.innerText = oTurn ? 'X' : 'O'
                currentPlayer.classList.toggle(O_CLASS)
                currentPlayer.classList.toggle(X_CLASS)
                changeTurn()
            }
        }
    }

    function insertMark(tile, currentClass) {
        tile.classList.add(currentClass)
        tile.innerText = currentClass === 'playerX' ? 'X' : 'O'
    }

    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return gridElements[index].classList.contains(currentClass)
            })
        })
    }

    function isDraw() {
        return [...gridElements].every(tile => {
            return tile.classList.contains(X_CLASS) || tile.classList.contains(O_CLASS)
        })
    }

    function endGame(draw, currentClass) {
        let result
        if (draw) {
            result = `It's a draw`
        } else {
            result = `Player <span class="${currentClass}">${oTurn ? 'O' : 'X'} Won</span>`
        }
        announcer.innerHTML = result
        announcer.classList.remove('hide')
        grid.removeEventListener('click', clickHandler)
    }

    function changeTurn() {
        oTurn = !oTurn
    }

});