window.addEventListener('DOMContentLoaded', (event) => {
    console.log(event);
    appendBulletins()

})


function fetchBulletinData() {
    return fetch('http://localhost:3000/bulletins')
    .then(res => res.json())
}

// let cardWrap = document.getElementById('card-wrap')
function appendBulletins() {
    let dropdownList = document.getElementById('dropdown-bulletin-list')
    fetchBulletinData().then(bulletins => {
        bulletins.forEach(bulletin => {
            let option = document.createElement('option')
            option.innerText = bulletin.name
            option.id = bulletin.id
            console.log(option)
            dropdownList.appendChild(option)
        })
    })
}