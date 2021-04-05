class Card {
    constructor(name, id, items) {
        this.name = name
        this.id = id
        this.items = items
    }

// CARD COMPONENT

    createCard() {
        let cardElement = document.createElement('div')
        let iconWrap = document.createElement('div')
        let plusIcon = document.createElement('img')
        let deleteIcon = document.createElement('img')
        let editIcon = document.createElement('img')
        let cardTitle = document.createElement('h2')

        let divider = document.createElement('div')
        divider.className = "divider"


        let itemsWrap = document.createElement('div')
        let itemsList = document.createElement('ul')
        itemsList.className = 'items-list'


        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i]
            let listItem = document.createElement('li')
            let listItemTitle = document.createElement('p')
            let listItemBody = document.createElement('p')
            listItem.className = "list-item"
            listItemTitle.className = "list-item-title"
            listItemBody.className = "list-item-body"
            listItemTitle.innerText = item.title
            listItemBody.innerText = item.body
            listItem.append(listItemTitle)
            listItem.append(listItemBody)
            itemsList.append(listItem)
        }
        itemsWrap.appendChild(itemsList)


        let mod = document.querySelector('#new-item-modal')
        let editMod = document.querySelector('#edit-board-title-modal')
        
        iconWrap.className = "icon-wrap"
        
        deleteIcon.addEventListener('click', Board.deleteBoard.bind(cardElement))
        plusIcon.addEventListener('click', modalPopup.bind(mod))
        editIcon.addEventListener('click', modalPopup.bind(editMod))
        
        plusIcon.src = "images/plus-icon.svg"
        deleteIcon.src = "images/delete-icon.svg"
        editIcon.src = "images/edit-icon.svg"

        editIcon.id = "edit-icon-" + this.id
        plusIcon.id = "icon-" + this.id
        plusIcon.className = "icon"
        deleteIcon.className = "icon"
        editIcon.className = "icon"

        iconWrap.appendChild(editIcon)
        iconWrap.appendChild(deleteIcon)
        iconWrap.appendChild(plusIcon)
        
        cardTitle.innerText = this.name
        cardTitle.className = 'card-title'
        cardElement.className = 'card'
        cardElement.id = "card-" + this.id

        cardElement.appendChild(iconWrap)
        cardElement.appendChild(cardTitle)
        cardElement.appendChild(divider)
        cardElement.appendChild(itemsWrap)
        return cardElement
    }

    appendCard() {
        cardWrap.appendChild(this.createCard())
    }
}