
function displayProjects(projects) {
  if(projects) {
    projects.forEach(project=> {
      let projectCard = document.createElement("div");
      projectCard.classList.add("project-card", "flex-box");
      document.getElementById("projectList").appendChild(projectCard);
      let para = document.createElement("p");
      para.innerHTML = project.project_name;
      projectCard.appendChild(para);
      let progressBar = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      progressBar.setAttribute("class","card-circle");
      projectCard.appendChild(progressBar);
      let circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle1.setAttribute("class","circle");
      circle1.setAttribute("cx","30px");
      circle1.setAttribute("cy","30px");
      circle1.setAttribute("r","30px");
      circle1.setAttribute("stroke-dashoffset", 0);
      circle1.setAttribute("stroke","#f3f3f3");
      let circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle2.setAttribute("class","circle");
      circle2.setAttribute("cx","30px");
      circle2.setAttribute("cy","30px");
      circle2.setAttribute("r","30px");
      let percentage = project.percentage_complete;
      let cal = (190 - ((190*`${percentage}`)/100));
      circle2.setAttribute("stroke-dashoffset", cal);
      circle2.setAttribute("stroke", "#49d8a0");
      progressBar.appendChild(circle2);
    }); 
     
  
  }
  var cards = document.getElementsByClassName("project-card");
  cards[0].classList.add("active-card");
  for(var i=0;i<cards.length;i++) {
    let card = cards[i];
    cards[i].addEventListener("click",function() {addClass(card,cards)});
  }
  
    
}
  
function addClass(card,cards) {
  removeClass(cards);
  card.classList.add("active-card");
}

function removeClass(cards) {
  for(var i=0;i<cards.length;i++) {
    cards[i].classList.remove("active-card");
  }
}
function getProjects() {
  fetch('http://localhost:3000/projects')
  .then(response => response.json())
  .then(json => displayProjects(json))
  .catch((error) => console.log(error));
}



 

// function putProjects(n) {
//     let url = 'http://localhost:3000/projects' + '/' + n;
//     fetch( url, {
//         method: 'PUT',
//         body: JSON.stringify({
//             "id": id,
//             "project_name": name,
//             "project_desc": description,
//             "tech_used": technologies,
//             "percentage_complete": percentage,
//             "start_date": start,
//             "end_date": end
          
//         }),
//         headers: {
//           'Content-type': 'application/json; charset=UTF-8',
//         },
//       })
//         .then((response) => response.json())
//         .then((json) => console.log("updated resources",json))
//         .catch((error) => console.log(error))
// };

// function postProjects() {
//     fetch('http://localhost:3000/projects', {
//             method: 'POST',
//             body: JSON.stringify({
//                 "id": id,
//                 "project_name": name,
//                 "project_desc": description,
//                 "tech_used": technologies,
//                 "percentage_complete": percentage,
//                 "start_date": start,
//                 "end_date": end
//             }),
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//             },
//         })
//         .then((response) => response.json())
//         .then((json) => console.log("added resources",json))
//         .catch((msg) => console.log(msg));
// };

// let n= 1;
// let url = 'http://localhost:3000/projects' + '/' + n;
//     fetch( url, {
//         method: 'PUT',
//         body: JSON.stringify({
//             "id": 1,
//             "project_name": "name",
//             "project_desc": "description",
//             "tech_used": "technologies",
//             "percentage_complete": "percentage",
//             "start_date": "start",
//             "end_date": "end"
          
//         }),
//         headers: {
//           'Content-type': 'application/json; charset=UTF-8',
//         },
//       })
//         .then((response) => response.json())
//         .then((json) => console.log("updated resources",json))
//         .catch((error) => console.log(error))
