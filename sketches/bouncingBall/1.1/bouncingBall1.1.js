/**
 * unique_id = bb1_1
 * 
 * This sketch is about a bouncing ball quite like the
 * DVD logo back on old tv's that bounces around the
 * screen.
 * 
 * Author:  Nickels Witte
 * Date:    28.04.2019
 * Version: 1.1
 */
const bb1_1Const = (p) => {

    //Coordinates of the ball
    let x;
    let y;

    //variable that holds the speed of the circle
    let speed = 5;
    let speedBackup = speed;

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

    //Stores if it should follow the mouse at the moment
    let followMouse = false;

    //This will be calles on start
    p.setup = function() {
        var c = p.createCanvas(800, 400);
        c.parent(bb1_1.sketchDivId);
        //c.style('display', 'block');

        p.windowResized();

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

    p.windowResized = function()  {
        let div = p.select(bb1_1.sketchDivId).size();
        p.resizeCanvas(div.width, div.width / 2);
    }
    
    //This will be called every frame
    p.draw = function() {

        //Color the background with the current background color
        p.background(127);

        //Make the fill color for the ball white
        if (followMouse) {
            p.fill('#f25f5c');
        } else {
            p.fill(255);
        }
        
    
        //check for collision with walls and change direction
        p.checkForCollision(0, p.width, 0, p.height);

        //Moving x, depending on direction
        x += vectorX * speed;
        y += vectorY * speed;
    
        //Finally draw the ellipse
        p.ellipse(x, y, circleWidth);
        
        p.printInformation(10, 20);

        //chance direction every frame so it follows all the time
        p.attemptToFollowMouse();
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

        /**
         * This part will check for collision with the mouse when the follow
         * mouse mode is activated. When there is a collision, it deactivates
         * the following, as it would otherwise shake under the mouse
         */
        if (
            (Math.abs(x - p.mouseX) < 5) &&
            (Math.abs(y - p.mouseY) < 5) &&
            followMouse
        ) {
            followMouse = false;
        }
    };

    /**
     * This method will check if the followMouse variable is set
     * to true and if so change the direction to that coordinate.
     */
    p.attemptToFollowMouse = function() {
        if (!followMouse) {
            return;
        }

        //Only do this when inside the canvas
        if (
            (p.mouseX >= 0 && p.mouseX <= p.width) &&
            (p.mouseY >= 0 && p.mouseY <= p.height)
        ) {
            p.setDirectionTo(p.mouseX, p.mouseY);
        }
    };

    /**
     * This method prints information about the circle
     */
    p.printInformation = function(textX, textY) {
        // First save the current draw settings
        p.push();

        p.fill(255);

        let textLineWidth = 15;

        p.text('X: ' + Math.round(x), textX, textY);

        p.text('Y: ' + Math.round(y), textX, textY + textLineWidth);

        p.text('speed: ' + speed, textX, textY + 2 * textLineWidth);

        p.text('Click or press B', textX, textY + 3 * textLineWidth);


        /**
         * Small visual display of the current circle vector
         */
        // and change them to what we need
        p.stroke(255);
        p.noFill();

        // The coordinates of the center of the display relative to the
        // coordinates of the information
        let vectorDisplayCenterX = textX + 80;
        let vectorDisplayCenterY = textY + 5;

        // Length of line and circle radius
        let vectorDisplayLength = 15;

        // Calculation of the end points of the vector needs to be done
        let vectorEndX = vectorDisplayCenterX + vectorX * vectorDisplayLength;
        let vectorEndY = vectorDisplayCenterY + vectorY * vectorDisplayLength;

        // Draw the line of the vector
        p.line(
            vectorDisplayCenterX, 
            vectorDisplayCenterY, 
            vectorEndX, 
            vectorEndY
        );
        
        // Draw the ellipse as some kind of border
        p.ellipse(
            vectorDisplayCenterX, 
            vectorDisplayCenterY, 
            vectorDisplayLength * 1.8
        );

        // Delete the changed draw settings.
        p.pop();
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
        if (
            (p.mouseX >= 0 && p.mouseX <= p.width) &&
            (p.mouseY >= 0 && p.mouseY <= p.height)
        ) {
            followMouse = (followMouse == false); 
        }
    };

    /**
     * This method is called whenever there is a key pressed
     */
    p.keyPressed = function() {

        //Only listen for key presses when mouse is inside
        if (
            (p.mouseX < 0 || p.mouseX > p.width) ||
            (p.mouseY < 0 || p.mouseY > p.height)
        ) {
            return;
        }

        if (p.key == 'b') {
            // Toggle mechanism for pausing the circle
            if (speed != 0) {
                speedBackup = speed;
                speed = 0;
            } else {
                speed = speedBackup;
            }
        }
      }


};

//Create the object.
let bb1_1Sketch = new p5(bb1_1Const);
