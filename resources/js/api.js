/*---------------------------------------------------------------
 >> UTILS.JS
 - This js file is a common collection of all api calls used in 
  this webpage.

 >> CONTENTS
    1. API call to get items from server
    2. API call to put items to server
----------------------------------------------------------------*/

/*-------------- API Call to GET items from server --------------*/
let getAPI = function (method, url, secretKey, asyncType, callback) {
  let xhr = new XMLHttpRequest()
  xhr.onload = function () {
    if (this.status === 200) {
      try {
        let responseArray = JSON.parse(this.responseText)
        callback(responseArray)
      }
      catch {
        console.warn('JSON not parsed')
      }
    }
    else {
      console.warn('JSON not found')
    }
  }

  xhr.open(method, url, asyncType)
  xhr.setRequestHeader("secret-key", secretKey)
  xhr.send()

}

/*-------------- API Call to PUT items to server ----------------*/
let putAPI = function (method, url, secretKey, body, callback) {
  let xhrp = new XMLHttpRequest();
  xhrp.onload = function () {
    if (this.status === 200) {
      try {
        let responseArray = JSON.parse(this.responseText);
        callback(responseArray)
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
  xhrp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhrp.setRequestHeader('secret-key', secretKey);
  xhrp.setRequestHeader('versioning', false);
  xhrp.send(body);
}


let apis = { putAPI, getAPI }
export default apis