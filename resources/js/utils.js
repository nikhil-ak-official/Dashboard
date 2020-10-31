/*---------------------------------------------------------------
 >> UTILS.JS
 - This js file is a common collection of all utility functions
   used in this project.
 - All business logics in one place to be reused throughout 
   project.

 >> CONTENTS
    1. Pop up display function.
    2. Field validation function.
    3. Common variables for API calls
    4. Common array of all approved list of technologies.
----------------------------------------------------------------*/

/*----------- Show popup on call -------------------------------*/
let popup = function (typeOfPopup) {

  // Find out which popup was called.
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
  }

  const leftSection = document.querySelector('.side-panel')
  const rightSection = document.querySelector('.main-panel')

  leftSection.classList.toggle('blur')   // Blur out main content.
  rightSection.classList.toggle('blur')

  popupCard.classList.toggle('active')
}

let isValid = true;  // Variable to check is all validations are satisfied: Returns 'false' in gets error at least once.

/*----------- field list validation ------------------------------*/
let validateFields = function (fields, valid, callback) {
  isValid = valid;
  console.log(fields);
  fields.forEach((field) => { validate(field) });
  callback(isValid);
}

/*----------- Individual field validation -------------------------*/
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
      else {
        clearError(field);
      }
    }
  }
}

// Email validation
function validateEmail(input) {
  if (!isEmail(input.value)) {
    setError(input, "Email is invalid!");
  }
  else {
    clearError(input)
  }
}

function isEmail(email) {
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

/*----------- Common variables and values -------------------------*/
// APIs
let resourceAPI = 'https://api.jsonbin0.io/b/5f9befdc9291173cbca5d666';
let projectAPI = 'https://api.jsonbin0.io/b/5f9bef8f857f4b5f9ae02225';
let secretKey = '$2b$10$1KZ6VDOn5QBsDQ6Fk2BGdeDrxrbQVt6vqpDTnFlM5xykGvBmx7hkC';

// List of technologies for popup input field.
let arrayOfTechnologies = ["HTML", "CSS", "JavaScript", "Flutter", "Swift", "Java", "C++", "C#", "Python"]

let utils = { popup, validateFields, validate, resourceAPI, projectAPI, secretKey, arrayOfTechnologies };
export default utils;