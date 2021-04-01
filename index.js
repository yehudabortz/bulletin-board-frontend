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

function modalHideEvent(mod, screenContent) {
    let exButton = document.querySelector('#new-item-modal > img')
    exButton.addEventListener('click', function (e) {
        mod.classList.add('hidden')
        screenContent.classList.add('hidden')
    })

    screenContent.addEventListener('click', function (e) {
        mod.classList.add('hidden')
        screenContent.classList.add('hidden')
    })
}

function addDropdownOptionEventListener() {
    let select = document.getElementsByTagName('select')
    document.addEventListener('input', function (event) {
        if (event.target.type === 'select-one') {
            console.log(event.target)
            let cardWrap = document.querySelector('#card-wrap')
            removeAllChildNodes(cardWrap)
            console.log(event.target)
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
    console.log(newBulletinForm)
    console.log(bulletinName)
    formData = {
        name: bulletinName
    }
    console.log(formData)
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

