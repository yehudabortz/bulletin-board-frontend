function sayHi() {
    console.log("test")
}

function fetchData() {
    return fetch('http://localhost:3000/bulletins')
    .then(res => res.json())
    .then(data => console.log(data))
}