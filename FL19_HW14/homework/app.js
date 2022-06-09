window.addEventListener('load', function() {



    const characters = document.querySelector('#characters-wrap')
    const searchValue = document.querySelector('#search-input')
    const searchButton = document.querySelector('#search-btn')
    const loadButton = document.querySelector('.load-more')
    const nodesIdInStorage = []
    let allowedToDraw = 5

    searchButton.addEventListener('click', searchCharacterHandler)
    loadButton.addEventListener('click', loadMore)

    loadFromStorage()

    function searchCharacterHandler() {
        const queryValue = searchValue.value.trim()
        searchValue.value = ''
        if (onlyNumbers(queryValue)) {
            return renderCard(queryValue)
        } else {
            return alert('Only numbers allowed')
        }
    }

    function onlyNumbers(str) {
        return /^[0-9]+$/.test(str)
    }

    async function getCharacter(characterId) {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
            const result = await response.json();
            if (response.ok) {
                return result
            } else {
                throw result.error
            }
        } catch (error) {
            alert(error)
        }
    }

    async function renderCard(characterId) {
        const response = await getCharacter(characterId)
        if (!response) {
            return
        }
        const cardItems = {
            id: response.id,
            name: response.name,
            image: response.image
        }
        const isIdInStorrage = loadToStorage(cardItems)
        if (isIdInStorrage) {
            drawCard(cardItems)
        }
    }

    function drawCard(cardItems) {
        const card = document.createElement('div')
        card.setAttribute('id', cardItems.id)
        const cardName = document.createElement('p')
        const cardImg = document.createElement('img')
        const cardBtn = document.createElement('button')
        cardBtn.classList.add('reset')
        card.classList.add('card')
        card.appendChild(cardName).textContent = cardItems.name
        card.appendChild(cardImg).src = cardItems.image
        card.appendChild(cardBtn).textContent = 'Reset'
        card.addEventListener('click', resetCharacter)
        characters.prepend(card)
        deleteCard()
        const cards = JSON.parse(localStorage.getItem('cards'))
        if (cards.length <= 5) {
            loadButton.style.display = 'none'
        } else {
            loadButton.style.display = 'block'
        }
    }

    function drawCardInEnd(cardItems) {
        const card = document.createElement('div')
        card.setAttribute('id', cardItems.id)
        const cardName = document.createElement('p')
        const cardImg = document.createElement('img')
        const cardBtn = document.createElement('button')
        cardBtn.classList.add('reset')
        card.classList.add('card')
        card.appendChild(cardName).textContent = cardItems.name
        card.appendChild(cardImg).src = cardItems.image
        card.appendChild(cardBtn).textContent = 'Reset'
        card.addEventListener('click', resetCharacter)
        characters.append(card)
        deleteCard()
    }

    function resetCharacter(e) {
        if (e.target.matches('button.reset')) {
            const id = this.id
            document.getElementById(id).remove()
            deleteFromStorage(id)
        }
    }

    function deleteFromStorage(nodeId) {
        const cards = JSON.parse(localStorage.getItem('cards'));
        cards.forEach(function(element, index, array) {
            if (element.id.toString() === nodeId) {
                array.splice(index, 1)
            }
        })
        localStorage.setItem('cards', JSON.stringify(cards));
    }

    function loadToStorage(cardItems) {
        const cards = JSON.parse(localStorage.getItem('cards'));
        if (cards === null) {
            const arr = [cardItems]
            localStorage.setItem('cards', JSON.stringify(arr));
            nodesIdInStorage.unshift(cardItems.id)
            return true
        }
        if (!nodesIdInStorage.includes(cardItems.id)) {
            cards.unshift(cardItems)
            localStorage.setItem('cards', JSON.stringify(cards));
            nodesIdInStorage.unshift(cardItems.id)
            return true
        } else {
            alert('Character is already in the list')
            return false
        }
    }

    function loadFromStorage() {
        const cards = JSON.parse(localStorage.getItem('cards'))
        if (cards === null) {
            loadButton.style.display = 'none'
            return
        }
        cards.forEach(element => {
            nodesIdInStorage.unshift(element.id)
            drawCard(element)
        });
        if (cards.length <= 5) {
            loadButton.style.display = 'none'
        } else {
            loadButton.style.display = 'block'
        }
    }

    function loadMore() {
        allowedToDraw += 5
        const cards = JSON.parse(localStorage.getItem('cards'))
        const cardItems = document.querySelectorAll('.card')
        const cardIds = []
        cardItems.forEach(e => {
            cardIds.push(e.id)
        })
        cards.forEach(element => {
            if (!cardIds.includes(element.id.toString())) {
                nodesIdInStorage.unshift(element.id)
                drawCardInEnd(element)
            }
        });
    }

    function deleteCard() {
        if (characters.childElementCount >= allowedToDraw) {
            characters.removeChild(characters.lastChild)
        }
    }


})