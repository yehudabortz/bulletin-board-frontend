window.addEventListener('DOMContentLoaded', (event) => {
    appendBulletins()
    addDropdownOptionEventListener()
})


function fetchBulletinData() {
    return fetch('http://localhost:3000/bulletins')
    .then(res => res.json())
}

function fetchIndividualBulletinData(id) {
    return fetch(`http://localhost:3000/bulletins/${id}`)
    .then(res => res.json())
}

function appendBoards(id) {
    let cardWrap = document.querySelector('#card-wrap')

    fetchIndividualBulletinData(id).then(bulletin => {
        bulletin.boards.forEach(board => {
            let card = new Card(board.name, board.items)
            card.appendCard()
        })
    })
}

function appendBulletins() {
    let dropdownList = document.getElementById('dropdown-bulletin-list')

    fetchBulletinData().then(bulletins => {
        bulletins.forEach(bulletin => {
            let option = document.createElement('option')
            option.value = bulletin.id
            option.innerText = bulletin.name
            option.className = 'item-select'
            dropdownList.appendChild(option)
        })
    })
}

function addDropdownOptionEventListener() {
    document.addEventListener('input', function (event) {
        console.log(event.target.value)
        appendBoards(event.target.value)
    });
}

class Card {
    constructor(name, items) {
        this.name = name
        this.items = items
    }

    createCard() {
        let cardElement = document.createElement('div')
        let cardTitle = document.createElement('h2')

        cardTitle.innerText = this.name
        cardTitle.className = 'card-title'
        cardElement.className = 'card'
        cardElement.appendChild(cardTitle)
        return cardElement
    }

    appendCard() {
        let cardWrap = document.querySelector('#card-wrap')
        cardWrap.appendChild(this.createCard())
    }
}