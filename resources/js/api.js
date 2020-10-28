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
  
    xhr.open(method, url)
    xhr.send()
  }
  
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
  
    req.open(method, url, true);
    req.setRequestHeader("secret-key", "$2b$10$b3HdJLya6P949p.eYlsxQuusyZSqNRrDPHWTobEvW9/c15QlIWZrK")
    req.send();
  }
  
  
  
  
  let apis = { getAPI,test }
  export default apis