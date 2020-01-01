
/**
 * This is the first sketch I created and should just be an easy demo
 * on what to do with p5 and how to use it.
 * 
 * Author:  Nickels Witte
 * Date:    1.1.2020
 * Version  1.0
 */
const placeHolderConst = (p) => {

    p.myFont;

    p.preload = function() {
        // myFont = p.loadFont('assets/inconsolata.otf');
    }
    
    p.setup = function() {
        var c = p.createCanvas(800, 400);
        c.parent("7001");

        //Prepare everything for starting
        p.resetSketch();
    };
    
    p.draw = function() {

        if (
            (p.mouseX >= 0 && p.mouseX <= p.width) &&
            (p.mouseY >= 0 && p.mouseY <= p.height)
        ) {

            let r = Math.trunc(p.map(p.mouseX, 0, p.width, 10, 245));
            let g = Math.trunc(p.map(p.mouseY, 0, p.height, 10, 245));
            let b = 128;

            // Draw the background
            p.background(r, g, b);

            // Save current settings
            p.push();

            // Set fill color to transparent white
            p.fill(255, 255, 255, 128);

            p.textFont('Helvetica');

            p.textSize(64);

            p.text(p.prepareRgbValue(r), 270, 210);
            p.text(p.prepareRgbValue(g), 420, 210);

            p.pop();

        }
    };

    //Function to reset the sketch back to normal
    p.resetSketch = function() {
        p.fill(128);
        p.background(128, 0, 0);
    }

    p.map = function(num, in_min, in_max, out_min, out_max) {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

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
    }

};

//Creating the object
let ph_a = new p5(placeHolderConst);