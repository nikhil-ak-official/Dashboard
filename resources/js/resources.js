import utils from './utils.js'
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

/*---------------- Edit resources form ------------------------*/
const editResourceBtn = document.querySelectorAll(".edit-resource");
const cancelEditResourceBtn = document.querySelector(
  ".cancel-edit-resources-btn"
);
const allEditResourcesFields = document.querySelectorAll(
  ".edit-resources-validate"
);

editResourceBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    utils.popup("EditResources");
  });
});

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
