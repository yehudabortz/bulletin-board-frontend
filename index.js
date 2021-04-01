window.addEventListener('DOMContentLoaded', () => {
    createBulletins()
    addDropdownOptionEventListener()
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
    document.addEventListener('input', function (event) {
        let newBoard = new Board
        newBoard.appendBoards(event.target.value)
    });
}