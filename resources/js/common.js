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