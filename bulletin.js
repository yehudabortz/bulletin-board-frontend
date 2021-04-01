class Bulletin {

    constructor(name, id, baords = []) {
    this.name = name
    this.id = id
    this.boards = baords
    }

    appendBulletinsToList() {
        let dropdownList = document.getElementById('dropdown-bulletin-list')
        let option = document.createElement('option')
        
        option.value = this.id
        option.innerText = this.name
        option.className = 'item-select'
        dropdownList.appendChild(option)
    }
}
