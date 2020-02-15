
/**
 * unique_id = fwM
 * 
 * This is a placeholder
 * 
 * Author:  Nickels Witte
 * Date:    13.2.2020
 * Version  1.0
 */
const fwMConst = (p) => {

    var mouseFlipped;
    
    // Setup function
    p.setup = function() {

        var c = p.createCanvas(800, 400);
        p.windowResized();
        c.parent(fwM.sketchDivId);

        p.noCursor();

    };

    p.windowResized = function()  {
        let div = p.select(fwM.sketchDivId).size();
        p.resizeCanvas(div.width, div.width / 2);
        p.resetSketch();
    }

    //Function to reset the sketch back to normal
    p.resetSketch = function() {
        mouseFlipped = false;
        p.background(245);

        p.stroke(100);
        p.strokeWeight(4);
        p.fill(220);
    };

    p.getMouse = function() {
        var mouse = [];

        if (!mouseFlipped) {
            mouse[0] = p.mouseX;
            mouse[1] = p.mouseY;
        } else {
            mouse[0] = p.width - p.mouseX;
            mouse[1] = p.height - p.mouseY;
        }

        return mouse;

    }

    p.draw = function() {
        p.background(245);
        
        var mouse = p.getMouse();

        p.push();
        p.noStroke();
        p.fill('#698474');
        p.quad(0, 0, p.width / 2, 0, mouse[0], mouse[1], 0, p.height / 2);

        p.fill('#889e81');
        p.quad(p.width / 2, 0, p.width, 0, p.width, p.height / 2, mouse[0], mouse[1]);

        p.fill('#bac7a7');
        p.quad(p.width, p.height / 2, p.width, p.height, p.width / 2, p.height, mouse[0], mouse[1]);

        p.fill('#e5e4cc');
        p.quad(p.width / 2, p.height, 0, p.height, 0, p.height / 2, mouse[0], mouse[1]);
        p.pop();


        p.line(p.width / 2, 0, mouse[0], mouse[1]);
        p.line(0, p.height / 2, mouse[0], mouse[1]);
        p.line(p.width / 2, p.height, mouse[0], mouse[1]);
        p.line(p.width, p.height / 2, mouse[0], mouse[1]);
        p.circle(mouse[0], mouse[1], 40);


        p.circle(p.width / 2, 0, 10);
        p.circle(0, p.height / 2, 10);
        p.circle(p.width / 2, p.height, 10);
        p.circle(p.width, p.height / 2, 10);
    }

    //Catching a mouse press
    p.mousePressed = function() {
        if (
            (p.mouseX >= 0 && p.mouseX <= p.width) &&
            (p.mouseY >= 0 && p.mouseY <= p.height)
        ) {
            mouseFlipped = mouseFlipped == true ? false : true;
        }
        
    };

};

//Creating the object
let fwMSketch = new p5(fwMConst);