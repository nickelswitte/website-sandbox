/**
 * This sketch is about a bouncing ball quite like the
 * DVD logo back on old tv's that bounces around the
 * screen.
 * 
 * Author:  Nickels Witte
 * Date:    27.04.2019
 * Version: 1.0
 */
const bbC1_0 = (p) => {

    //Coordinates of the ball
    let x;
    let y;

    //Other properties of the ball
    let circleSpeed = 5;
    let circleWidth = 50;
    
    
    let xDirectionRight;
    let yDirectionDown;


    //Array of all colors and current color
    let backgroundColors;
    let backgroundColor;

    //This will be calles on start
    p.setup = function() {
        var c = p.createCanvas(800, 400);
        c.parent("1002");
        //c.style('display', 'block');

        //Make sure everything is without borders
        p.noStroke();
        //Make it smooth
        p.frameRate(60);

        //Declare the array of colors that will appear
        backgroundColors = [
            p.color(0, 127, 255), 
            p.color(255, 127, 0), 
            p.color(127, 0, 255), 
            p.color(255, 0, 127)
        ];

        /* 
         * Declare random starting coordinates so that the circle is not
         * in the wall.
         */
        x = p.random(circleWidth, p.width - circleWidth);
        y = p.random(circleWidth, p.height - circleWidth);

        /*
         * Generate random directions for the circle to go.
         */
        xDirectionRight = Math.round(p.random(0, 1)) == 0 ? true : false;
        yDirectionDown = Math.round(p.random(0, 1)) == 0 ? true : false;

        //Set first background color
        backgroundColor = backgroundColors[0];
    };
    
    //This will be called every frame
    p.draw = function() {

        //Color the background with the current background color
        p.background(backgroundColor);

        //Make the fill color for the ball white
        p.fill(255);
    
        //Change x direction when hitting the sides
        if ( (x + circleWidth / 2) >= p.width) {
            xDirectionRight = false;

            p.changeBackground();
        } else if ( (x - circleWidth / 2) <= 0) {
            xDirectionRight = true;

            p.changeBackground();
        }

        //change y direction when hitting top or bottom
        if ( (y + circleWidth / 2) >= p.height) {
            yDirectionDown = false;

            p.changeBackground();
        } else if ( (y - circleWidth / 2) <= 0) {
            yDirectionDown = true;

            p.changeBackground();
        }

        //Moving x, depending on direction
        if (xDirectionRight) {
            x += circleSpeed;
        } else {
            x -= circleSpeed;
        }
        
        //Moving y depending on direction
        if (yDirectionDown) {
            y += circleSpeed;
        } else {
            y -= circleSpeed;
        }
        
        //Finally draw the ellipse
        p.ellipse(x, y, circleWidth);
    };


    //Change direction on mouse click
    p.mousePressed = function() {

        //only cound clicks inside the canvas
        if (
            (p.mouseX >= 0 && p.mouseX <= p.width) &&
            (p.mouseY >= 0 && p.mouseY <= p.height)
        ) {
            xDirectionRight = !xDirectionRight;
            yDirectionDown = !yDirectionDown;
        }
        
    };

    //Pick random color background
    p.changeBackground = function() {
        backgroundColor = p.random(backgroundColors);
    };

    //On keys "K" and "L" change speeds
    p.keyPressed = function() {
        if (p.key == 'k') {
            circleSpeed++;
        } else if (p.key == 'l' && circleSpeed > 0) {
            circleSpeed--;
        }
      }


};

//Create the object.
let bb1_0 = new p5(bbC1_0);
