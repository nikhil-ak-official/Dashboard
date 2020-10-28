function getResources() {
    fetch('http://localhost:3000/resources')
  .then(response => response.json())
.then(json => console.log("resources",json))
.catch((error) => console.log(error))
};

function putResources(n) {
    let url = 'http://localhost:3000/resources' + '/' + n;
    fetch( url, {
        method: 'PUT',
        body: JSON.stringify({
            "id": 1,
            "name":"Blachin Skilbadu",
            "email":"skilbadublachins@qburst.com",
            "billable":true,
            "rate_per_hour":200
          
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log("updated resources",json))
        .catch((error) => console.log(error))
};

function postResources() {
    fetch('http://localhost:3000/resources', {
            method: 'POST',
            body: JSON.stringify({
                "id": 1,
                "name":"Blachin Skilbadu",
                "email":"skilbadublachins@qburst.com",
                "billable":true,
                "rate_per_hour":200
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => console.log("added resources",json))
        .catch((msg) => console.log(msg));
};

function deleteResources(n) {
    let url = 'http://localhost:3000/resources' + '/' + n;
    fetch(url, {
        method: 'DELETE',
      })
      getResources();
};