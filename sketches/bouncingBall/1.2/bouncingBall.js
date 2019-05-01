class BouncingBall {

    constructor(x, y, circleWidth, circleSpeed) {

        //bbS.print(x + " " + y + " " + circleWidth + " " + circleSpeed);

        if (circleWidth === undefined) {
            this.width = 50;
        } else {
            this.width = circleWidth;
        }

        if (circleSpeed === undefined) {
            this.speed = 5;
            this.speedBackup = this.speed;
        } else {
            this.speed = circleSpeed;
            this.speedBackup = this.speed;
        }
        
        if (x === undefined || x === -1) {
            this.x = bbS.random(this.width, bbS.width - this.width);
        } else {
            this.x = x;
        }
        
        if (y === undefined || y == -1) {
            this.y = bbS.random(this.width, bbS.height - this.width);
        } else {
            this.y = y;
        }

        

        /**
         * These are the vector components of the circle
         * They act like normal math vectors.
         * 
         * They are always normed to a length of one in order
         * to have a seperate speed variable. That is why it is
         * divided by the squareroot of 2.
         */
        this.vectorX = 1 / Math.sqrt(2);
        this.vectorY = 1 / Math.sqrt(2);

        this.vectorX = Math.round(bbS.random(0, 1)) == 0 ? this.vectorX * (-1) : this.vectorX;
        this.vectorY = Math.round(bbS.random(0, 1)) == 0 ? this.vectorY * (-1) : this.vectorY;

        this.startedCorrectionX = false;
        this.startedCorrectionY = false;

        this.followMouse = false;
    }

    draw() {
        //Make the fill color for the ball white
        if (this.followMouse) {
            bbS.fill('#c34a36');
        } else {
            bbS.fill(255);
        }

        //check for collision with walls and change direction
        this.checkForBorderCollision(0, bbS.width, 0, bbS.height);
        this.checkForMouseCollision();

        //Moving x, depending on direction
        this.x += this.vectorX * this.speed;
        this.y += this.vectorY * this.speed;
    
        //Finally draw the ellipse
        bbS.ellipse(this.x, this.y, this.width);
        //bbS.print(this.x + " " + this.y + " " + this.width + " " + this.speed);

        //printInformation(10, 20);

        //chance direction every frame so it follows all the time
        this.attemptToFollowMouse();
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
     * This part will check for collision with the mouse when the follow
     * mouse mode is activated. When there is a collision, it deactivates
     * the following, as it would otherwise shake under the mouse
     */
    checkForMouseCollision() {
        if (
            (Math.abs(this.x - bbS.mouseX) < 5) &&
            (Math.abs(this.y - bbS.mouseY) < 5) &&
            this.followMouse
        ) {
            this.followMouse = false;
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
            (bbS.mouseX >= 0 && bbS.mouseX <= bbS.width) &&
            (bbS.mouseY >= 0 && bbS.mouseY <= bbS.height)
        ) {
            this.setDirectionTo(bbS.mouseX, bbS.mouseY);
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
     * This method prints information about the circle
     */
    /*
    p.printInformation = function(textX, textY) {
        // First save the current draw settings
        p.push();

        p.fill(255);

        let textLineWidth = 15;

        p.text('X: ' + Math.round(x), textX, textY);

        p.text('Y: ' + Math.round(y), textX, textY + textLineWidth);

        p.text('speed: ' + speed, textX, textY + 2 * textLineWidth);

        p.text('Click or press Space', textX, textY + 3 * textLineWidth);


        /**
         * Small visual display of the current circle vector
         */
        /*
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
    }
    */
}