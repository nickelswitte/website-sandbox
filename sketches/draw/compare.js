
/**
 * This is a template for a p5 sketch used in the sketches website by nickels witte.
 * 
 * !!! Replace all occurences of the ID below with a unique id !!!
 * UNIQUE_ID = COMPARE_DRAW
 * 
 * Author:  Nickels Witte
 * Date:    
 * Version  1.0
 */
const COMPARE_DRAWConst = (p) => {

    var mouseIncrements;
    var mouseValue = 4;

    // line
    var lastPoint;
    
    // Bezier curve mix variable
    var lastPoints;
    let lastX, lastY, lx, ly;
    
    // Setup function
    p.setup = function() {

        // Create the canvas and put it inside the parent div
        var c = p.createCanvas();
        c.parent(COMPARE_DRAW.sketchDivId);
        // Call this method to get it to right size
        p.windowResized();
        p.resetSketch();

        // Example button
        button = p.createButton('Reset');
        button.addClass('btn btn-secondary sketchControl');
        button.parent(COMPARE_DRAW.controlsDivId);
        button.mousePressed(p.resetSketch);

    };

    /**
     * This function is called at the creation of the sketch 
     * and whenever the windowsize is changing.
     * It takes care to always resize the canvas to the right size.
     */
    p.windowResized = function()  {
        // Find the parent div and get its size
        let div = p.select(COMPARE_DRAW.sketchDivId).size();

        // Resize canvas
        p.resizeCanvas(div.width, div.width / 2);

        // If wished, reset the sketch
        p.resetSketch();
    }

    /**
     * Function to bring the sketch back to a certain state
     */
    p.resetSketch = function() {

        // line
        lastPoint = {
            x: 0,
            y: 0
        };

        // bezier curve mix
        lastPoints = [];
        lastX = 0;
        lastY = 0;
        lx = 0;
        ly = 0;

        mouseIncrements = 0;
        p.background(245);

        p.push();

        // draw the lines for the sections
        p.stroke(50);
        p.strokeWeight(0.5);
        p.line(p.width / 3, 10, p.width / 3, p.height - 10);
        p.line(p.width / 3 * 2, 10, p.width / 3 * 2, p.height - 10);

        p.pop();
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

    /**
     * This function is called whenever a mouse signal gets through the filter
     */
    p.drawLine = function() {

        
        if (
            (p.mouseX >= 10 && p.mouseX <= (p.width / 3) - 10) &&
            (p.mouseY >= 10 && p.mouseY <= p.height - 10)
        ) {
            lastPoints.push(p.mouseX);
            lastPoints.push(p.mouseY);

            // Do the line
            p.line(lastPoint.x + p.width / 3, lastPoint.y, p.mouseX + p.width / 3, p.mouseY);

            lastPoint = {
                x: p.mouseX,
                y: p.mouseY
            };

            p.push();
            p.noFill();

            if (lastPoints.length == 8) {
                p.bezier(lastPoints[0] + p.width / 3 * 2, lastPoints[1], lastPoints[2] + p.width / 3 * 2, lastPoints[3], lastPoints[4] + p.width / 3 * 2, lastPoints[5], lastPoints[6] + p.width / 3 * 2, lastPoints[7]);

                lx = lastPoints[4];
                ly = lastPoints[5];
                lastX = lastPoints[6];
                lastY = lastPoints[7];
                
                lastPoints = [];
            } if (lastPoints.length == 4) {
                p.curve(lx + p.width / 3 * 2, ly, lastX + p.width / 3 * 2, lastY, lastPoints[0] + p.width / 3 * 2, lastPoints[1], lastPoints[2] + p.width / 3 * 2, lastPoints[3]);
            }

            p.pop();


            // Draw dots for mouse input
            p.push();

            p.strokeWeight(5);
            p.stroke('red');
            
            p.point(p.mouseX, p.mouseY);
            p.point(p.mouseX + p.width / 3, p.mouseY);
            p.point(p.mouseX + p.width / 3 * 2, p.mouseY);

            p.pop();

        }

                
    }

    /**
     * When mouse is dragged, draw the line
     */
    p.mouseDragged = function() {       
        mouseIncrements += 1;

        if (mouseIncrements == mouseValue) {
            p.drawLine();
        }

        if (mouseIncrements == mouseValue) {
            mouseIncrements = 0;
        }
    };

};

//Creating the sketch object from the constant
let COMPARE_DRAWSketch = new p5(COMPARE_DRAWConst);