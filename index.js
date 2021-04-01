window.addEventListener('DOMContentLoaded', (event) => {
    appendBulletins()
    addDropdownOptionEventListener()
})


function fetchBulletinData() {
    return fetch('http://localhost:3000/bulletins')
    .then(res => res.json())
}

function appendBulletins() {
    let dropdownList = document.getElementById('dropdown-bulletin-list')

    fetchBulletinData().then(bulletins => {
        bulletins.forEach(bulletin => {
            let option = document.createElement('option')
            option.value = bulletin.id
            option.innerText = bulletin.name
            option.className = 'item-select'
            option.id = bulletin.id
            dropdownList.appendChild(option)
        })
    })
}

function addDropdownOptionEventListener() {
    document.addEventListener('input', function (event) {
         console.log(event.target.value)        
    });
}