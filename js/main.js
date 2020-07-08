
// ------ Variables ----------- //
let employees = [];
const url = 'https://randomuser.me/api/?results=12';

fetch(url)
    .then(data => data.json())
    .then(data => console.log(data.results[0].name.first))
