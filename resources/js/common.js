
import apis from './api.js'
const arrayOfTechnologies = ["HTML","CSS","JavaScript"]
apis.getAPI('get', 'resources/json/project.json', (obj) => {
  displayProjects(obj)
})


/*---------------- Tab view setup ------------------------*/

const buttons = document.querySelectorAll('.button-box button')
const tabs = document.querySelectorAll('.tab-content')
const editButton = document.querySelector('.edit-details-btn')

buttons.forEach((button)=>{
  button.addEventListener('click',(e)=>{
    setTabs(e.target.dataset.index)
  })
})

function setTabs(index) {
  buttons.forEach((button) => {
    button.className = ''
  })

  buttons[index].className = 'active-tab'

  tabs.forEach((tab) => {
    tab.style.display = 'none'
  })

  tabs[index].style.display = 'block'

  if(tabs[index].dataset.editable == 'true'){
    editButton.style.display = 'block'
    editButton.textContent = `Edit ${buttons[index].textContent}`
  }else {editButton.style.display = 'none'}
}

setTabs(0)


/*---------------- Dynamic project list ------------------------*/
function displayProjects(projects) {
  
  if(projects) {
    
    projects.forEach(project=> {
      
      let projectCard = document.createElement("div");
      projectCard.classList.add("project-card", "flex-box");
      document.getElementById("projectList").appendChild(projectCard);
      let para = document.createElement("p");
      para.innerHTML = project.project_name;
      projectCard.appendChild(para);
      let progressBar = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      progressBar.classList.add("card-circle");
      projectCard.appendChild(progressBar);
      let circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle1.setAttribute("cx","30px");
      circle1.setAttribute("cy","30px");
      circle1.setAttribute("r","30px");
      progressBar.appendChild(circle1);
     
      let circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle2.setAttribute("cx","30px");
      circle2.setAttribute("cy","30px");
      circle2.setAttribute("r","30px");
      let percentage = project.percentage_complete;
      
      let cal = (190 - ((190*`${percentage}`)/100));
      circle2.style.strokeDashoffset = cal;
      progressBar.appendChild(circle2);
    }); 
     
  
  }
  var cards = document.getElementsByClassName("project-card");
  cards[0].classList.add("active-card");
  for(var i=0;i<cards.length;i++) {
    let card = cards[i];
    cards[i].addEventListener("click",function() {addClass(card,cards)});
  }
  
    
}
  
function addClass(card,cards) {
  removeClass(cards);
  card.classList.add("active-card");
}

function removeClass(cards) {
  for(var i=0;i<cards.length;i++) {
    cards[i].classList.remove("active-card");
  }
}

/*---------------- Hamburger menu setup -------------------*/
const hamburger = document.querySelector('.mobile-hamburger')
const sidePanel = document.querySelector('.side-panel')
const burgerLines = document.querySelectorAll('.line')

hamburger.addEventListener('click',()=>{
  sidePanel.classList.toggle('open')
  burgerLines.forEach((line)=>{
    line.classList.toggle('line-dark')
  })
})

/*---------------- Add projects form ------------------------*/
const addProjectsBtn = document.querySelector('.add-project-btn')
const cancelAddProjectsBtn = document.querySelector('.cancel-popup-btn')
const allAddProjectFields = document.querySelectorAll('.add-project-validate')

addProjectsBtn.addEventListener('click',()=>{
  popup('AddProject')
})
cancelAddProjectsBtn.addEventListener('click',()=>{
  popup('AddProject')
})

function popup(typeOfPopup){
  if(typeOfPopup == 'AddProject'){
    var popupCard = document.querySelector('.add-project-popup')
  }
  else{
    var popupCard = document.querySelector('.edit-project-popup')
  }
  const leftSection = document.querySelector('.side-panel')
  const rightSection = document.querySelector('.main-panel')
  

  leftSection.classList.toggle('blur')
  rightSection.classList.toggle('blur')
  popupCard.classList.toggle('active')
}


// //
// const add = document.querySelector('.add-project-popup-btn')
// add.addEventListener('click',()=>{
//   validateFields(allAddProjectFields)
// })
// //

/*---------------- Edit projects form ------------------------*/
const editProjectBtn = document.querySelector('.edit-details-btn')

editButton.addEventListener('click',()=>{
  popup('EditProject')
})



/*---------------- Field validation ------------------------*/
// General validation of required fields
function validateFields(fields) {
  fields.forEach((field)=>{validate(field)})
}

// Validation for 'Add projects' and 'Edit projects'
function validate(field) {
  clearError(field)
  if (field.required && field.value.length == 0) {
    setError(field, `${field.name} cannot be blank.`) 
  }
}

// Validate on blur (Add projects)
allAddProjectFields.forEach((field)=>{
  field.addEventListener('blur',(e)=>{
    validate(e.target)
  })
})



// Setting the error
function setError(input, msg) {
  const errorField = document.querySelector(`.${input.id}-error`)
  errorField.style.color = '#ff0033'
  errorField.textContent = msg
  // isValid = false
}

// Clearing errors
function clearError(input) {
  const fieldError = document.querySelector(`.${input.id}-error`)
  fieldError.style.color = '#2ecc71'
  fieldError.textContent = ''
}

/*---------------- Auto complete ------------------------*/
// const addTech = document.querySelector('#project-technologies')

// console.log(addTech.parentNode)

// addTech.addEventListener('keydown',(e)=>{
//   autocomplete(e,arrayOfTechnologies)
//   console.log('check')
// })

// function autocomplete(inputField,array){
//   console.log(inputField.parentNode)
// }