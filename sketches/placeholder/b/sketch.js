
/**
 * unique_id = ph_b
 * 
 * This is the first sketch I created and should just be an easy demo
 * on what to do with p5 and how to use it.
 * 
 * Author:  Nickels Witte
 * Date:    1.1.2020
 * Version  1.0
 */
const ph_bConst = (p) => {
    
    // Setup function
    p.setup = function() {
        var c = p.createCanvas(800, 400);
        c.parent(ph_b.sketchDivId);

        //Prepare everything for starting
        p.windowResized();
    };

    p.windowResized = function()  {
        let div = p.select(ph_b.sketchDivId).size();
        p.resizeCanvas(div.width, div.width / 2);
        p.resetSketch();
    }

    //Function to reset the sketch back to normal
    p.resetSketch = function() {
        p.background(216, 121, 175);
        p.fill(255, 255, 255, 75);
        p.textFont('Helvetica');
        p.textSize(p.width / 20);
        p.text("Placeholder B", p.width / 3, p.height / 2);
    };

};

//Creating the object
let ph_bSketch = new p5(ph_bConst);