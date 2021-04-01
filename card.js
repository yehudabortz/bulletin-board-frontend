class Card {
    constructor(name, items) {
        this.name = name
        this.items = items
    }

    createCard() {
        let cardElement = document.createElement('div')
        let cardTitle = document.createElement('h2')
        let plusIcon = document.createElement('img')
        let iconWrap = document.createElement('div')
        
        
        let mod = document.querySelector('#new-item-modal')
        
        iconWrap.className = "icon-wrap"

        // let mod = document.querySelector('#new-item-modal')
        plusIcon.addEventListener('click', modalPopup.bind(mod))

        plusIcon.src = "images/plus-icon.svg"
        plusIcon.className = "plus-icon"
        iconWrap.appendChild(plusIcon)

        cardTitle.innerText = this.name
        cardTitle.className = 'card-title'
        cardElement.className = 'card'

        cardElement.appendChild(iconWrap)
        cardElement.appendChild(cardTitle)
        return cardElement
    }

    appendCard() {
        let cardWrap = document.querySelector('#card-wrap')
        cardWrap.appendChild(this.createCard())
    }
}

function modalPopup() {
    let screenContent = document.querySelector('.screen-content')
    screenContent.classList.remove('hidden')
    console.log(this)
    this.classList.remove('hidden')
    modalHideEvent(this, screenContent)
}