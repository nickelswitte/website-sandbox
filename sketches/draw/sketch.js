
/**
 * This is a placeholder
 * 
 * Author:  Nickels Witte
 * Date:    13.2.2020
 * Version  1.0
 */
const drawLinesConst = (p) => {

    var lastPoint;
    let slider;
    let colorPicker;
    
    // Setup function
    p.setup = function() {

        var c = p.createCanvas(800, 400);
        c.parent("#1006");
        p.frameRate(60);

        lastPoint = [];

        
        button = p.createButton('Reset Sketch');
        button.addClass('btn btn-secondary sketchControl');
        button.mousePressed(p.resetSketch);
        button.parent('#1006controlsDivName');

        slider = p.createSlider(1, 40, 2);
        slider.style('width', '10rem');
        slider.addClass('slider sketchControl');
        slider.input(p.updateStrokeWeight);
        slider.parent('#1006controlsDivName');


        colorPicker = p.createColorPicker(100);
        colorPicker.input(p.updateStroke);
        colorPicker.addClass('sketchControl');
        colorPicker.parent('#1006controlsDivName');

        p.windowResized();

    };

    p.windowResized = function()  {
        let div = p.select('#1006').size();
        p.resizeCanvas(div.width, div.width / 2);
        p.resetSketch();
    }

    //Function to reset the sketch back to normal
    p.resetSketch = function() {
        p.background(245);
        p.updateStroke();
        p.updateStrokeWeight();
    };

    p.updateStrokeWeight = function() {
        p.strokeWeight(slider.value())
    }

    p.updateStroke = function() {
        p.stroke(colorPicker.color());
    }

    p.drawLine = function() {

        /**
         * When lastPoint is empty, start at current point
         */
        if (lastPoint.length == 0) {
            lastPoint[0] = p.mouseX;
            lastPoint[1] = p.mouseY;
        }

        p.line(lastPoint[0], lastPoint[1], p.mouseX, p.mouseY);

        // Save the current point as last point for next time
        lastPoint[0] = p.mouseX;
        lastPoint[1] = p.mouseY;

    }

    /**
     * When mouse is dragged, draw the line
     */
    p.mouseDragged = function() {       
        p.drawLine();
    };

    /**
     * When mouse is released, empty last point to make a line stop
     */
    p.mouseReleased = function() {
        lastPoint = [];
    }

};

//Creating the object
let dlc = new p5(drawLinesConst);