import utils from './utils.js'
import apis from './api.js'
/*---------------- Add resources form ------------------------*/
const addResourceBtn = document.querySelector(".add-resources-btn");
const cancelAddResourcesBtn = document.querySelector(
  ".cancel-add-resources-btn"
);
const allAddResourcesFields = document.querySelectorAll(
  ".add-resources-validate"
);

addResourceBtn.addEventListener("click", () => {
  utils.popup("AddResources");
});

cancelAddResourcesBtn.addEventListener("click", () => {
  utils.popup("AddResources");
});

/*---------------- Edit resources form ------------------------*/
const editResourceBtn = document.querySelectorAll(".edit-resource");
const cancelEditResourceBtn = document.querySelector(
  ".cancel-edit-resources-btn"
);
const allEditResourcesFields = document.querySelectorAll(
  ".edit-resources-validate"
);

editResourceBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    utils.popup("EditResources");
  });
});

cancelEditResourceBtn.addEventListener("click", () => {
  utils.popup("EditResources");
});

// Validate on blur (Add resources)
allAddResourcesFields.forEach((field) => {
  field.addEventListener("blur", (e) => {
    utils.validate(e.target);
  });
});

// Validate on blur (Edit resources)
allEditResourcesFields.forEach((field) => {
  field.addEventListener("blur", (e) => {
    utils.validate(e.target);
  });
});


/*---------------- Dynamic Resource table ------------------------*/
const cards = document.querySelectorAll('.project-card')
const firstSelectedCard = document.querySelector('.active-card')
resourceCall(firstSelectedCard)
cards.forEach((card) => {
  card.addEventListener('click', (e) => {
    let cardDiv = e.target.closest('div')
    resourceCall(cardDiv)
  })
})

function resourceCall(card) {
  apis.getAPI('get', 'https://api.jsonbin.io/b/5f9a46df857f4b5f9adf733e',
    '$2b$10$1KZ6VDOn5QBsDQ6Fk2BGdeDrxrbQVt6vqpDTnFlM5xykGvBmx7hkC', true, (allResources) => {
      let selectedResources = allResources.filter((resources) => resources.project_id == card.dataset.id)
      tableMaker(selectedResources)
    })
}

function tableMaker(resourceList) {
  if (resourceList) {
    let table = document.querySelector('.resource-table')
    table.innerHTML = `<thead>
              <th>Name</th>
              <th>Email</th>
              <th>Billable</th>
              <th>Rate per hour</th>         
            </thead>`
    let tableBody = document.createElement('tbody')
    resourceList.forEach((resource) => {
      let row = document.createElement('tr')
      row.innerHTML = `<td>${resource.name}</td>
                <td>${resource.email}</td>
                <td>${resource.billable}</td>
                <td>${resource.rate_per_hour}</td>
                <td class="edit-resource" data-id=${resource.id}><ion-icon name="create-outline"></ion-icon></td>
                <td class="delete-resource" data-id=${resource.id}>Del</td>`
      tableBody.appendChild(row)
    })
    table.appendChild(tableBody)
  }
  else {
    console.log('No resource available')
  }
}