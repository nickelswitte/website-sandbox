
/**
 * unique_id = ph_a
 * 
 * This is the first sketch I created and should just be an easy demo
 * on what to do with p5 and how to use it.
 * 
 * Author:  Nickels Witte
 * Date:    1.1.2020
 * Version  1.0
 */
const ph_aConst = (p) => {
    
    // Setup function
    p.setup = function() {

        var c = p.createCanvas(800, 400);
        p.windowResized();
        c.parent(ph_a.sketchDivId);

        button = p.createButton('click me');
        button.addClass('btn btn-secondary sketchControl');
        button.parent(ph_a.controlsDivId);

        button2 = p.createButton('click me');
        button2.addClass('btn btn-secondary sketchControl');
        button2.parent(ph_a.controlsDivId);

        //Prepare everything for starting
        p.resetSketch();
    };

    p.windowResized = function()  {
        let div = p.select(ph_a.sketchDivId).size();
        p.resizeCanvas(div.width, div.width / 2);
        p.resetSketch();
    }

    //Function to reset the sketch back to normal
    p.resetSketch = function() {
        p.background(162, 217, 233);
        p.fill(255, 255, 255, 75);
        p.textFont('Helvetica');
        p.textSize(p.width / 20);
        p.text("Dynamic Placeholder", p.width / 4, p.height / 2);

    };

    p.draw = function() {
        p.resetSketch();
    }

};

//Creating the object
let ph_aSketch = new p5(ph_aConst);