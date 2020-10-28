
import apis from './api.js'

apis.getAPI('get', 'resources/json/project.json', (obj) => {
  displayProjects(obj)
})

apis.getprojectAPI('get', 'https://api.jsonbin.io/b/5f9927b030aaa01ce619f147', (obj) => {
  
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
  console.log(tabs[index])
  if(tabs[index].dataset.editable == 'true'){
    editButton.style.display = 'block'
    editButton.textContent = `Edit ${buttons[index].textContent}`
  }else {editButton.style.display = 'none'}
}

setTabs(0)

// projectLists 


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
