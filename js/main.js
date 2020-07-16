
// ----------- VARIABLES ------------- //
const employeeContainer = document.querySelector('.container');
const overlay = document.querySelector('.hidden');
const url = 'https://randomuser.me/api/?results=12';
const modalContent = document.querySelector('.modal-content');
const closeModal = document.querySelector('.close-modal');
const searchBar = document.querySelector('#search-bar');
const modalNav = document.querySelector('.modal-nav');
const body = document.querySelector('body');
let originalArray = [];
let employeesArray = [];
let searchArray = [];
// ------ ------- ---- --------------- //
// ---- FETCH API AND RENDER HTML ---- //
getJson(url)
    .then(data => data.results)
    .then(data => originalArray = data)
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
        employeeHTML += `
        <div class= 'employee' data-index= '${index}'>
            <div class= 'flex-card'>
                <img src='${data.picture.medium}'>
                <div class= 'flex-list'>
                    <h2>${data.name.first} ${data.name.last}</h2>
                    <span id= 'email'>${data.email}</span>
                    <span id= 'city'>${data.location.city}</span>
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
     const employeeClicked = e.target.closest('.employee');
     const employeeIndex = employeeClicked.getAttribute('data-index');
     buildModal(employeeIndex);
    }
 });

const buildModal = index => {
    let modalEmployee = employeesArray[index];
    let modalHTML = '';
/* --- conditions testing whether prev or next arrows are needed depending on index position and 
the length of the array --- */
    if (parseInt(index) == 0 && employeesArray.length > 1) {
        modalHTML = 
        `<div class= 'modal-nav'>
            <img data-index= ${index} class= 'margin-left' id= 'next' src='imgs/next copy.png'>       
        </div>`
    } else if (parseInt(index) == employeesArray.length - 1 && employeesArray.length > 1) {
        modalHTML = 
        `<div class= 'modal-nav'>
            <img data-index= ${index} class= 'margin-right' id= 'prev' src='imgs/prev copy.png'>
        </div>`
    } else if (parseInt(index) > 0 && parseInt(index) < employeesArray.length - 1){
        modalHTML = 
        `<div class= 'modal-nav'>
            <img data-index= ${index} id= 'prev' src='imgs/prev copy.png'>
            <img data-index= ${index} id= 'next' src='imgs/next copy.png'>
        </div>`
    }
    modalHTML += 
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
/*-- This function just changes the employees DOB details into the correct format --*/
    let year = data.substring(0, 4);
    let day = data.substring(8, 10);
    let month = data.substring(5, 7);
    return `${day}/${month}/${year}`;
}
closeModal.addEventListener('click', () => {
    overlay.style.display = 'none'; 

    // const scrollY = body.style.top;
    // body.style.position = '';
    // body.style.top = '';
    // window.scrollTo(0, parseInt(scrollY || '0') * -1);
})
// ------ ------- ---- --------------- //
// --------SEARCH BAR RE-DESIGN-------- //
searchBar.addEventListener('keyup', () => {
// the original 12 employees are sent to the function after every key press to reset the page //
    displayEmployees(originalArray);
    const search = searchBar.value.toLowerCase();
    searchArray = employeesArray.filter(employee => {
        let name = `${employee.name.first} ${employee.name.last}`;
            if(name.toLowerCase().includes(search)) {
                return true;
            } else {
                return false;
            }
        })
        displayEmployees(searchArray);
})
// ------ ------- ---- --------------- //
// ---------MODAL ARROW NAVS---------- //
modalContent.addEventListener('click', (e) => {
    let arrayVal = e.target.getAttribute('data-index');    
    if (e.target.id === 'next') {   
        arrayVal = parseInt(arrayVal) + 1; 
        buildModal(arrayVal);             
    } else if (e.target.id === 'prev') {
        arrayVal = parseInt(arrayVal) - 1;
        buildModal(arrayVal);
    }
})