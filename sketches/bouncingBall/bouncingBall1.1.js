/**
 * This sketch is about a bouncing ball quite like the
 * DVD logo back on old tv's that bounces around the
 * screen.
 * 
 * Author:  Nickels Witte
 * Date:    27.04.2019
 * Version: 1.1
 */
const bouncingBallConst = (p) => {

    //Coordinates of the ball
    let x;
    let y;

    //Other properties of the ball
    let speed = 5;

    /**
     * These are the vector components of the circle
     * They act like normal math vectors.
     * 
     * They are always normed to a length of one in order
     * to have a seperate speed variable. That is why it is
     * divided by the squareroot of 2.
     */
    let vectorX = 1 / Math.sqrt(2);
    let vectorY = 1 / Math.sqrt(2);

    /**
     * Those variables are for storing that the circle changed
     * direction when it hit a wall. When it hit it too deep
     * it would get stuck, because it would change directions
     * on every frame. These variables prevent that
     */
    let startedCorrectionX = false;
    let startedCorrectionY = false;
    
    //size of the circle
    let circleWidth = 50;


    //This will be calles on start
    p.setup = function() {
        var c = p.createCanvas(800, 400);
        c.parent("p502");
        //c.style('display', 'block');

        //Make sure everything is without borders
        p.noStroke();
        //Make it smooth
        p.frameRate(60);

        /* 
         * Declare random starting coordinates so that the circle is not
         * in the wall.
         */
        x = p.random(circleWidth, p.width - circleWidth);
        y = p.random(circleWidth, p.height - circleWidth);

        /*
         * Generate random directions for the circle to go.
         */
        vectorX = Math.round(p.random(0, 1)) == 0 ? vectorX * (-1) : vectorX;
        vectorY = Math.round(p.random(0, 1)) == 0 ? vectorY * (-1) : vectorY;

    };
    
    //This will be called every frame
    p.draw = function() {

        //Color the background with the current background color
        p.background(127);

        //Make the fill color for the ball white
        p.fill(255);
    
        p.checkForCollision(0, p.width, 0, p.height);

        //Moving x, depending on direction
        x += vectorX * speed;
        y += vectorY * speed;
    
        //Finally draw the ellipse
        p.ellipse(x, y, circleWidth);
        
        p.printInformation(10, 20);

        //p.setDirectionTo(p.mouseX, p.mouseY);
    };


    /**
     * This method will check for collision with rectangle borders
     */
    p.checkForCollision = function(minX, maxX, minY, maxY) {
        //Change x direction when hitting the sides
        if ((
            //When outside or touching the borders initialize change 
            //direction
            ((x + circleWidth / 2) >= maxX) ||
            ((x - circleWidth / 2) <= minX)) 
            && startedCorrectionX == false) 
        {

            startedCorrectionX = true;
            vectorX *= -1;

        } else if ((
            //When back inside, end the direction change
            ((x + circleWidth / 2) < maxX) &&
            ((x - circleWidth / 2) > minX))
            && startedCorrectionX == true)
        {
            startedCorrectionX = false;
        }

        //change y direction when hitting top or bottom
        if ((
            ((y + circleWidth / 2) >= maxY) ||
            ((y - circleWidth / 2) <= minY)) 
            && startedCorrectionY == false) 
        {

            startedCorrectionY = true;
            vectorY *= -1;
            
        } else if ((
            //When back inside, end the direction change
            ((y + circleWidth / 2) < maxY) &&
            ((y - circleWidth / 2) > minY))
            && startedCorrectionY == true)
        {
            startedCorrectionY = false;    
        }
    }

    /**
     * This method prints information about the circle
     */
    p.printInformation = function(textX, textY) {
        let textLineWidth = 15;

        p.text('X: ' + Math.round(x), textX, textY);

        p.text('Y: ' + Math.round(y), textX, textY + textLineWidth);

        p.text('vectorX: ' + vectorX, textX, textY + 2 * textLineWidth);

        p.text('vectorY: ' + vectorY, textX, textY + 3 * textLineWidth);

        p.text('speed: ' + speed, textX, textY + 4 * textLineWidth);

        p.text('Things to do: Click, K, L', textX, textY + 5 * textLineWidth);
    };


    /**
     * This method makes the circle go in the direction of the coordinates 
     * given
     */
    p.setDirectionTo = function(pointX, pointY) {
        let differenceX = pointX - x;
        let differenceY = pointY - y;

        let differenceLength = Math.sqrt(
            Math.pow(differenceX, 2) +
            Math.pow(differenceY, 2) 
        );

        vectorX = differenceX / differenceLength;
        vectorY = differenceY / differenceLength;
    };

    //Change direction on mouse click
    p.mousePressed = function() {

        //only cound clicks inside the canvas
        if (
            (p.mouseX >= 0 && p.mouseX <= p.width) &&
            (p.mouseY >= 0 && p.mouseY <= p.height)
        ) {
            p.setDirectionTo(p.mouseX, p.mouseY);
        }
        
    };

    //On keys "K" and "L" change speeds
    p.keyPressed = function() {
        if (p.key == 'k') {
            speed = 0;
        } else if (p.key == 'l') {
            speed = 3;
        }
      }


};

//Create the object.
let bouncingBallSketch = new p5(bouncingBallConst);
