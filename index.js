const dropdownList = document.getElementById('dropdown-bulletin-list')
const cardWrap = document.querySelector('#card-wrap')
// const apiEndPoint = 'http://localhost:3000'
const apiEndPoint = 'https://bulletin-board-backend.herokuapp.com'

window.addEventListener('DOMContentLoaded', () => {
    createBulletins()
    addDropdownOptionEventListener()
    newBulletinLinkClick()
    newBoardLinkClick()
    Bulletin.deleteBulletin()
})

function currentBulletin() {
    return dropdownList.options[dropdownList.selectedIndex]
}

function fetchAllBulletinData() {
        return fetch(`${apiEndPoint}/bulletins`)
            .then(res => res.json())
}

function createBulletins() {
    fetchAllBulletinData().then(bulletins => {
        bulletins.forEach(bulletin => {
            let newB = new Bulletin(bulletin.name, bulletin.id, bulletin.baords)
            newB.appendBulletinsToList()
        })
        Bulletin.generateFirstLoadedBulletin()
    })
}

function addDropdownOptionEventListener() {
    let select = document.getElementsByTagName('select')
    document.addEventListener('input', function (event) {
        if (event.target.type === 'select-one') {
            let cardWrap = document.querySelector('#card-wrap')
            let newBoard = new Board
            newBoard.appendBoards(event.target.value)
        }
    });
}

function newBulletinLinkClick() {
    let newBulletinModal = document.getElementById('new-bulletin-modal')
    let newBulletinLink = document.getElementById('new-bulletin')
    newBulletinLink.addEventListener('click', modalPopup.bind(newBulletinModal))
}

function newBoardLinkClick() {
    let newBoardModal = document.getElementById('new-board-modal')
    let newBoardLink = document.getElementById('new-board')
    newBoardLink.addEventListener('click', modalPopup.bind(newBoardModal))
}

function submitNewBulletin() {
    let form = event.target
    let bulletinName = form.elements["name"].value
    
    form.reset()
    try {formData = { name: bulletinName, bulletin_id: currentBulletin().value}}
    catch {formData = { name: bulletinName}}
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    }

    if (event.target.id === "new-bulletin-form") {
        makeNewBulletinRequest(configObj)
    } else if (event.target.id === "new-board-form") {
        makeNewBoardRequest(configObj)
    }
}

function makeNewBulletinRequest(configObj) {
    return fetch(`${apiEndPoint}/bulletins`, configObj)
    .then(res => res.json())
    .then(data => {
        let bulletinInstance = new Bulletin(data.name, data.id)
        let boardInstance = new Board(data.id)
        
        bulletinInstance.appendBulletinsToList()
        bulletinInstance.assignSelectOptionToNew()
        
        boardInstance.appendBoards(data.id)
    })
    .catch(error => console.log(error.message))
}

function makeNewBoardRequest(configObj) {
    return fetch(`${apiEndPoint}/boards`, configObj)
    .then(res => res.json())
        .then(data => {
        let boardInstance = new Board(data.name)
            boardInstance.appendBoards(currentBulletin().value)
    })
    .catch(error => console.log(error.message))
}

function modalPopup() {
    let screenContent = document.querySelector('.screen-content')
    screenContent.classList.remove('hidden')

    if (this.id === "new-item-modal") {
        let newItemForm = document.querySelector('#new-item-form')
        let cardId = event.target.id.split("-")[1]
        newItemForm.setAttribute("data-card-id", cardId)
    }

    this.classList.remove('hidden')
    modalHideEvent(this, screenContent)

}

function modalHideEvent(mod) {
    let screenContent = document.querySelector('.screen-content')
    let exButtons = document.querySelectorAll('.icon.ex')

    function removeModal() {
        if (mod) mod.classList.add('hidden')
        screenContent.classList.add('hidden')
    }

    for (let exBtn of exButtons) {
        exBtn.addEventListener('click', removeModal)
    }
    screenContent.addEventListener('click', removeModal)
    document.addEventListener('submit', removeModal)
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

