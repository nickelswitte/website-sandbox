
/**
 * This is a template for a p5 sketch used in the sketches website by nickels witte.
 * 
 * !!! Replace all occurences of the ID below with a unique id !!!
 * UNIQUE_ID = compareDraw
 * 
 * Author:  Nickels Witte
 * Date:    
 * Version  1.0
 */
const compareDrawConst = (p) => {

    // variables used for mouse inputs
    var mouseIncrements;
    var mouseFilter = 4;

    // vars used for line
    var lastPoint;

    // bezier only
    var lastPointsBezier;
    
    // bezier + curve variable
    var lastPoints;

    // inputs
    var slider;
    var checkbox;
    
    // Setup function
    p.setup = function() {

        // Create the canvas and put it inside the parent div
        var c = p.createCanvas();
        c.parent(compareDraw.sketchDivId);
        // Call this method to get it to right size
        p.windowResized();
        p.resetSketch();

        // button
        button = p.createButton('Reset');
        button.addClass('btn btn-secondary sketchControl');
        button.parent(compareDraw.controlsDivId);
        button.mousePressed(p.resetSketch);

        text = p.createP('Mouse Filter');
        text.addClass('slider sketchControl');
        text.parent(compareDraw.controlsDivId);

        slider = p.createSlider(1, 20, 4);
        slider.style('width', '10rem');
        slider.addClass('slider sketchControl');
        slider.input(p.updateMouseFilter);
        slider.parent(compareDraw.controlsDivId);

        checkbox = p.createCheckbox('Points', false);
        checkbox.addClass('slider sketchControl');
        checkbox.parent(compareDraw.controlsDivId);
        checkbox.changed(p.resetSketch);

    };

    /**
     * This function is called at the creation of the sketch 
     * and whenever the windowsize is changing.
     * It takes care to always resize the canvas to the right size.
     */
    p.windowResized = function()  {
        // Find the parent div and get its size
        let div = p.select(compareDraw.sketchDivId).size();

        // Resize canvas
        p.resizeCanvas(div.width, div.width / 2);

        // If wished, reset the sketch
        p.resetSketch();
    }

    /**
     * Function to bring the sketch back to a certain state
     */
    p.resetSketch = function() {
        p.noFill();
        p.background(245);
        p.strokeWeight(2);

        // For the line
        lastPoint = {
            x: 0,
            y: 0
        };

        // bezier curve mix
        lastPoints = [];
        lastPointsBezier = [];

        mouseIncrements = 0;


        p.push();

        // prepare the sketch
        p.stroke(235);
        p.strokeWeight(4);
        p.line(p.width / 4, 0, p.width / 4, p.height);
        p.line(p.width / 4 * 2, 0, p.width / 4 * 2, p.height);
        p.line(p.width / 4 * 3, 0, p.width / 4 * 3, p.height);
        p.pop();

        p.push();
        p.noStroke();
        p.fill(0);

        p.text('Draw here', p.width / 8 - p.textWidth('Draw here') / 2, 20);
        p.text('Lines', p.width * ( 3 / 8 ) - p.textWidth('Lines') / 2, 20);
        p.text('Bezier', p.width * (5 / 8) - p.textWidth('Bezier') / 2, 20);
        p.text('Bezier + Curve', p.width * (7 / 8) - p.textWidth('Bezier + Curve') / 2, 20);

        p.pop();

    };

    
    /**
     * This function is called whenever a mouse signal gets through the filter
     */
    p.drawLine = function() {

        // only draw when in the left zone
        if (
            (p.mouseX >= 10 && p.mouseX <= (p.width / 4) - 10) &&
            (p.mouseY >= 10 && p.mouseY <= p.height - 10)
        ) {


            // Draw dots for mouse input
            p.push();

            p.strokeWeight(5);
            p.stroke('red');
            
            p.point(p.mouseX, p.mouseY);

            // if wished, draw them for the other zones
            if (checkbox.checked()) {

                p.point(p.mouseX + p.width / 4 * 1, p.mouseY);
                p.point(p.mouseX + p.width / 4 * 2, p.mouseY);
                p.point(p.mouseX + p.width / 4 * 3, p.mouseY);
            }
            
            p.pop();
            

            // Do the line
            if (lastPoint.x != 0 && lastPoint.y != 0) {
                p.line(lastPoint.x + p.width / 4, lastPoint.y, p.mouseX + p.width / 4, p.mouseY);
            }

            // Save the last used point
            lastPoint.x = p.mouseX;
            lastPoint.y = p.mouseY;


            // bezier only
            lastPointsBezier.push({x: p.mouseX, y: p.mouseY});
            if (lastPointsBezier.length == 4) {
                p.bezier(
                    lastPointsBezier[0].x + p.width / 4 * 2, lastPointsBezier[0].y,
                    lastPointsBezier[1].x + p.width / 4 * 2, lastPointsBezier[1].y,
                    lastPointsBezier[2].x + p.width / 4 * 2, lastPointsBezier[2].y,
                    lastPointsBezier[3].x + p.width / 4 * 2, lastPointsBezier[3].y, 
                );

                var tmp = lastPointsBezier[3];
                lastPointsBezier = [];
                lastPointsBezier[0] = tmp;
            }


            // bezier + curve
            // push the current point to the points array
            lastPoints.push({x: p.mouseX, y: p.mouseY});

            // When length == 4, its ready for a bezier curve
            if (lastPoints.length == 4) {
                p.bezier(
                    lastPoints[0].x + p.width / 4 * 3, lastPoints[0].y,
                    lastPoints[1].x + p.width / 4 * 3, lastPoints[1].y,
                    lastPoints[2].x + p.width / 4 * 3, lastPoints[2].y,
                    lastPoints[3].x + p.width / 4 * 3, lastPoints[3].y, 
                );

                // When another two points, its ready for a curve
            } else if (lastPoints.length == 6) {
                p.push();
                p.stroke(0, 0, 255);
                p.curve(
                    lastPoints[2].x + p.width / 4 * 3, lastPoints[2].y,
                    lastPoints[3].x + p.width / 4 * 3, lastPoints[3].y,
                    lastPoints[4].x + p.width / 4 * 3, lastPoints[4].y,
                    lastPoints[5].x + p.width / 4 * 3, lastPoints[5].y, 
                )
                p.pop();

                var tmp1 = lastPoints[4];
                var tmp2 = lastPoints[5];

                lastPoints = [];
                lastPoints[0] = tmp1;
                lastPoints[1] = tmp2;
            }

            
        }       
    }

    /**
     * Only draw the line when mouse filter passes
     */
    p.mouseDragged = function() {       
        mouseIncrements += 1;

        if (mouseIncrements == mouseFilter) {
            p.drawLine();
        }

        if (mouseIncrements == mouseFilter) {
            mouseIncrements = 0;
        }
    };

    p.updateMouseFilter = function() {
        mouseFilter = slider.value();
        p.resetSketch();
    }

    

};

//Creating the sketch object from the constant
let compareDrawSketch = new p5(compareDrawConst);