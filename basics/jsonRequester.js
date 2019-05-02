function loadJSON(callbackMethod, pathToFile) {   

    // console.log(callbackMethod + " " + pathToFile);

    var xobj = new XMLHttpRequest();
    
    xobj.overrideMimeType("application/json");
    
    xobj.open('GET', pathToFile, true); // Replace 'my_data' with the path to your file
    
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callbackMethod(JSON.parse(xobj.responseText));
          }
    };
    
    xobj.send(null);  
}

function initThis() {
    loadJSON(function(response) {
     // Parse JSON string into object
       //var actual_JSON = JSON.parse(response);
       console.log(response);
    }, './sketches/bouncingBall/2.0/configs.json');
}