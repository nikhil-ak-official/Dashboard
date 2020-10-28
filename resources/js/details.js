import apis from "./api.js";

apis.getAPI(
  "get",
  "https://api.jsonbin.io/b/5f997bfb30aaa01ce61a108a",
  (obj) => {
    activeProject(obj);
    var cards = document.getElementsByClassName("project-card");
    console.log(cards[0]);
    for (let card of cards) {
      card.addEventListener("click", () => {
        apis.getAPI(
          "get",
          "https://api.jsonbin.io/b/5f997bfb30aaa01ce61a108a",
          (obj) => {
            activeProject(obj);
          }
        );
      });
    }
  }
);

function activeProject(obj) {
  console.log("success!!!!");
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
