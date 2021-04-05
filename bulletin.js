class Bulletin {

    constructor(name, id, baords = []) {
    this.name = name
    this.id = id
    this.boards = baords
    }

    appendBulletinsToList() {
        let option = document.createElement('option')
        
        option.value = this.id
        option.innerText = this.name
        option.className = 'item-select'
        dropdownList.appendChild(option)
    }

    static generateFirstLoadedBulletin() {
        let firstLoadedBulletinBoard = new Board
        firstLoadedBulletinBoard.generateCardsOnPageLoad()
    }

    assignSelectOptionToNew() {
        for (let i = 0; i < dropdownList.length; i++) {
            if (dropdownList[i].value == `${this.id}`) {
                return dropdownList.selectedIndex = dropdownList[i].index
            }
        }
    }

    static deleteBulletin() {
        let icon = document.getElementById('delete-bulletin-icon')
        icon.addEventListener('click', function () {
            const bulletinIdToDelete = parseInt(currentBulletin().value, 10)
            let configObj = {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            };

            fetch(`${apiEndPoint}/bulletins/${bulletinIdToDelete}`, configObj)
                .then(res => res.json())
                .then(() => {
                    dropdownList.children[dropdownList.selectedIndex].remove()
                    removeAllChildNodes(cardWrap)
                    if (dropdownList.length > 0) {
                        removeAllChildNodes(dropdownList)
                        createBulletins()
                    }
                })
                .catch(reason => console.log(reason))
        })
    }
    
}