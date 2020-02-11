
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
        p.windowResized();

        //Creating a button to reset
        var button = p.createButton("Reset");
        button.addClass("btn btn-secondary sketchControl");
        button.parent("1000controlsDivName");
        button.mousePressed(p.resetSketch);

        //Prepare everything for starting
        p.resetSketch();
    };

    p.windowResized = function()  {
        let div = p.select('#1000').size();
        p.resizeCanvas(div.width, div.width / 2);
        p.resetSketch();
    }
    
    p.draw = function() {
        //Drawing an ellipse on your mouse coordinates
        p.ellipse(p.mouseX, p.mouseY, 50);
    };

    //Function to reset the sketch back to normal
    p.resetSketch = function() {
        p.background(245);
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