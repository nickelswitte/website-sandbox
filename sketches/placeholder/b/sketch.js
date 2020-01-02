
/**
 * This is the first sketch I created and should just be an easy demo
 * on what to do with p5 and how to use it.
 * 
 * Author:  Nickels Witte
 * Date:    1.1.2020
 * Version  1.0
 */
const placeHolderConstB = (p) => {
    
    // Setup function
    p.setup = function() {
        var c = p.createCanvas(800, 400);
        c.parent("7002");

        //Prepare everything for starting
        p.resetSketch();
    };

    //Function to reset the sketch back to normal
    p.resetSketch = function() {
        p.background(216, 121, 175);
        p.fill(255, 255, 255, 75);
        p.textFont('Helvetica');
        p.textSize(64);
        p.text("Placeholder B", 200, 210);
    };

};

//Creating the object
let ph_b = new p5(placeHolderConstB);