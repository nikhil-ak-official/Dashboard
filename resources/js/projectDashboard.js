import apis from "./api.js";
import utils from './utils.js';

var projectList = [];
/*----- API call to receive projects data from server ----*/
apis.getAPI("get", utils.projectAPI, utils.secretKey, false, (obj) => {
    let totalProjects = Object.keys(obj).length
    displayProjectCount(totalProjects)

    let projectIdNames = obj.map(project => {
        return {id:project.id,project_name:project.project_name} 
    })
    projectList = projectIdNames;

    let projectNames = obj.map(project => {
        return project.project_name 
    })

    let technologiesInProject = obj.map(project => {
        return project.tech_used.length
    })
    projectVstechChart(projectNames, technologiesInProject)
})

/*----- API call to receive resources data from server ----*/
apis.getAPI("get", utils.resourceAPI, utils.secretKey, true, (obj) => {
    let totalResources = Object.keys(obj).length
    displayResourcesCount(totalResources)

    let resourceIdProjectId = obj.map(resource => {
        return {id:resource.id,project_id:resource.project_id} 
    })
    console.log(projectList)
    console.log(resourceIdProjectId)


    let totalBillables = 0
    for(let e of obj){
        if(e.billable === 'True'){
            totalBillables += 1
        }
    }
    displayBillableCount(totalBillables)

    let totalShadows = 0
    for(let e of obj){
        if(e.billable === 'False'){
            totalShadows += 1
        }
    }
    displayShadowCount(totalShadows)

})

function projectVstechChart(projectNames, technologiesInProject){
    let proVsTechChart = document.getElementById('proVsTechChart').getContext('2d');
    
    let barChart = new Chart(proVsTechChart, {
      type: 'bar',
      data: {
        labels: projectNames,
        datasets: [{
          label: 'Technologies',
          data: technologiesInProject,
          backgroundColor: ['#49d8a0', '#6ed57c', '#92cf57', '#dbb809','#dbb409','#dbb509','#dbb822'],
          borderWidth: 1,
          borderColor: '#777',
          hoverBorderWidth: 3,
          hoverBorderColor: '#000'
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
    
        title: {
          display: true,
          text: 'Project Vs Technologies',
          fontSize: 18
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
}



let rInProject = [3, 5, 7, 2, 9, 1, 5]
let projectNames2 = ['Notes App', 'Online Private Tutors Finder System', 'Minecraft', 'Voice based Intelligent Virtual Assistance', 'Online Private Tutors Finder ', 'Minecrat', 'Voice based Intelligent Virtual Assistan']

let proVsResourcesChart = document.getElementById('proVsResourcesChart').getContext('2d');
let pieChart = new Chart(proVsResourcesChart, {
  type: 'pie',
  data: {
    labels: projectNames2,
    datasets: [{
      label: 'Resources',
      data: rInProject,
      backgroundColor: ['#49d8a0', '#6ed57c', '#92cf57', '#dbb809','#fbb409','#ebb509','#dbb822'],
      borderWidth: 1,
      borderColor: '#777',
      hoverBorderWidth: 3,
      hoverBorderColor: '#000'
    }]
  },
  options: {
    responsive: true,

    title: {
      display: true,
      text: 'Project Vs Resources',
      fontSize: 18
    },
    legend: {
      display: true,
      align:'start'
    },
    tooltips: {
      enabled: true
    }
  }
})

/*-- Display count of all the projects --*/
function displayProjectCount(totalProjects){
    let projectsCount = document.getElementById('all-project-count')
    projectsCount.innerHTML = totalProjects
}

/*-- Display count of all the resources --*/
function displayResourcesCount(totalResources){
    let resourcesCount = document.getElementById('all-resource-count')
    resourcesCount.innerHTML = totalResources
}

/*-- Display count of all the billables --*/
function displayBillableCount(totalBillables){
    let billableCount = document.getElementById('all-billable-count')
    billableCount.innerHTML = totalBillables
}

/*-- Display count of all the shadows --*/
function displayShadowCount(totalShadows){
    let shadowCount = document.getElementById('all-shadow-count')
    shadowCount.innerHTML = totalShadows
}