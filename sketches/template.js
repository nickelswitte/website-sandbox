
/**
 * This is a template for a p5 sketch used in the sketches website by nickels witte.
 * 
 * !!! Replace all occurences of the ID below with a unique id !!!
 * UNIQUE_ID = REPLACE_THIS
 * 
 * Author:  Nickels Witte
 * Date:    
 * Version  1.0
 */
const REPLACE_THISConst = (p) => {
    
    // Setup function
    p.setup = function() {

        // Create the canvas and put it inside the parent div
        var c = p.createCanvas();
        c.parent(REPLACE_THIS.sketchDivId);
        // Call this method to get it to right size
        p.windowResized();

        // Example button
        button = p.createButton('click me');
        button.addClass('btn btn-secondary sketchControl');
        button.parent(REPLACE_THIS.controlsDivId);

    };

    /**
     * This function is called at the creation of the sketch 
     * and whenever the windowsize is changing.
     * It takes care to always resize the canvas to the right size.
     */
    p.windowResized = function()  {
        // Find the parent div and get its size
        let div = p.select(REPLACE_THIS.sketchDivId).size();

        // Resize canvas
        p.resizeCanvas(div.width, div.width / 2);

        // If wished, reset the sketch
        // p.resetSketch();
    }

    /**
     * Function to bring the sketch back to a certain state
     */
    p.resetSketch = function() {
        // do stuff
    };

    /**
     * This method is looped by p5
     * Here some action can be done
     */
    p.draw = function() {
        // Do something to make it move
    }

    /**
     * Function is called when mouse is pressed
     */
    p.mousePressed = function() {
        // Check if it is pressed inside the sketch
        if (
            (p.mouseX >= 0 && p.mouseX <= p.width) &&
            (p.mouseY >= 0 && p.mouseY <= p.height)
        ) {
            // Do something
        }
        
    };

};

//Creating the sketch object from the constant
let REPLACE_THISSketch = new p5(REPLACE_THISConst);