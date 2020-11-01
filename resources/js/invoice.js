/*---------------------------------------------------------------
 >> INVOICE.JS
 - This js file includes all features for the invoice tab.

 >> CONTENTS
    1. Dynamic invoice table.
    2. Invoice calculation.
----------------------------------------------------------------*/
import utils from './utils.js'
import apis from './api.js'

let calcResource; // variable to store all resource list.

/*---------------- Dynamic invoice table ------------------------*/
const cards = document.querySelectorAll('.project-card')
const firstSelectedCard = document.querySelector('.active-card')
resourceCall(firstSelectedCard)

cards.forEach((card) => {
  card.addEventListener('click', (e) => {
    let cardDiv = e.target.closest('div')
    resourceCall(cardDiv)
  })
})

// API call and table making
function resourceCall(card) {
  apis.getAPI('get', utils.resourceAPI, utils.secretKey, true, (allResources) => {
    let selectedResources = allResources.filter((resources) => resources.project_id == card.dataset.id)
    tableMaker(selectedResources);
    remove();
  })
}


function tableMaker(resourceList) {
  if (resourceList) {
    let table = document.querySelector('.invoice-details')
    if (resourceList.length <= 0) {
      table.innerHTML = 'No resource available'
    }
    else {
      table.innerHTML = `<thead>
              <th style="color: #fff;">Name</th>
              <th style="color: #fff;">Rate per hour</th>         
            </thead>`
      let tableBody = document.createElement('tbody')
      resourceList.forEach((resource) => {
        let row = document.createElement('tr')
        row.innerHTML = `<td>${resource.name}</td>
                <td class= "invoice-rate" style="text-align: right;">${resource.rate_per_hour}</td>`
        tableBody.appendChild(row)
      })
      table.appendChild(tableBody)
    }
  }
  else {
    console.log('No resource available')
  }
  calcResource = resourceList
}

/*----------------- Invoice calculation-------------------------- */
let generateInvoice = document.querySelector(".generate-invoice-btn");
generateInvoice.addEventListener("click", calculation);

function calculation() {
  let workingDays = document.getElementById("working-days").value;
  if (workingDays) {
    console.log(calcResource);
    let rateList = calcResource.map(e => e.rate_per_hour);
    console.log(rateList);
    let total = 0;
    const workingHours = 8
    rateList.forEach(rate => { total = total + rate * workingHours * workingDays; })
    console.log(total);
    document.querySelector(".total-amount").innerHTML = total;
  }
}

// Clear input field and total amount.
function remove() {
  document.getElementById("working-days").value = "";
  document.querySelector(".total-amount").innerHTML = "";
}
