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
                console.log(dropdownList[i])
                return dropdownList.selectedIndex = dropdownList[i].index
            }
        }
    }
    
}
for (let i = 0; i < dropdownList.length; i++) {
    if (dropdownList[i].value == 41) {
        console.log(dropdownList[i].value)
        console.log("Found!");

    }
  }