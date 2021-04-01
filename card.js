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
        let screenContent = document.querySelector('.screen-content')
        
        iconWrap.className = "icon-wrap"
        plusIcon.addEventListener('click', function (e) {
            screenContent.classList.remove('hidden')
            mod.classList.remove('hidden')
            modalHideEvent(mod, screenContent)
        })

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