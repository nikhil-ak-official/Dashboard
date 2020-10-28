let getAPI = function (method,url,secretKey,asyncType,callback){
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
  
    xhr.open(method, url, asyncType)
    xhr.setRequestHeader("secret-key", secretKey)
    xhr.send()
  }
  

  
  let putAPI = function (method,url,secretKey,body){
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
    xhrp.setRequestHeader('secret-key', secretKey);
    xhrp.setRequestHeader('versioning', false);
    xhrp.send(body);
  }
    
    let apis = {putAPI,getAPI}
    export default apis