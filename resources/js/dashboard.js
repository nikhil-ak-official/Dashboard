import apis from "./api.js";
import utils from './utils.js';

var projects;
var resources;
var projectList = [];
/*----- API call to receive projects data from server ----*/
apis.getAPI("get", utils.projectAPI, utils.secretKey, false, (obj) => {
  projects = obj;

  let totalProjects = Object.keys(obj).length
  utils.displayAllCount(totalProjects, 'all-project-count')

  let projectNames = obj.map(project => {
    return project.project_name
  })

  let technologiesInProject = obj.map(project => {
    return project.tech_used.length
  })
  projectVstechChart(projectNames, technologiesInProject)
  projectUnderTechs();
})

/*----- API call to receive resources data from server ----*/
apis.getAPI("get", utils.resourceAPI, utils.secretKey, false, (obj) => {
  resources = obj;
  let totalResources = Object.keys(obj).length;
  utils.displayAllCount(totalResources, 'all-resource-count')

  let resourceIdProjectId = obj.map(resource => {
    return { resource_id: resource.id, project_id: resource.project_id }
  })
  console.log(projectList)
  console.log(resourceIdProjectId)


  let totalBillables = 0
  for (let e of obj) {
    if (e.billable === 'True') {
      totalBillables += 1
    }
  }
  utils.displayAllCount(totalBillables, 'all-billable-count')

  let totalShadows = 0
  for (let e of obj) {
    if (e.billable === 'False') {
      totalShadows += 1
    }
  }
  utils.displayAllCount(totalShadows, 'all-shadow-count');

  // project vs resources 
  let resourceCount = {};
  projects.forEach(e => {
    resources.reduce((a, v) => (v.project_id === e.id ? resourceCount[e.project_name] = a + 1 : resourceCount[e.project_name] = a), 0)
  })
  let pVsRprojectNames = Object.keys(resourceCount);
  let pVsRresourceCount = Object.values(resourceCount);
  projectVsresChart(pVsRprojectNames, pVsRresourceCount);

})

function projectVstechChart(projectNames, technologiesInProject) {
  let proVsTechChart = document.getElementById('proVsTechChart').getContext('2d');
  new Chart(proVsTechChart, {
    type: 'bar',
    data: {
      labels: projectNames,
      datasets: [{
        label: 'Technologies',
        data: technologiesInProject,
        backgroundColor: '#3065D0',
        borderWidth: 1,
        borderColor: '#777',
        hoverBorderWidth: 2,
        hoverBorderColor: '#000'
      }]
    },
    options: {

      title: {
        display: true,
        text: 'Project Vs Technologies',
        fontSize: 18
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: true,
        bodyFontSize: 16
      },
      scales: {
        xAxes: [{
          ticks: {
            display: false
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  })
}

function projectVsresChart(pVsRprojectNames, pVsRresourceCount) {
  let proVsResourcesChart = document.getElementById('proVsResourcesChart').getContext('2d');
  new Chart(proVsResourcesChart, {
    type: 'horizontalBar',
    data: {
      labels: pVsRprojectNames,
      datasets: [{
        label: 'Resources',
        data: pVsRresourceCount,
        backgroundColor: '#32CD32',
        borderWidth: 2,
        borderColor: '#fff',
        hoverBorderWidth: 1,
        hoverBorderColor: '#000'
      }]
    },
    options: {

      title: {
        display: true,
        text: 'Project Vs Resources',
        fontSize: 18
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: true,
        bodyFontSize: 16
      },
      scales: {
        yAxes: [{
          ticks: {
            display: false
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  })

}

//Project count under each technologies 

function projectUnderTechs() {
  let techs = [...new Set(projects.map(e => e.tech_used).flat())];
  let techCount = {};
  techs.forEach(e => {
    projects.reduce((a, v) => (v.tech_used.includes(e) ? techCount[e] = a + 1 : a), 0)
  })

  for (let techs in techCount) {
    let techContainer = document.querySelector(".technologies-count-container");
    console.log(techs.toLowerCase());
    techContainer.innerHTML += `<div class="technologies-count">
  <div class="tech-logo">
  <i class="devicon-${techs.toLowerCase()}-plain colored"  style="font-size: 2.5em;"></i>
  
  </div>
  <div class="tech-count">
    <p>${techs}</p>
    <div class="progress-bar">
				<span class="progress-bar-fill" style ="width:${Number(techCount[techs])*10}%" ></span>
    </div>
  </div>
  <div style="margin: auto">${techCount[techs]}</div>
</div>`;

  }
}

/*---------------- Hamburger menu setup -------------------*/
const hamburger = document.querySelector(".mobile-hamburger");
const welcome = document.querySelector(".side-panel");
const burgerLines = document.querySelectorAll(".line");

hamburger.addEventListener("click", () => {
  welcome.classList.toggle("open");
  if(welcome.classList.value === 'side-panel open'){
    hamburger.style.position = 'fixed';
    hamburger.style.top = '30px';
    hamburger.style.right = '30px'
  }
  else if(welcome.classList.value === 'side-panel'){
    hamburger.style.removeProperty("position");
    hamburger.style.removeProperty("top");
    hamburger.style.removeProperty("right")
  }
  burgerLines.forEach((line) => {
    line.classList.toggle("line-dark");
  });
});

