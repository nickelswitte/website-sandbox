

/**
 * This is the class for the bouncing ball.
 * It has coordinates, speed, direction vectors, etc.
 * It lets you create as many balls as you wish.
 * 
 * Author:  Nickels Witte
 * Date:    02.05.2019
 * Version: 1.2
 */
class BouncingBall {

    constructor(x, y, circleWidth, circleSpeed, angle, color) {

        this.x;
        this.y;
        
        this.width;
        this.speed;

        this.color;

        // Angle will be translated to two vectors
        this.vectorX;
        this.vectorY;

        // Set the booleans to false, as it is not correcting on spawn
        this.startedCorrectionX = false;
        this.startedCorrectionY = false;

        // Also follow mouse should not be turned to true on start
        this.followMouse = false;

        // Setting the values

        // Width of the ball
        if (circleWidth === undefined) {
            this.width = 50;
        } else {
            this.width = circleWidth;
        }

        // Speed of the ball
        if (circleSpeed === undefined) {
            this.speed = 5;
            //Backup variable is necessary for restoring on toggleSpeed
            this.speedBackup = this.speed;
        } else {
            this.speed = circleSpeed;
            this.speedBackup = this.speed;
        }
        
        // X-Coordinate
        if (x === undefined || x === -1) {
            this.x = bb2_0.random(this.width / 2, bb2_0.width - this.width / 2);
        } else {
            this.x = x;
        }
        
        // Y-Coordinate
        if (y === undefined || y == -1) {
            this.y = bb2_0.random(this.width / 2, bb2_0.height - this.width / 2);
        } else {
            this.y = y;
        }

        if (angle === undefined || angle == null) {
            angle = bb2_0.map(bb2_0.random(), 0, 1, 0, 360);
        }

        // Conversion from degree to radians
        angle = angle * Math.PI / 180;

        // console.log(angle + " " + Math.cos(angle) + " " + Math.sin(angle))

        this.vectorX = Math.cos(angle);
        this.vectorY = Math.sin(angle);

        // Color of the
        if (color === undefined || color.length == 0) {
            let colorValue = bb2_0.map(bb2_0.random(), 0, 1, 150, 255);
            this.color = colorValue;
        } else {
            this.color = color;
        }

        

        /**
         * These are the vector components of the circle
         * They act like normal math vectors.
         * 
         * They are always normed to a length of 1.0 in order
         * to not change speed (it has its own variable). 
         */
        /*
        this.vectorX = 1 / Math.sqrt(2);
        this.vectorY = 1 / Math.sqrt(2);

        //Now the direction is random
        this.vectorX = Math.round(bb2_0.random(0, 1)) == 0 ? this.vectorX * 
        (-1) : this.vectorX;

        this.vectorY = Math.round(bb2_0.random(0, 1)) == 0 ? this.vectorY * 
        (-1) : this.vectorY;

        
        */
        
    }

    /**
     * This method will be called every time the canvas is drawn.
     * It will do the inportant stuff to the ball like drawing the
     * shape, moving the coordinates, etc.
     */
    draw() {
        // Save current draw settings of canvas
        bb2_0.push();

        // check for collision with walls and change direction if necessary
        this.checkForBorderCollision(0, bb2_0.width, 0, bb2_0.height);

        // chance direction every frame so it follows all the time
        this.attemptToFollowMouse();

        // Decide what to do depending on followMouse
        if (this.followMouse) {
            // Color the ball in a shade of red
            bb2_0.fill(this.color, 0, 0);
            
            // Make it speed up
            this.speed += this.speedBackup * 0.02;

            // Check if ball and mouse collide
            this.checkForMouseCollision();
        } else {
            // Color it with the normal color and do nothing special
            bb2_0.fill(this.color);
        }

        //Calculate new coordinates
        this.x += this.vectorX * this.speed;
        this.y += this.vectorY * this.speed;
    
        //Finally draw the ellipse
        bb2_0.ellipse(this.x, this.y, this.width);

        //Delete the changed draw settings
        bb2_0.pop();
    }

    /**
     * This method will check for collision with rectangle borders
     */
    checkForBorderCollision(minX, maxX, minY, maxY) {
        //Change x direction when hitting the sides
        if ((
            //When outside or touching the borders initialize change 
            //direction
            ((this.x + this.width / 2) >= maxX) ||
            ((this.x - this.width / 2) <= minX)) 
            && this.startedCorrectionX == false) 
        {

            this.startedCorrectionX = true;
            this.vectorX *= -1;

        } else if ((
            //When back inside, end the direction change
            ((this.x + this.width / 2) < maxX) &&
            ((this.x - this.width / 2) > minX))
            && this.startedCorrectionX == true)
        {
            this.startedCorrectionX = false;
        }

        //change y direction when hitting top or bottom
        if ((
            ((this.y + this.width / 2) >= maxY) ||
            ((this.y - this.width / 2) <= minY)) 
            && this.startedCorrectionY == false) 
        {

            this.startedCorrectionY = true;
            this.vectorY *= -1;
            
        } else if ((
            //When back inside, end the direction change
            ((this.y + this.width / 2) < maxY) &&
            ((this.y - this.width / 2) > minY))
            && this.startedCorrectionY == true)
        {
            this.startedCorrectionY = false;    
        }
    }

    /**
     * This method will check for collision with the mouse. 
     * When there is a collision, it deactivates
     * the following, as it would otherwise shake under the mouse
     */
    checkForMouseCollision() {
        if (
            (Math.abs(this.x - bb2_0.mouseX) < 5) &&
            (Math.abs(this.y - bb2_0.mouseY) < 5)
        ) {
            this.toggleFollowMouse(false);
        }
    }


    /**
     * This method will check if the followMouse variable is set
     * to true and if so change the direction to that coordinate.
     */
    attemptToFollowMouse() {
        if (!this.followMouse) {
            return;
        }

        //Only do this when inside the canvas
        if (
            (bb2_0.mouseX >= 0 && bb2_0.mouseX <= bb2_0.width) &&
            (bb2_0.mouseY >= 0 && bb2_0.mouseY <= bb2_0.height)
        ) {
            this.setDirectionTo(bb2_0.mouseX, bb2_0.mouseY);
        }
    }

    /**
     * This method makes the circle go in the direction of the coordinates 
     * given
     */
    setDirectionTo(pointX, pointY) {
        let differenceX = pointX - this.x;
        let differenceY = pointY - this.y;

        let differenceLength = Math.sqrt(
            Math.pow(differenceX, 2) +
            Math.pow(differenceY, 2) 
        );

        this.vectorX = differenceX / differenceLength;
        this.vectorY = differenceY / differenceLength;
    }

    /**
     * This method will toggle the speed of the ball. Either it will be 
     * this.speed or not move at all.
     */
    toggleSpeed() {
        // Toggle mechanism for pausing the circle
        if (this.speed != 0) {
            this.speedBackup = this.speed;
            this.speed = 0;
        } else {
            this.speed = this.speedBackup;
        }
    }

    /**
     * This method will toggle between the mode of free flowing and following
     * the mouse.
     */
    toggleFollowMouse(followMouse) {
        //When just called to toggle
        if (followMouse === undefined) {
            // Set it to opposite of current boolean so it will trigger the
            // if or else statement below
            followMouse = !this.followMouse;
        } 
        
        if (followMouse == true) {
            this.followMouse = true;
        } else {
            this.followMouse = false;
            this.speed = this.speedBackup;
        }
    }
}