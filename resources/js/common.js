import apis from "./api.js";
import utils from "./utils.js";
const arrayOfTechnologies = ["HTML", "CSS", "JavaScript"];
var projects;
apis.getAPI(
  "get",
  "https://api.jsonbin.io/b/5f9aac18f0402361dcee48d9",
  "$2b$10$b3HdJLya6P949p.eYlsxQuusyZSqNRrDPHWTobEvW9/c15QlIWZrK",
  false,
  (obj) => {
    projects = obj;
    displayProjects();
  }
);


/*---------------- Tab view setup ------------------------*/

const buttons = document.querySelectorAll(".button-box button");
const tabs = document.querySelectorAll(".tab-content");
const editButton = document.querySelector(".edit-details-btn");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    setTabs(e.target.dataset.index);
  });
});

function setTabs(index) {
  buttons.forEach((button) => {
    button.className = "";
  });

  buttons[index].className = "active-tab";

  tabs.forEach((tab) => {

    tab.style.display = "none";
  });

  tabs[index].style.display = "block";
  console.log(tabs[index]);
  if (tabs[index].dataset.editable == "true") {
    editButton.style.display = "block";
    editButton.textContent = `Edit ${buttons[index].textContent}`;
  } else {
    editButton.style.display = "none";
  }
}

setTabs(0);

/*---------------- Dynamic project list ------------------------*/
function displayProjects() {
  if (projects) {
    projects.forEach((project) => {
      let projectCard = document.createElement("div");
      projectCard.classList.add("project-card", "flex-box");
      projectCard.setAttribute('data-id',`${project.id}`)
      document.getElementById("projectList").appendChild(projectCard);
      let para = document.createElement("p");
      para.innerHTML = project.project_name;
      projectCard.appendChild(para);
      let progressBar = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      progressBar.classList.add("card-circle");
      projectCard.appendChild(progressBar);
      let circle1 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle1.setAttribute("cx", "30px");
      circle1.setAttribute("cy", "30px");
      circle1.setAttribute("r", "30px");
      progressBar.appendChild(circle1);

      let circle2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle2.setAttribute("cx", "30px");
      circle2.setAttribute("cy", "30px");
      circle2.setAttribute("r", "30px");
      let percentage = project.percentage_complete;

      let cal = 190 - (190 * `${percentage}`) / 100;
      circle2.style.strokeDashoffset = cal;
      progressBar.appendChild(circle2);
    });
  }
  var cards = document.getElementsByClassName("project-card");
  cards[0].classList.add("active-card");
  for (var i = 0; i < cards.length; i++) {
    let card = cards[i];
    cards[i].addEventListener("click", function () {
      addClass(card, cards);
    });
  }
}

function addClass(card, cards) {
  removeClass(cards);
  card.classList.add("active-card");
}

function removeClass(cards) {
  for (var i = 0; i < cards.length; i++) {
    cards[i].classList.remove("active-card");
  }
}

/*---------------- Hamburger menu setup -------------------*/
const hamburger = document.querySelector(".mobile-hamburger");
const sidePanel = document.querySelector(".side-panel");
const burgerLines = document.querySelectorAll(".line");

hamburger.addEventListener("click", () => {
  sidePanel.classList.toggle("open");
  burgerLines.forEach((line) => {
    line.classList.toggle("line-dark");
  });
});

/*---------------- Add projects form ------------------------*/
const addProjectsBtn = document.querySelector(".add-project-btn");
const cancelAddProjectsBtn = document.querySelector(".cancel-add-btn");
const allAddProjectFields = document.querySelectorAll(".add-project-validate");

addProjectsBtn.addEventListener("click", () => {
  utils.popup("AddProject");
});
cancelAddProjectsBtn.addEventListener("click", () => {
  utils.popup("AddProject");
});


/*------------------------add projects to server-----------------------------*/
const add = document.querySelector(".add-project-popup-btn");
var isAddProjectValid = true;
add.addEventListener("click", () => {
  console.log(allAddProjectFields);
  utils.validateFields(allAddProjectFields, isAddProjectValid, (valid) => {
    if (valid === true) {
      console.log("validated");
      addProject();
      utils.popup("AddProject");
    }
  });
});

function addProject() {
  let projectId = projects.length + 1;
  let projName = document.getElementById("project-name").value;
  let projDesc = document.getElementById("project-description").value;
  let techs = document.getElementById("project-technologies").value;
  let percent = document.getElementById("project-percentage").value;
  let start = document.getElementById("project-startDate").value;
  let end = document.getElementById("project-endDate").value;
  let projectObj = {
    id: projectId,
    project_name: projName,
    project_desc: projDesc,
    tech_used: techs,
    percentage_complete: percent,
    start_date: start,
    end_date: end,
  };
  projects.push(projectObj);
  console.log(projects);
  apis.putAPI(
    "PUT",
    "https://api.jsonbin.io/b/5f9aac18f0402361dcee48d9",
  "$2b$10$b3HdJLya6P949p.eYlsxQuusyZSqNRrDPHWTobEvW9/c15QlIWZrK",
    JSON.stringify(projects)
  );
  removeProjects();
  displayProjects();
}

function removeProjects() {
  document.getElementById("projectList").innerHTML = "";
}

/*---------------- Edit projects form ------------------------*/
// const cancelEditProjectsBtn = document.querySelector(".cancel-edit-btn");
// const allEditProjectFields = document.querySelectorAll(
//   ".edit-project-validate"
// );

// editButton.addEventListener("click", () => {
//   popup("EditProject");
// });

// cancelEditProjectsBtn.addEventListener("click", () => {
//   popup("EditProject");
// });



// /*---------------- Field validation ------------------------*/

// // Validate on blur (Add projects)
// allAddProjectFields.forEach((field) => {
//   field.addEventListener("blur", (e) => {
//     console.log("hel");
//     utils.validate(e.target);
//   });
// });

// // Validate on blur (Edit projects)
// allEditProjectFields.forEach((field) => {
//   field.addEventListener("blur", (e) => {
//     utils.validate(e.target);
//   });
// });



