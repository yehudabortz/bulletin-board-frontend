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

function appendBoards() {
    let cardWrap = document.querySelector('#card-wrap')
    

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
        fetchIndividualBulletinData(event.target.value)
    });
}