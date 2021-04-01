class Board {
    
    fetchCurrentBulletinData(id) {
        return fetch(`http://localhost:3000/bulletins/${id}`)
        .then(res => res.json())
    }

    appendBoards(id) {
        console.log(id)
        this.fetchCurrentBulletinData(id).then(bulletin => {
            bulletin.boards.forEach(board => {
                let card = new Card(board.name, board.items)
                card.appendCard()
            })
        })
    }
}