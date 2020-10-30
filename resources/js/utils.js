let popup = function (typeOfPopup) {
  if (typeOfPopup == 'AddProject') {
    var popupCard = document.querySelector('.add-project-popup')
  }
  else if (typeOfPopup == 'EditProject') {
    var popupCard = document.querySelector('.edit-project-popup')
  }
  else if (typeOfPopup == "AddResources") {
    var popupCard = document.querySelector('.add-resources-popup')
  }
  else if (typeOfPopup == "EditResources") {

    var popupCard = document.querySelector('.edit-resources-popup')
    console.log('popup')
    console.log(popupCard)
  }
  const leftSection = document.querySelector('.side-panel')
  const rightSection = document.querySelector('.main-panel')


  leftSection.classList.toggle('blur')
  rightSection.classList.toggle('blur')

  popupCard.classList.toggle('active')
}

let isValid = true;
let validateFields = function (fields, valid, callback) {
  isValid = valid;
  console.log(fields);
  fields.forEach((field) => { validate(field) });
  callback(isValid);
}

// Validation for 'Add projects' and 'Edit projects'
let validate = function (field) {
  console.log(field.tagName)
  if (field.tagName != 'TAGS') {
    if (field.required && field.value.length == 0) {
      setError(field, `${field.name} cannot be blank.`)
    }
    else {
      if (field.name == "Email") {
        validateEmail(field)
      }
      else{
        clearError(field);
      }
    }
  }
}

// Email validation
function validateEmail(input){
  if (!isEmail(input.value)) {
    setError(input,"Email is invalid!");
  } 
  else{
    clearError(input)
  }
}

function isEmail(email){
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
}


// Setting the error
function setError(input, msg) {
  const errorField = document.querySelector(`.${input.id}-error`)
  errorField.style.color = '#ff0033'
  errorField.textContent = msg
  isValid = false;

}

// Clearing errors
function clearError(input) {
  const fieldError = document.querySelector(`.${input.id}-error`);
  fieldError.style.color = '#2ecc71'
  fieldError.textContent = '';
}


let resourceAPI = 'https://api.jsonbin.io/b/5f9befdc9291173cbca5d666';
let projectAPI = 'https://api.jsonbin.io/b/5f9bef8f857f4b5f9ae02225';
let secretKey = '$2b$10$1KZ6VDOn5QBsDQ6Fk2BGdeDrxrbQVt6vqpDTnFlM5xykGvBmx7hkC';
let arrayOfTechnologies = ["HTML","CSS","JavaScript","Flutter","Swift","Java","C++","C#","Python"]

let utils = { popup, validateFields, validate, resourceAPI, projectAPI, secretKey, arrayOfTechnologies };
export default utils;