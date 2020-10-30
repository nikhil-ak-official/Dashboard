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
  apis.getAPI('get', 'https://api.jsonbin.io/b/5f9bb506f0402361dceeb75f',
    '$2b$10$ZiLJWecMZrSPnVOa15q2EOuAgE.3G.vauU.jzNyjYWa6KdbI0e6sm', true, (obj) => {
      utils.validateFields(allAddResourceFields, isAddResourceValid, (valid) => {
        if (valid === true) {
          console.log("validated");
          AddResources(obj)
        }
      })

    })
})

function AddResources(resources) {
  let copyResource = [...resources]
  let resourceId = copyResource.pop().id + 1;
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
    'https://api.jsonbin.io/b/5f9bb506f0402361dceeb75f',
    '$2b$10$ZiLJWecMZrSPnVOa15q2EOuAgE.3G.vauU.jzNyjYWa6KdbI0e6sm',
    JSON.stringify(resources), (obj)=>{location.reload()}
  );
  utils.popup("AddResources")
}


/*---------------- Edit resources form ------------------------*/

const cancelEditResourceBtn = document.querySelector(
  ".cancel-edit-resources-btn"
);
const allEditResourcesFields = document.querySelectorAll(
  ".edit-resources-validate"
);



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

/*---------------- Edit Resource in server ------------------------*/
let currentEditingId 
function activateEdit() {
  const editResourceBtn = document.querySelectorAll(".edit-resource");
  editResourceBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let resourceToEdit = latestOfflineResourceList.find((resource)=> resource.id == btn.dataset.id)
      
      // Set default values for input fields in popup
      document.querySelector('#edit-name-add').value = resourceToEdit.name
      document.querySelector('#edit-email-add').value = resourceToEdit.email
      document.querySelector('#edit-rate-add').value = resourceToEdit.rate_per_hour

      if(resourceToEdit.billable){
        document.querySelector('#edit-billable-add').checked = true
      }

      currentEditingId = resourceToEdit.id
      utils.popup("EditResources"); 
    });
  });
}

const updateResourcesBtn = document.querySelector('.edit-resources-popup-btn')

updateResourcesBtn.addEventListener('click',()=>{
  let updateReference = latestOfflineResourceList.find((resource)=> resource.id == currentEditingId)

  // The original list (latestOfflineResourceList) is getting updated as this is a call by reference
  updateReference.name = document.querySelector('#edit-name-add').value 
  updateReference.email = document.querySelector('#edit-email-add').value 
  updateReference.billable = document.querySelector('#edit-billable-add').checked 
  updateReference.rate_per_hour = document.querySelector('#edit-rate-add').value 
  console.log(latestOfflineResourceList)

  // apis.putAPI(
  //   "PUT",
  //   "https://api.jsonbin.io/b/5f9a46df857f4b5f9adf733e/2",
  //   "$2b$10$1KZ6VDOn5QBsDQ6Fk2BGdeDrxrbQVt6vqpDTnFlM5xykGvBmx7hkC",
  //   JSON.stringify(latestOfflineResourceList)
  // );

  apis.putAPI(
    "PUT",
    'https://api.jsonbin.io/b/5f9bb506f0402361dceeb75f',
    '$2b$10$ZiLJWecMZrSPnVOa15q2EOuAgE.3G.vauU.jzNyjYWa6KdbI0e6sm',
    JSON.stringify(latestOfflineResourceList),(resp)=>{location.reload()}
  );
  console.log(document.querySelector('#edit-billable-add').checked)
})

/*---------------- Delete Resource in server ------------------------*/
function activateDelete(){
  const delResourceBtn = document.querySelectorAll(".delete-resource");
  delResourceBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let updatedOfflineResourceList = latestOfflineResourceList.filter((a)=>a.id != btn.dataset.id);
      apis.putAPI(
        "PUT",
        'https://api.jsonbin.io/b/5f9bb506f0402361dceeb75f',
    '$2b$10$ZiLJWecMZrSPnVOa15q2EOuAgE.3G.vauU.jzNyjYWa6KdbI0e6sm',
        JSON.stringify(updatedOfflineResourceList),(docu)=>{resourceCall(document.querySelector('.active-card'))}
      )
    })})
}

/*---------------- Dynamic Resource table ------------------------*/
let latestOfflineResourceList
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
  apis.getAPI('get', 'https://api.jsonbin.io/b/5f9bb506f0402361dceeb75f',
  '$2b$10$ZiLJWecMZrSPnVOa15q2EOuAgE.3G.vauU.jzNyjYWa6KdbI0e6sm', true, (allResources) => {
      latestOfflineResourceList = allResources
      let selectedResources = allResources.filter((resources) => resources.project_id == card.dataset.id)
      // console.log(selectedResources)
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
                <td style="text-align: right;">${resource.rate_per_hour}</td>
                <td class="edit-resource" data-id=${resource.id} style="text-align: center;"><ion-icon name="create-outline"></ion-icon></td>
                <td class="delete-resource" data-id=${resource.id} style="text-align: center;"><ion-icon name="trash-outline"></ion-icon></td>`
      tableBody.appendChild(row)
    })
    table.appendChild(tableBody)

    activateEdit()
    activateDelete()
  }
  else {
    console.log('No resource available')
  }
}

