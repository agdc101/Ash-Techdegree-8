
// ----------- Variables ------------- //
const employeeContainer = document.querySelector('.container');
const overlay = document.querySelector('.hidden');
const url = 'https://randomuser.me/api/?results=12';
const modalContent = document.querySelector('.modal-content');
const closeModal = document.querySelector('.close-modal');
const searchBar = document.querySelector('#search-bar');
const employees = document.querySelectorAll('.employee');
const employeeNames = document.querySelectorAll('.flex-list h2');
let employeesArray = [];
// ------ ------- ---- --------------- //
// ---- FETCH API AND RENDER HTML ---- //

getJson(url)
    .then(data => data.results)
    .then(data => displayEmployees(data));

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
    employeesArray = data;
    data.forEach( (data, index) => {        
        let name = `${data.name.first} ${data.name.last}`;       
        let email = data.email;
        let city = data.location.city;
        let picture = data.picture.medium;
        employeeHTML += `
        <div class= 'employee' data-index= '${index}'>
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

// ------ ------- ---- --------------- //
// -----------MODAL EVENT------------- //

employeeContainer.addEventListener('click', (e) => {   
    if(e.target !== employeeContainer) {
     overlay.style.display = 'block';    
     console.log(employeesArray[1]);
     const employeeClicked = e.target.closest('.employee');
     const employeeIndex = employeeClicked.getAttribute('data-index');
     buildModal(employeeIndex);
    }
 });

const buildModal = index => {
    let modalEmployee = employeesArray[index];
    let modalHTML = 
    `<img class= 'modal-pic' src= '${modalEmployee.picture.large}'>
    <h2>${modalEmployee.name.first} ${modalEmployee.name.last}</h2>
    <span>${modalEmployee.email}</span>
    <span>${modalEmployee.location.city}</span>
    <div class= 'details'>
        <span>${modalEmployee.phone}</span>
        <span>${modalEmployee.location.street.number} ${modalEmployee.location.street.name}</span>
        <span>birthday: ${createDob(modalEmployee.dob.date)}</span>
    </div>
    `;
    modalContent.innerHTML = modalHTML;
}

const createDob = data => {
    let year = data.substring(0, 4);
    let day = data.substring(8, 10);
    let month = data.substring(5, 7);
    return `${day}/${month}/${year}`;
}

closeModal.addEventListener('click', () => {
    overlay.style.display = 'none'; 
})

// ------ ------- ---- --------------- //
// ------------SEARCH BAR------------- //
searchBar.addEventListener('keyup', () => {     
    employeeNames.forEach( employee => {

    })
    const search = searchBar.value;
    console.log(search);
    console.log(employee);
    
});