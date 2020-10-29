let getAPI = function (method,url,callback){
    let xhr = new XMLHttpRequest()
  
    xhr.onload = function () {
      if (this.status === 200) {
        try {
          let responseObj = JSON.parse(this.responseText)
          callback(responseObj)
        }
        catch {
          console.warn('JSON not parsed')
        }
      }
      else {
        console.warn('JSON not found')
      }
    }
  
    xhr.open(method, url, true)
    xhr.setRequestHeader("secret-key", '$2b$10$xIEnlbVbLhmfMP16vPF8OOHDlXWhhHBXh8kJXi.zbrHGKsXYlazYO')
    xhr.send()
  }
  
  // let getprojectAPI = function(method,url,callback){
  //   let req = new XMLHttpRequest();
  
  //   req.onload = function () {
  //     if (this.status === 200 && req.readyState == XMLHttpRequest.DONE) {
  //       try {
  //         let responseObj = JSON.parse(this.responseText)
  //         callback(responseObj)
  //       }
  //       catch {
  //         console.warn('JSON not parsed')
  //       }
  //     }
  //     else {
  //       console.warn('JSON not found')
  //     }
  //   }
  
  //   req.open(method, url, true);
  //   req.setRequestHeader("secret-key", '$2b$10$xIEnlbVbLhmfMP16vPF8OOHDlXWhhHBXh8kJXi.zbrHGKsXYlazYO');
  //   req.send();
  // }
  
  let test = function(method,url,callback){
    let req = new XMLHttpRequest();
  
    req.onload = function () {
      if (this.status === 200 && req.readyState == XMLHttpRequest.DONE) {
        try {
          let responseObj = JSON.parse(this.responseText)
          callback(responseObj)
        }
        catch {
          console.warn('JSON not parsed')
        }
      }
      else {
        console.warn('JSON not found')
      }
    }
  
    req.open(method, url, false);
    req.setRequestHeader("secret-key", '$2b$10$xIEnlbVbLhmfMP16vPF8OOHDlXWhhHBXh8kJXi.zbrHGKsXYlazYO')
    req.send();
  }

  let getResources = function(method,url,callback){
  let req = new XMLHttpRequest();

    req.onload = function () {
      if (this.status === 200 && req.readyState == XMLHttpRequest.DONE) {
        try {
          let responseObj = JSON.parse(this.responseText)
          callback(responseObj)
        }
        catch {
          console.warn('JSON not parsed')
        }
      }
      else {
        console.warn('JSON not found')
      }
    }

  req.open(method, url, false);
  req.setRequestHeader("secret-key", '$2b$10$1KZ6VDOn5QBsDQ6Fk2BGdeDrxrbQVt6vqpDTnFlM5xykGvBmx7hkC')
  req.send();
}
  
  let putAPI = function (method,url,body){
    let xhrp = new XMLHttpRequest(); 
    xhrp.onload = function () {
          if (this.status === 200) {
            try {
              let responseObj = JSON.parse(this.responseText);
              console.log(responseObj);
            }
            catch {
              console.warn('JSON not parsed')
            }
          }
          else {
            console.warn('JSON not found')
          }
        }
    xhrp.open(method, url, true); 
    xhrp.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhrp.setRequestHeader('secret-key',  '$2b$10$xIEnlbVbLhmfMP16vPF8OOHDlXWhhHBXh8kJXi.zbrHGKsXYlazYO');
    xhrp.setRequestHeader('versioning', false);
    xhrp.send(body);
  }
    
    let apis = { test,putAPI,getAPI, getResources}
    export default apis