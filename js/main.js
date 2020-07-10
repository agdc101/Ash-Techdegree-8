
// ------ Variables ----------- //
let employees = [];
const employeeContainer = document.querySelector('.container');
const overlay = employeeContainer.querySelector('.overlay');
const url = 'https://randomuser.me/api/?results=12';
const modalContent = document.querySelector('.modal-content');
const closeModal = document.querySelector('.modal-close');

async function getJson(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    }
    catch (error) {
        throw error;
    }
};

const displayEmployees = data => {
    let employeeHTML = '';
    data.forEach( data => {
        let name = `${data.name.first} ${data.name.last}`;       
        let email = data.email;
        let city = data.location.city;
        let picture = data.picture.medium;
        employeeHTML += `
        <div class= 'employee'>
            <div class= 'flex-card'>
                <img src='${picture}'>
                <div class= 'flex-list'>
                    <h2>${name}</h2>
                    <span id= 'email'>${email}</span>
                    <span>${city}</span>
                </div>
            </div>
        </div>
        `
    })
    employeeContainer.innerHTML = employeeHTML;
}

getJson(url)
    .then(data => data.results)
    // .then(data => console.log(data));
    .then(data => displayEmployees(data));

 