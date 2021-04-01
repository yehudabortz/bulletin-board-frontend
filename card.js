class Card {
    constructor(name, items) {
        this.name = name
        this.items = items
    }

    createCard() {
        let cardElement = document.createElement('div')
        let iconWrap = document.createElement('div')
        let plusIcon = document.createElement('img')
        let cardTitle = document.createElement('h2')

        let divider = document.createElement('div')
        divider.className = "divider"


        let itemsWrap = document.createElement('div')
        let itemsList = document.createElement('ul')
        console.log(this.items)

        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i]
            let listItem = document.createElement('li')
            listItem.className = "list-name"
            listItem.innerText = item.title
            itemsWrap.appendChild(listItem)
        }


        let mod = document.querySelector('#new-item-modal')
        
        iconWrap.className = "icon-wrap"

        plusIcon.addEventListener('click', modalPopup.bind(mod))

        plusIcon.src = "images/plus-icon.svg"
        plusIcon.className = "plus-icon"
        iconWrap.appendChild(plusIcon)

        cardTitle.innerText = this.name
        cardTitle.className = 'card-title'
        cardElement.className = 'card'

        cardElement.appendChild(iconWrap)
        cardElement.appendChild(cardTitle)
        cardElement.appendChild(divider)
        cardElement.appendChild(itemsWrap)
        return cardElement
    }

    appendCard() {
        let cardWrap = document.querySelector('#card-wrap')
        cardWrap.appendChild(this.createCard())
    }
}