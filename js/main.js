
// ----------- Variables ------------- //
const employeeContainer = document.querySelector('.container');
const overlay = document.querySelector('.hidden');
const url = 'https://randomuser.me/api/?results=12';
const modalContent = document.querySelector('.modal-content');
const closeModal = document.querySelector('.close-modal');
const searchBar = document.querySelector('#search-bar');
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
                    <span id= 'city'>${city}</span>
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
    let modalHTML = 
    `<img class= 'modal-pic' src= '${modalEmployee.picture.large}'>
    <h2>${modalEmployee.name.first} ${modalEmployee.name.last}</h2>
    <span>${modalEmployee.email}</span>
    <span>${modalEmployee.location.city}</span>
    <img class= 'prev' src='imgs/prev copy.png'>
    <img class= 'next' src='imgs/next copy.png'>
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
    const employeeNames = document.querySelectorAll('.flex-list h2');
    const search = searchBar.value.toLowerCase();

    employeeNames.forEach(employee => {
        let employeeResult = employee.textContent.toLowerCase();
        let employeeDiv = employee.closest('.employee')
        if (!employeeResult.includes(search)) {
            employeeDiv.style.transform = 'scale(0)'
            setTimeout(() => {employeeDiv.style.display = 'none'; }, 600)
            
        } else {
            employeeDiv.style.display = '';
            employeeDiv.style.transform = 'scale(1)'
        }
    })   
});
