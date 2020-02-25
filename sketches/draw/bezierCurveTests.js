
/**
 * unique_id = crvTests1
 * This is a placeholder
 * 
 * Author:  Nickels Witte
 * Date:    13.2.2020
 * Version  1.0
 */
const crvTests1Const = (p) => {

    var lastPoints;
    let slider;
    let colorPicker;

    let lastX, lastY, lx, ly;
    
    // Setup function
    p.setup = function() {

        var c = p.createCanvas(800, 400);
        c.parent(crvTests1.sketchDivId);
        p.frameRate(100);

        lastPoints = [];

        
        button = p.createButton('Reset Sketch');
        button.addClass('btn btn-secondary sketchControl');
        button.mousePressed(p.resetSketch);
        button.parent(crvTests1.controlsDivId);

        slider = p.createSlider(1, 40, 2);
        slider.style('width', '10rem');
        slider.addClass('slider sketchControl');
        slider.input(p.updateStrokeWeight);
        slider.parent(crvTests1.controlsDivId);


        colorPicker = p.createColorPicker(100);
        colorPicker.input(p.updateStroke);
        colorPicker.addClass('sketchControl');
        colorPicker.parent(crvTests1.controlsDivId);

        p.windowResized();

    };

    p.windowResized = function()  {
        let div = p.select(crvTests1.sketchDivId).size();
        p.resizeCanvas(div.width, div.width / 2);
        p.resetSketch();
    }

    //Function to reset the sketch back to normal
    p.resetSketch = function() {
        p.background(245);
        p.updateStroke();
        p.updateStrokeWeight();

        // points
        p.push();
        p.noStroke();
        p.text('Points', 140, 80);
        p.pop();

        p.push();
        p.strokeWeight(5);
        p.stroke('red');
        p.point(100, 100);
        p.point(100, 200);
        p.point(200, 200);
        p.point(200, 300);
        p.pop();


        // Line
        p.push();
        p.noStroke();
        p.text('Line', 340, 80);
        p.pop();

        p.line(300, 100, 300, 200);
        p.line(300, 200, 400, 200);
        p.line(400, 200, 400, 300);

        p.push();
        p.strokeWeight(5);
        p.stroke('red');
        p.point(300, 100);
        p.point(300, 200);
        p.point(400, 200);
        p.point(400, 300);
        p.pop();


        // Curve
        p.push();
        p.noStroke();
        p.text('Curve', 540, 80);
        p.pop();

        p.push();
        p.noFill();
        p.curve(500, 100, 500, 100, 500, 200, 600, 200);
        p.curve(500, 100, 500, 200, 600, 200, 600, 300);
        p.curve(500, 200, 600, 200, 600, 300, 600, 300);
        p.pop();

        p.push();
        p.strokeWeight(5);
        p.stroke('red');
        p.point(500, 100);
        p.point(500, 200);
        p.point(600, 200);
        p.point(600, 300);
        p.pop();

        p.push();
        p.noFill();
        p.curve(500, 350, 500, 350, 550, 410, 550, 490);
        p.curve(500, 350, 550, 410, 550, 490, 500, 550);
        p.curve(550, 410, 550, 490, 500, 550, 500, 550);
        p.pop();

        p.push();
        p.strokeWeight(5);
        p.stroke('red');
        p.point(500, 350);
        p.point(550, 410);
        p.point(550, 490);
        p.point(500, 550);
        p.pop();


        // Bezier
        p.push();
        p.noStroke();
        p.text('Bezier', 740, 80);
        p.pop();

        p.push();
        p.noFill();
        p.bezier(700, 100, 700, 200, 800, 200, 800, 300);
        //p.bezier(500, 100, 500, 200, 600, 200, 600, 300);
        //p.bezier(500, 200, 600, 200, 600, 300, 600, 300);
        p.pop();

        p.push();
        p.strokeWeight(5);
        p.stroke('red');
        p.point(700, 100);
        p.point(700, 200);
        p.point(800, 200);
        p.point(800, 300);
        p.pop();


        p.push();
        p.noFill();
        p.bezier(700, 350, 750, 410, 750, 490, 700, 550);
        //p.bezier(500, 100, 500, 200, 600, 200, 600, 300);
        //p.bezier(500, 200, 600, 200, 600, 300, 600, 300);
        p.pop();


        p.push();
        p.strokeWeight(5);
        p.stroke('red');
        p.point(700, 350);
        p.point(750, 410);
        p.point(750, 490);
        p.point(700, 550);
        p.pop();



    };

    p.updateStrokeWeight = function() {
        p.strokeWeight(slider.value())
    }

    p.updateStroke = function() {
        p.stroke(colorPicker.color());
    }

    p.drawLine = function() {

        lastPoints.push(p.mouseX);
        lastPoints.push(p.mouseY);

        p.push();
        p.noFill();
        if (lastPoints.length == 8) {
            p.bezier(lastPoints[0], lastPoints[1], lastPoints[2], lastPoints[3], lastPoints[4], lastPoints[5], lastPoints[6], lastPoints[7]);

            lx = lastPoints[4];
            ly = lastPoints[5];
            lastX = lastPoints[6];
            lastY = lastPoints[7];
            
            lastPoints = [];
        } if (lastPoints.length == 4) {
            p.curve(lx, ly, lastX, lastY, lastPoints[0], lastPoints[1], lastPoints[2], lastPoints[3]);
        }

        p.pop();


        p.push();
        p.strokeWeight(5);
        p.stroke('red');
        p.point(p.mouseX, p.mouseY);
        p.pop();
        
        
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
        
    }

};

//Creating the object
let crvTests1Sketch = new p5(crvTests1Const);