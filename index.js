window.addEventListener('DOMContentLoaded', (event) => {
    appendBulletins()
    addDropdownOptionEventListener()
})


function fetchBulletinData() {
    return fetch('http://localhost:3000/bulletins')
    .then(res => res.json())
}

function fetchIndividualBulletinData(id) {
    return fetch(`http://localhost:3000/bulletins/${id}`)
    .then(res => res.json())
    // .then(data => console.log(data))
}

function appendBoards(id) {
    let cardWrap = document.querySelector('#card-wrap')

    fetchIndividualBulletinData(id).then(bulletin => {
        bulletin.boards.forEach(board => {
            let card = document.createElement('div')
            let title = document.createElement('h2')

            title.innerText = board.name
            title.className = 'card-title'
            card.className = 'card'
            console.log(card)
            cardWrap.appendChild(card)
            card.appendChild(title)
        })
    })
}

function appendBulletins() {
    let dropdownList = document.getElementById('dropdown-bulletin-list')

    fetchBulletinData().then(bulletins => {
        bulletins.forEach(bulletin => {
            let option = document.createElement('option')
            option.value = bulletin.id
            option.innerText = bulletin.name
            option.className = 'item-select'
            dropdownList.appendChild(option)
        })
    })
}

function addDropdownOptionEventListener() {
    document.addEventListener('input', function (event) {
        console.log(event.target.value)
        appendBoards(event.target.value)
    });
}