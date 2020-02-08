
/**
 * This is the first sketch I created and should just be an easy demo
 * on what to do with p5 and how to use it.
 * 
 * Author:  Nickels Witte
 * Date:    1.1.2020
 * Version  1.0
 */
const placeHolderConst = (p) => {
    
    // Setup function
    p.setup = function() {
        var c = p.createCanvas(800, 400);
        c.parent("7001");

        //Prepare everything for starting
        p.resetSketch();
    };

    //Function to reset the sketch back to normal
    p.resetSketch = function() {
        p.background(162, 217, 233);
        p.fill(255, 255, 255, 75);
        p.textFont('Helvetica');
        p.textSize(64);
        p.text("Placeholder A", 200, 210);
    };

};

//Creating the object
let ph_a = new p5(placeHolderConst);