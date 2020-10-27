/*---------------- Tab view setup ------------------------*/
const buttons = document.querySelectorAll('.button-box button')
const tabs = document.querySelectorAll('.tab-content')
const editButton = document.querySelector('.edit-details-btn')

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