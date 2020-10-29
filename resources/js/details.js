import apis from "./api.js";
 
apis.getAPI(
  "get",
  "https://api.jsonbin.io/b/5f9aac18f0402361dcee48d9",
  "$2b$10$b3HdJLya6P949p.eYlsxQuusyZSqNRrDPHWTobEvW9/c15QlIWZrK",
  true,
  (obj) => {
    activeProject(obj);
    let cards = document.getElementsByClassName("project-card");
    for (let card of cards) {
      card.addEventListener("click", () => {
        apis.getAPI(
          "get",
          "https://api.jsonbin.io/b/5f9aac18f0402361dcee48d9",
  "$2b$10$b3HdJLya6P949p.eYlsxQuusyZSqNRrDPHWTobEvW9/c15QlIWZrK",
          true,
          (obj) => {
            activeProject(obj);
          }
        );
      });
    }
  }
);

function activeProject(obj) {
  let activeProjectCard = document.querySelector(".active-card p").textContent;
  obj.forEach((project) => {
    if (project.project_name === activeProjectCard) {
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
        440 - (440 * `${project.percentage_complete}`) / 100;
    }
  });
}


/*---------------- Edit projects form ------------------------*/
const cancelEditProjectsBtn = document.querySelector(".cancel-edit-btn");
const allEditProjectFields = document.querySelectorAll(
  ".edit-project-validate"
);

editButton.addEventListener("click", () => {
  utils.popup("EditProject");
});

cancelEditProjectsBtn.addEventListener("click", () => {
  utils.popup("EditProject");
});



/*---------------- Field validation ------------------------*/

// Validate on blur (Add projects)
allAddProjectFields.forEach((field) => {
  field.addEventListener("blur", (e) => {
    utils.validate(e.target);
  });
});

// Validate on blur (Edit projects)
allEditProjectFields.forEach((field) => {
  field.addEventListener("blur", (e) => {
    utils.validate(e.target);
  });
});
