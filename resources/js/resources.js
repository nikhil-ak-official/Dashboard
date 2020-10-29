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

//--------------------Add resource button------------------------//

document.querySelector('.add-resources-popup-btn').addEventListener("click", () => {

  const allAddResourceFields = document.querySelectorAll(".add-resources-validate");
  var isAddResourceValid = true;
  apis.getAPI('get', 'https://api.jsonbin.io/b/5f9a9eba9291173cbca5476f',
    '$2b$10$b3HdJLya6P949p.eYlsxQuusyZSqNRrDPHWTobEvW9/c15QlIWZrK', true, (obj) => {
      utils.validateFields(allAddResourceFields, isAddResourceValid, (valid) => {
        if (valid === true) {
          console.log("validated");
          AddResources(obj)
        }
      })

    })
})

function AddResources(resources) {
  let resourceId = resources.length + 1;
  let resourceName = document.getElementById('name-add').value;
  let resourceEmail = document.getElementById('email-add').value;
  let resourceBillable = document.getElementById('billable-add').checked;
  let resourceRate = document.getElementById('rate-add').value;
  let projectId = document.querySelector('.active-card').dataset.id;

  let newResource = {
    id: resourceId,
    project_id: Number(projectId),
    name: resourceName,
    email: resourceEmail,
    billable: resourceBillable,
    rate_per_hour: Number(resourceRate)
  }
  resources.push(newResource);
  console.log(resources);
  apis.putAPI(
    "PUT",
    'https://api.jsonbin.io/b/5f9a9eba9291173cbca5476f',
    '$2b$10$b3HdJLya6P949p.eYlsxQuusyZSqNRrDPHWTobEvW9/c15QlIWZrK',
    JSON.stringify(resources), (obj)=>{location.reload()}
  );
  utils.popup("AddResources")
}


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
  apis.getAPI('get', 'https://api.jsonbin.io/b/5f9a9eba9291173cbca5476f',
    '$2b$10$b3HdJLya6P949p.eYlsxQuusyZSqNRrDPHWTobEvW9/c15QlIWZrK', true, (allResources) => {
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