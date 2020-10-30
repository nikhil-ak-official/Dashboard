import apis from "./api.js";
import utils from './utils.js';
var projects;
apis.getAPI(
  "get",
  "https://api.jsonbin.io/b/5f9bb434f0402361dceeb6f1",
  '$2b$10$ZiLJWecMZrSPnVOa15q2EOuAgE.3G.vauU.jzNyjYWa6KdbI0e6sm',
  true,
  (obj) => {
    projects = obj;
    activeProject();
    var cards = document.getElementsByClassName("project-card");
    console.log(cards[0]);
    for (let card of cards) {
      card.addEventListener("click", () => {
        activeProject();
      }
      )
    }
  });


var activeObj;
function activeProject() {
  console.log("success!!!!");
  let activeProjectCard = document.querySelector(".active-card").dataset.id;
  projects.forEach((project) => {
    if (project.id == activeProjectCard) {
      document.querySelector(
        ".tab-container"
      ).innerHTML = `<div class="left-side-details">
      <p class="heading">Project Name:</p>
      <p class="content">${project.project_name}</p>
    
      <p class="heading">Description</p>
      <p class="content">${project.project_desc}</p>
    
      <p class="heading">Technologies Used:</p>
      <p class="content">${project.tech_used}</p>
    </div>
    
    <div class="right-side-details flex-box">

      <div class="date-box flex-box">
        <div class="start-date-box">
          <p class="heading">Start Date:</p>
          <p class="content">${project.start_date}</p>
        </div>
        <div class="end-date-box">
          <p class="heading">End Date:</p>
          <p class="content">${project.end_date}</p>
        </div>        
      </div>
      <svg class="detail-circle">
        <circle cx="65px" cy="65px" r="65px"></circle>
        <circle cx="65px" cy="65px" r="65px"></circle>
      </svg>
      <p class="percentage-completed">${project.percentage_complete}%</p>
    </div>
    </div>
    </div >`;
      document.querySelector(
        ".detail-circle :nth-child(2)"
      ).style.strokeDashoffset =
        410 - (410 * `${project.percentage_complete}`) / 100;

      activeObj = project;
    }
  });
}


/*---------------- Edit projects form ------------------------*/
const cancelEditProjectsBtn = document.querySelector(".cancel-edit-btn");
const editButton = document.querySelector(".edit-details-btn");
const arrayOfTechnologies = ["HTML", "CSS", "JavaScript"];
// const allAddProjectFields = document.querySelectorAll(".add-project-validate");
const allEditProjectFields = document.querySelectorAll(".edit-project-validate");

// Tag view in technologies input field
var input = document.querySelector('#project-technologies-edit'),
  tagify = new Tagify(input, {
    whitelist: arrayOfTechnologies,
    maxTags: 10,
    dropdown: {
      maxItems: 20,           // <- mixumum allowed rendered suggestions
      classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
      enabled: 0,             // <- show suggestions on focus
      closeOnSelect: false    // <- do not hide the suggestions dropdown once an item has been selected
    }
  })

editButton.addEventListener("click", () => {
  utils.popup("EditProject");
  editProject();
});

cancelEditProjectsBtn.addEventListener("click", () => {
  utils.popup("EditProject");

});

function editProject() {
  document.getElementById("project-name-edit").value = activeObj.project_name;;
  document.getElementById("project-description-edit").value = activeObj.project_desc;
  console.log(activeObj.tech_used);
  document.getElementById("project-technologies-edit").value = activeObj.tech_used;
  console.log(document.getElementById("project-technologies-edit"));
  document.getElementById("project-percentage-edit").value = activeObj.percentage_complete;
  document.getElementById("project-startDate-edit").value = activeObj.start_date;
  document.getElementById("project-endDate-edit").value = activeObj.end_date;
}

const edit = document.querySelector(".edit-project-popup-btn");
var isEditProjectValid = true;
edit.addEventListener("click", () => {
  const allEditProjectFields = document.querySelectorAll(".edit-project-validate");
  console.log("edit");
  utils.validateFields(allEditProjectFields, isEditProjectValid, (valid) => {
    if (valid === true) {
      console.log("validated");
      getEdited();
      utils.popup("EditProject");
    }
  });
});

function getEdited() {
  let projectId = activeObj.id;
  let projName = document.getElementById("project-name-edit").value;
  let projDesc = document.getElementById("project-description-edit").value;
  let techs = document.getElementById("project-technologies-edit").value;
  let percent = document.getElementById("project-percentage-edit").value;
  let start = document.getElementById("project-startDate-edit").value;
  let end = document.getElementById("project-endDate-edit").value;
  projects[projectId - 1].id = projectId;
  projects[projectId - 1].project_name = projName;
  projects[projectId - 1].project_desc = projDesc;
  projects[projectId - 1].tech_used = techs;
  projects[projectId - 1].percentage_complete = percent;
  projects[projectId - 1].start_date = start;
  projects[projectId - 1].end_date = end;

  console.log(projects);
  apis.putAPI(
    "PUT",
    "https://api.jsonbin.io/b/5f9bb434f0402361dceeb6f1",
    '$2b$10$ZiLJWecMZrSPnVOa15q2EOuAgE.3G.vauU.jzNyjYWa6KdbI0e6sm',
    JSON.stringify(projects),
    (res) => { location.reload(); }
  );
  removeProject();
  activeProject();
}

function removeProject() {
  document.querySelector(".tab-container").innerHTML == "";

}


/*---------------- Field validation ------------------------*/

// Validate on blur (Add projects)
// allAddProjectFields.forEach((field) => {
//   field.addEventListener("blur", (e) => {
//     utils.validate(e.target);
//   });
// });

// Validate on blur (Edit projects)
allEditProjectFields.forEach((field) => {
  field.addEventListener("blur", (e) => {
    utils.validate(e.target);
  });
});

