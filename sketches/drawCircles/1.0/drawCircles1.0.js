
/**
 * This is the first sketch I created and should just be an easy demo
 * on what to do with p5 and how to use it.
 * 
 * Author:  Nickels Witte
 * Date:    27.4.2019
 * Version  1.0
 */
const drawCirclesConst = (p) => {
    
    p.setup = function() {
        var c = p.createCanvas(800, 400);
        c.parent("1000");

        //Prepare everything for starting
        p.resetSketch();

        //Creating a button to reset
        var button = p.createButton("reset");
        button.parent("1000controlsDivName");
        button.mousePressed(p.resetSketch);
    };
    
    p.draw = function() {
        //Drawing an ellipse on your mouse coordinates
        p.ellipse(p.mouseX, p.mouseY, 50);
    };

    //Function to reset the sketch back to normal
    p.resetSketch = function() {
        p.fill(255);
        p.background(0);
    }

    //Catching a mouse press and calling the resetSketch function
    p.mousePressed = function() {
        if (
            (p.mouseX >= 0 && p.mouseX <= p.width) &&
            (p.mouseY >= 0 && p.mouseY <= p.height)
        ) {
            p.resetSketch();        
        }
        
    };

};

//Creating the object
let dc1_0 = new p5(drawCirclesConst);