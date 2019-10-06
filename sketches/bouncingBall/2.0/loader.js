function loadScript(callbackMethod, pathToFile) {   

    // console.log(callbackMethod + " " + pathToFile);

    var xobj = new XMLHttpRequest();
    
    xobj.overrideMimeType("application/javascript");
    
    xobj.open('GET', pathToFile, true);
    
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            eval(xobj.responseText);
            console.log(xobj.responseText);
            callbackMethod();
        }
    };
    
    xobj.send(null);  
}


function countScripts() {
    initBallroom();
}

loadScript(countScripts, "./sketches/bouncingBall/2.0/bouncingBall.js");

