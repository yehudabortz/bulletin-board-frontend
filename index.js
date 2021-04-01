window.addEventListener('DOMContentLoaded', () => {
    let newBulletin = new Bulletin
    newBulletin.appendBulletins()
    addDropdownOptionEventListener()
    modalPopupEvent()
})


function addDropdownOptionEventListener() {
    document.addEventListener('input', function (event) {
        let newBoard = new Board
        newBoard.appendBoards(event.target.value)
    });
}

class Bulletin {
    fetchBulletinData() {
        return fetch('http://localhost:3000/bulletins')
        .then(res => res.json())
    }

    appendBulletins() {
        let dropdownList = document.getElementById('dropdown-bulletin-list')
        let newBulletin = new Bulletin
    
        newBulletin.fetchBulletinData().then(bulletins => {
            bulletins.forEach(bulletin => {
                let option = document.createElement('option')

                option.value = bulletin.id
                option.innerText = bulletin.name
                option.className = 'item-select'
                dropdownList.appendChild(option)
            })
        })
    }
}

class Board {
     
    fetchBoardData(id) {
        return fetch(`http://localhost:3000/bulletins/${id}`)
        .then(res => res.json())
    }

    appendBoards(id) {    
        this.fetchBoardData(id).then(bulletin => {
            bulletin.boards.forEach(board => {
                let card = new Card(board.name, board.items)
                card.appendCard()
            })
        })
    }
    

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

function modalPopupEvent() {
    // let mod = document.getElementsByClassName('modal')
    let mod = document.querySelector('#new-item-modal')
    let screenContent = document.querySelector('.screen-content')
    let plusIcon = document.getElementsByClassName('icon-wrap')

    for (let icon of plusIcon) {
        icon.addEventListener('click', function (e) {
            screenContent.classList.remove('hidden')
            mod.classList.remove('hidden')
            modalHideEvent(mod, screenContent)
        })
    }
}

function modalHideEvent(mod, screenContent) {
    let exButton = document.querySelector('#new-item-modal > img')
    exButton.addEventListener('click', function (e) {
        mod.classList.add('hidden')
        screenContent.classList.add('hidden')
    })

    screenContent.addEventListener('click', function (e) {
        mod.classList.add('hidden')
        screenContent.classList.add('hidden')
    })
}