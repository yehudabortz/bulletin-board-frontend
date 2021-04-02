class Board {
    constructor(name, id, items = []) {
        this.name = name
        this.id = id
        this.items = items
        }
    
    fetchCurrentBulletinData(id) {
        return fetch(`http://localhost:3000/bulletins/${id}`)
        .then(res => res.json())
    }

    appendBoards(id) {
        removeAllChildNodes(cardWrap)
        this.fetchCurrentBulletinData(id).then(bulletin => {
            try {
                bulletin.boards.forEach(board => {
                    let card = new Card(board.name, board.id, board.items)
                    card.appendCard()
                })
            }
            catch {
                console.log("This bulletin does not have any cards yet.")
            }
        })
    }

    generateCardsOnPageLoad() {
        if (dropdownList.children) {
            let bulletinId = dropdownList.options[dropdownList.selectedIndex].value
            this.appendBoards(bulletinId)
        }
    }

    static deleteBoard() {
        console.log(this)
        const boardIdToDelete = parseInt(this.id.split("-")[1], 10)
        console.log(boardIdToDelete)
        let configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        }
        fetch(`http://localhost:3000/boards/${boardIdToDelete}`, configObj)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let boardInstance = new Board
            boardInstance.appendBoards(currentBulletin().value)
        })
        .catch(error => console.log(error.message))
    }
}