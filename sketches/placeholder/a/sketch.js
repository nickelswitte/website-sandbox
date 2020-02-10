
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
        p.windowResized();
        c.parent("7001");

        button = p.createButton('click me');
        button.addClass('btn btn-info');
        button.parent('7001children');

        button2 = p.createButton('click me');
        button2.addClass('btn btn-info');
        button2.parent('7001children');

        //Prepare everything for starting
        p.resetSketch();
    };

    p.windowResized = function()  {
        let div = p.select('#7001').size();
        p.resizeCanvas(div.width, div.width / 2.5);
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
let ph_a = new p5(placeHolderConst);