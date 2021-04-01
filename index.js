window.addEventListener('DOMContentLoaded', () => {
    createBulletins()
    addDropdownOptionEventListener()
    newBulletinEvent()
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

function newBulletinEvent() {
    let newBulletinLink = document.getElementById('new-bulletin')
    let newBulletinModal = document.getElementById('new-bulletin-modal')
    newBulletinLink.addEventListener('click', modalPopup.bind(newBulletinModal))
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

