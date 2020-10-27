var projects = document.getElementById(projectList);
var projectCard = document.createElement("div");
projectCard.setAttribute("class","project-card flex-box");
projects.appendChild(projectCard);
projectCard.addEventListener("click",active);
var para = document.createElement("p");
para.innerHTML = name;
projectCard.appendChild(para);
var progressBar = document.createElementNS("http://www.w3.org/2000/svg", "svg");
progressBar.setAttribute("class","card-circle");
projectCard.appendChild(progressBar);
var circlularBar = document.createElementNS("http://www.w3.org/2000/svg", "circle");
circlularBar.setAttribute("class","circle");
circlularBar.setAttribute("cx","30px");
circlularBar.setAttribute("cy","30px");
circlularBar.setAttribute("r","30px");
progressBar.appendChild(circlularBar);


function getProjects() {
    fetch('http://localhost:3000/projects')
  .then(response => response.json())
.then(json => console.log("projects",json))
.catch((error) => console.log(error))
};

function active() {
  projectCard.setAttribute("class","project-card active-card flex-box");
}


function putProjects(n) {
    let url = 'http://localhost:3000/projects' + '/' + n;
    fetch( url, {
        method: 'PUT',
        body: JSON.stringify({
            "id": id,
            "project_name": name,
            "project_desc": description,
            "tech_used": technologies,
            "percentage_complete": percentage,
            "start_date": start,
            "end_date": end
          
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log("updated resources",json))
        .catch((error) => console.log(error))
};

function postProjects() {
    fetch('http://localhost:3000/projects', {
            method: 'POST',
            body: JSON.stringify({
                "id": id,
                "project_name": name,
                "project_desc": description,
                "tech_used": technologies,
                "percentage_complete": percentage,
                "start_date": start,
                "end_date": end
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => console.log("added resources",json))
        .catch((msg) => console.log(msg));
};

let n= 1;
let url = 'http://localhost:3000/projects' + '/' + n;
    fetch( url, {
        method: 'PUT',
        body: JSON.stringify({
            "id": 1,
            "project_name": "name",
            "project_desc": "description",
            "tech_used": "technologies",
            "percentage_complete": "percentage",
            "start_date": "start",
            "end_date": "end"
          
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log("updated resources",json))
        .catch((error) => console.log(error))