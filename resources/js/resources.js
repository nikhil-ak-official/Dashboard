import apis from "./api.js";
// function getResources() {
//     fetch('http://localhost:3000/resources')
//   .then(response => response.json())
// .then(json => console.log("resources",json))
// .catch((error) => console.log(error))
// };

// function putResources(n) {
//     let url = 'http://localhost:3000/resources' + '/' + n;
//     fetch( url, {
//         method: 'PUT',
//         body: JSON.stringify({
//             "id": 1,
//             "name":"Blachin Skilbadu",
//             "email":"skilbadublachins@qburst.com",
//             "billable":true,
//             "rate_per_hour":200
          
//         }),
//         headers: {
//           'Content-type': 'application/json; charset=UTF-8',
//         },
//       })
//         .then((response) => response.json())
//         .then((json) => console.log("updated resources",json))
//         .catch((error) => console.log(error))
// };

// function postResources() {
//     fetch('http://localhost:3000/resources', {
//             method: 'POST',
//             body: JSON.stringify({
//                 "id": 1,
//                 "name":"Blachin Skilbadu",
//                 "email":"skilbadublachins@qburst.com",
//                 "billable":true,
//                 "rate_per_hour":200
//             }),
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//             },
//         })
//         .then((response) => response.json())
//         .then((json) => console.log("added resources",json))
//         .catch((msg) => console.log(msg));
// };

// function deleteResources(n) {
//     let url = 'http://localhost:3000/resources' + '/' + n;
//     fetch(url, {
//         method: 'DELETE',
//       })
//       getResources();
// };

// let cards = document.querySelectorAll('.project-card')
// if(cards[0] === undefined){
//   console.log('No cards available')
//   cards = document.querySelectorAll('.project-card')
// }
// else{
//   console.log('cards available')
// }

var cards = document.getElementsByClassName("project-card");
for(let card of cards){
  card.addEventListener('click',(e)=>{
    console.log(e.target.closest('div').dataset.id)
    let cardId = e.target.closest('div').dataset.id

    apis.getResources('get','https://api.jsonbin.io/b/5f9a46df857f4b5f9adf733e',(obj)=>{
      console.log(obj.filter((res) => res.project_id == cardId))
    })
    
    // API call for resources
      //makeTable(response.filter((obj) => obj.project_id == cardId))
      // https://api.jsonbin.io/b/5f9a46df857f4b5f9adf733e
      // $2b$10$1KZ6VDOn5QBsDQ6Fk2BGdeDrxrbQVt6vqpDTnFlM5xykGvBmx7hkC
  })
}
