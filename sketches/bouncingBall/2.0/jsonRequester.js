function loadJSON(callbackMethod, pathToFile) {   

  // console.log(callbackMethod + " " + pathToFile);
  // console.log("Hey");

  var xobj = new XMLHttpRequest();

  xobj.overrideMimeType("application/json");

  

  xobj.open('GET', pathToFile, true);

  //xobj.setRequestHeader("Cache-Control", "max-age=0");

  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
    callbackMethod(JSON.parse(xobj.responseText));
  }

};

xobj.send(null);  
}

/**
 * Example function for calling loadJSON
 */
function initThis() {
    loadJSON(function(response) {
     // Parse JSON string into object
       //var actual_JSON = JSON.parse(response);
       console.log(response);
    }, './sketches/bouncingBall/2.0/configs.json');
}

/**
 * This method will shorten a given path down to make it 
 * relative from the root directory and it will remove
 * the last element of the path to make it easy to extend
 * another file to it.
 */
function shortenPath(path) {
    path = path.replace()
}