const dropdownList = document.getElementById('dropdown-bulletin-list')
const cardWrap = document.querySelector('#card-wrap')
window.addEventListener('DOMContentLoaded', () => {
    createBulletins()
    addDropdownOptionEventListener()
    newBulletinLinkClick()
})

function fetchAllBulletinData() {
    return fetch('http://localhost:3000/bulletins')
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

function modalPopup() {
    let screenContent = document.querySelector('.screen-content')
    screenContent.classList.remove('hidden')
    this.classList.remove('hidden')
    modalHideEvent(this, screenContent)

}

function modalHideEvent(mod) {
    let screenContent = document.querySelector('.screen-content')
    let exButton = document.querySelector('#new-item-modal > img')

    function removeModal() {
        if (mod) mod.classList.add('hidden')
        screenContent.classList.add('hidden')
    }

    exButton.addEventListener('click',removeModal)
    screenContent.addEventListener('click', removeModal)
    document.addEventListener('submit', removeModal)
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

function submitNewBulletin() {
    let newBulletinForm = document.getElementById('new-bulletin-form')
    let bulletinName = newBulletinForm.elements["name"].value

    newBulletinForm.reset()
    formData = { name: bulletinName }
    let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    }
    makeNewBulletinRequest(configObj)
}

function makeNewBulletinRequest(configObj) {
    return fetch('http://localhost:3000/bulletins', configObj)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let bulletinInstance = new Bulletin(data.name, data.id)
            let boardInstance = new Board(data.id)
    
            bulletinInstance.appendBulletinsToList()
            bulletinInstance.assignSelectOptionToNew()
    
            boardInstance.appendBoards(data.id)
        })
        .catch(error => console.log(error.message))
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

