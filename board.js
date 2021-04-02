class Board {
    
    fetchCurrentBulletinData(id) {
        return fetch(`http://localhost:3000/bulletins/${id}`)
        .then(res => res.json())
    }

    appendBoards(id) {
        removeAllChildNodes(cardWrap)
        this.fetchCurrentBulletinData(id).then(bulletin => {
            try {
                bulletin.boards.forEach(board => {
                    let card = new Card(board.name, board.items)
                    card.appendCard()
                })
            }
            catch {
                console.log("This bulletin does not have any cards yet.")
            }
        })
    }

    generateCardsOnPageLoad() {
        if (dropdownList.elements) {
            let bulletinId = dropdownList.options[dropdownList.selectedIndex].value
            this.appendBoards(bulletinId)
        }
    }
}