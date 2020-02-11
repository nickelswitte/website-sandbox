
/**
 * This is the first sketch I created and should just be an easy demo
 * on what to do with p5 and how to use it.
 * 
 * Author:  Nickels Witte
 * Date:    1.1.2020
 * Version  1.0
 */
const rgbBackgroundConst = (p) => {

    // This variable determines which of the rgb values should be changed
    let rgbMouseMode = 0;

    // Global rgb vaules
    let r = 245;
    let g = 245;
    let b = 245;
    
    // Setup function
    p.setup = function() {
        var c = p.createCanvas(800, 400);
        c.parent("1003");

        //Prepare everything for starting
        p.windowResized();
    };

    //Function to reset the sketch back to normal
    p.resetSketch = function() {
        p.fill(128);
        p.background(r, g, b);
    }

    p.windowResized = function()  {
        let div = p.select('#1003').size();
        p.resizeCanvas(div.width, div.width / 2);
        p.resetSketch();
    }
    
    // The basic draw function that is called every frame
    p.draw = function() {

        // check for mouse being in the sketch
        if (
            (p.mouseX >= 0 && p.mouseX <= p.width) &&
            (p.mouseY >= 0 && p.mouseY <= p.height)
        ) {
            // Get the truncated coordinates of the mouse
            let x = Math.trunc(p.map(p.mouseX, 0, p.width, 10, 245));
            let y = Math.trunc(p.map(p.mouseY, 0, p.height, 10, 245));

            // Depending on the rgb mode, change the coloring of it
            if (rgbMouseMode == 0) {
                r = x;
                g = y;
            } else if (rgbMouseMode == 1) {
                g = x;
                b = y;
            } else {
                b = x;
                r = y;
            }

            // Draw the background
            p.background(r, g, b);

            // Save current settings
            p.push();

            // Set fill color to transparent white
            p.fill(255, 255, 255, 75);

            // Print the rgb values on the screen
            p.textFont('Helvetica');
            p.textSize(p.width / 15);
            p.text(p.prepareRgbValue(r), (p.width / 100) * 23, p.height / 1.9);
            p.text(p.prepareRgbValue(g), (p.width / 100) * 43, p.height / 1.9);
            p.text(p.prepareRgbValue(b), (p.width / 100) * 63, p.height / 1.9);

            // Release the current settings
            p.pop();

        }
    };

    // When mouse pressed inside the sketch, change the rgb mode
    p.mousePressed = function() {
        if (
            (p.mouseX >= 0 && p.mouseX <= p.width) &&
            (p.mouseY >= 0 && p.mouseY <= p.height)
        ) {
            p.changeRgbMouseMode();
        }
    };


    p.changeRgbMouseMode = function() {
        rgbMouseMode += 1;
        
        if (rgbMouseMode > 2) {
            rgbMouseMode = 0;
        }
    }

    // Mapping function to map the pixel coordinate to the rgb spectrum
    p.map = function(num, in_min, in_max, out_min, out_max) {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    };

    // Function that will convert the value to a string and add blanks before the number to 
    // compensate
    p.prepareRgbValue = function(v) {
        let rgbStr = "";
        if (v < 10) {
            rgbStr += "  " + v;
        } else if (v >= 10 && v < 100) {
            rgbStr += " " + v;
        } else {
            rgbStr += v;
        }

        return rgbStr;
    };

};

//Creating the object
let rgb_bg = new p5(rgbBackgroundConst);