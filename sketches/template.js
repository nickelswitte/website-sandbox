
/**
 * This is a placeholder
 * 
 * Author:  Nickels Witte
 * Date:    13.2.2020
 * Version  1.0
 */
const placeHolderConst = (p) => {
    
    // Setup function
    p.setup = function() {

        var c = p.createCanvas(800, 400);
        p.windowResized();
        c.parent("#1005");

        button = p.createButton('click me');
        button.addClass('btn btn-secondary sketchControl');
        button.parent('7001controlsDivName');

    };

    p.windowResized = function()  {
        let div = p.select('#7001').size();
        p.resizeCanvas(div.width, div.width / 2);
        p.resetSketch();
    }

    //Function to reset the sketch back to normal
    p.resetSketch = function() {

    };

    p.draw = function() {
        
    }

    p.mousePressed = function() {
        if (
            (p.mouseX >= 0 && p.mouseX <= p.width) &&
            (p.mouseY >= 0 && p.mouseY <= p.height)
        ) {
            
        }
        
    };

};

//Creating the object
let ph_a = new p5(placeHolderConst);