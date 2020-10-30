import utils from './utils.js'
import apis from './api.js'

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
      // console.log(selectedResources)
      tableMaker(selectedResources)
    })
}


function tableMaker(resourceList) {
  if (resourceList) {
    let table = document.querySelector('.invoice-details')
    table.innerHTML = `<thead>
              <th>Name</th>
              <th>Rate per hour</th>         
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
  else {
    console.log('No resource available')
  }
}