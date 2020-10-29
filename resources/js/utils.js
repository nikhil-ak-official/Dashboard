let popup = function(typeOfPopup){
    if(typeOfPopup == 'AddProject'){
      var popupCard = document.querySelector('.add-project-popup')
    }
    else if(typeOfPopup == 'EditProject'){
      var popupCard = document.querySelector('.edit-project-popup')
    }
    else if (typeOfPopup == "AddResources"){
      var popupCard = document.querySelector('.add-resources-popup')
    }
    else{
      var popupCard = document.querySelector('.edit-resources-popup')
    }
    const leftSection = document.querySelector('.side-panel')
    const rightSection = document.querySelector('.main-panel')
    
  
    leftSection.classList.toggle('blur')
    rightSection.classList.toggle('blur')
    popupCard.classList.toggle('active')
  }

let isValid = true;
  let validateFields = function (fields,valid,callback) {
      isValid = valid;
    fields.forEach((field)=>{validate(field)});
    callback(isValid);
  }
  
  // Validation for 'Add projects' and 'Edit projects'
  let validate = function (field) {
    clearError(field)
    if (field.required && field.value.length == 0) {
      setError(field, `${field.name} cannot be blank.`) 
    }
  }

  // Setting the error
  function setError(input, msg) {
    const errorField = document.querySelector(`.${input.id}-error`)
    errorField.style.color = '#ff0033'
    errorField.textContent = msg
    isValid = false
  }
  
  // Clearing errors
  function clearError(input) {
    const fieldError = document.querySelector(`.${input.id}-error`)
    fieldError.style.color = '#2ecc71'
    fieldError.textContent = '';
  }

  let utils = {popup,validateFields,validate};
  export default utils;