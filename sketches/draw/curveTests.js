
/**
 * This is a template for a p5 sketch used in the sketches website by nickels witte.
 * 
 * !!! Replace all occurences of the ID below with a unique id !!!
 * UNIQUE_ID = crvTests
 * 
 * Author:  Nickels Witte
 * Date:    16.02.2020
 * Version  1.0
 */
const crvTestsConst = (p) => {

    var slider;
    var slider2;

    var numberOfPoints;
    var randomJitterStrength;
    var randomJitter = [];
    
    // Setup function
    p.setup = function() {

        // Create the canvas and put it inside the parent div
        var c = p.createCanvas(100, 100);
        c.parent(crvTests.sketchDivId);
        // Call this method to get it to right size
        
        // Get random jitter
        p.noFill();
        p.strokeWeight(2);
        
        
        // Example button
        var button = p.createButton('Refresh');
        button.addClass('btn btn-secondary sketchControl');
        button.parent(crvTests.controlsDivId);
        button.mousePressed(p.resetSketch);

        var text1 = p.createP('Number of Points:');
        text1.parent(crvTests.controlsDivId);

        slider = p.createSlider(7, 100, 20);
        slider.style('width', '10rem');
        slider.addClass('slider sketchControl');
        slider.input(p.updateNumberOfPoints);
        slider.parent(crvTests.controlsDivId);

        var text2 = p.createP('Disturbance:');
        text2.parent(crvTests.controlsDivId);

        slider2 = p.createSlider(0, 100, 45);
        slider2.style('width', '10rem');
        slider2.addClass('slider sketchControl');
        slider2.input(p.updateJitter);
        slider2.parent(crvTests.controlsDivId);

        // Get values from sliders
        p.updateJitter();
        p.updateNumberOfPoints();
        
        p.windowResized();
    };

    /**
     * This function is called at the creation of the sketch 
     * and whenever the windowsize is changing.
     * It takes care to always resize the canvas to the right size.
     */
    p.windowResized = function()  {
        // Find the parent div and get its size
        let div = p.select(crvTests.sketchDivId).size();

        // Resize canvas
        p.resizeCanvas(div.width, div.width / 2);

        // If wished, reset the sketch
        p.resetSketch();
    }

    /**
     * Function to bring the sketch back to a certain state
     */
    p.resetSketch = function() {
        p.background(245);
        p.getRandomJitter();
        p.drawStatic();
    };

    p.updateNumberOfPoints = function() {
        numberOfPoints = slider.value();
        p.resetSketch();
    }

    p.updateJitter = function() {
        randomJitterStrength = slider2.value();
        p.resetSketch();
    }

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

    p.drawStatic = function() {
        
        // Draw only points
        var points = p.getPoints({x: 100, y: 100});
        p.writeHeading('Points', 100, 50);

        p.push();
        p.stroke(255, 0, 0);
        p.strokeWeight(4);
        for (var i = 0; i < points.length; i++) {
            p.point(points[i].x, points[i].y);
        }
        p.pop();

        // Only lines
        p.writeHeading('Line', 300, 50);
        var points = p.getPoints({x: 300, y:100});
        
        // Draw lines
        for (var i = 0; i < points.length; i++) {
            if (i == points.length - 1) {
                
            } else {
                p.line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
            }
        }


        // bezier
        p.writeHeading('Bezier', 500, 50);
        var points = p.getPoints({x: 500, y:100});
        // Draw lines
        for (var i = 0; i < points.length; i += 3) {
            if (i + 3 < points.length) {
                
                p.bezier(points[i].x, points[i].y, 
                    points[i + 1].x, points[i + 1].y, 
                    points[i + 2].x, points[i + 2].y, 
                    points[i + 3].x, points[i + 3].y);
            }
        }


        // Curves
        p.writeHeading('Curve', 700, 50);
        var points = p.getPoints({x: 700, y:100});
        // Draw lines
        for (var i = 0; i < points.length - 1; i++) {

            if (i == 0) {
                // For the first line
                p.curve(points[i].x, points[i].y, 
                    points[i].x, points[i].y, 
                    points[i + 1].x, points[i + 1].y, 
                    points[i + 2].x, points[i + 2].y);
            } else if (i == points.length - 2) {
                // For the last
                p.curve(points[i - 1].x, points[i - 1].y, 
                    points[i].x, points[i].y, 
                    points[i + 1].x, points[i + 1].y, 
                    points[i + 1].x, points[i + 1].y);
            } else {
                // For all inbetween
                p.curve(points[i - 1].x, points[i - 1].y, 
                    points[i].x, points[i].y, 
                    points[i + 1].x, points[i + 1].y, 
                    points[i + 2].x, points[i + 2].y);
            }       
        }


        // Bezier + curves
        p.writeHeading('Bezier +', 900, 50);
        p.push();
        p.fill(255, 0, 0);
        p.text('Curve', 945, 50);
        p.pop();

        var points = p.getPoints({x: 900, y:100});
        
        for (var i = 0; i < points.length; i++) {
            // For i = 3, i = 7, etc
            if (i%4 == 3) {
                p.bezier(points[i - 3].x, points[i - 3].y, 
                    points[i - 2].x, points[i - 2].y, 
                    points[i - 1].x, points[i - 1].y, 
                    points[i].x, points[i].y);
            } else if (i%4 == 0 && i > 0 && i < points.length - 1) {
                p.push();
                p.stroke(255, 0, 0);
                p.curve(points[i - 2].x, points[i - 2].y, 
                    points[i - 1].x, points[i - 1].y, 
                    points[i].x, points[i].y, 
                    points[i + 1].x, points[i + 1].y);
                p.pop();
            }
        }


        // Bezier + curves
        p.writeHeading('Bezier +', 1000, 50);
        p.push();
        p.fill(255, 0, 0);
        p.text('2 Curves', 1045, 50);
        p.pop();

        var points = p.getPoints({x: 1000, y:100});
        
        for (var i = 0; i < points.length; i++) {
            // For i = 3, i = 7, etc
            if (i%5 == 3) {
                p.bezier(points[i - 3].x, points[i - 3].y, 
                    points[i - 2].x, points[i - 2].y, 
                    points[i - 1].x, points[i - 1].y, 
                    points[i].x, points[i].y);
            } else if ((i%5 == 0 || i%5 == 4) && i > 0 && i < points.length - 1) {
                p.push();
                p.stroke(255, 0, 0);
                p.curve(points[i - 2].x, points[i - 2].y, 
                    points[i - 1].x, points[i - 1].y, 
                    points[i].x, points[i].y, 
                    points[i + 1].x, points[i + 1].y);
                p.pop();
            }
        }
    }

    p.writeHeading = function(text, x, y) {
        p.push();
        p.noStroke();
        p.fill(0);
        p.text(text, x, y);
        p.pop();
    }

    p.getPoints = function(start) {

        // Calculating the padding needed using the avaliable space
        var padding = ((p.height - 50) - start.y) / numberOfPoints;

        var array = [];

        for (var i = 0; i < numberOfPoints; i++) {
            var point = {
                x: start.x + randomJitter[i],
                y: start.y + (padding * i)
            };

            array.push(point);
        }

        return array;
    }    

    p.getRandomJitter = function() {
        randomJitter = [];
        for (var i = 0; i < numberOfPoints; i++) {
            randomJitter.push(p.random(randomJitterStrength));
        }
    }



};

//Creating the sketch object from the constant
let crvTestsSketch = new p5(crvTestsConst);