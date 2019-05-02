/**
 * This sketch is about a bouncing ball quite like the
 * DVD logo back on old tv's that bounces around the
 * screen.
 * 
 * It incorporated a bouncingBall object and lets you
 * spawn as many as you wish.
 * 
 * Author:  Nickels Witte
 * Date:    02.05.2019
 * Version: 1.2
 */
const bouncingBallConst = (p) => {

    //The array of balls to be displayed
    let balls = [];

    //This will be calles on start
    p.setup = function() {
        var c = p.createCanvas(800, 400);
        c.parent("p502");
        //c.style('display', 'block');

        //Make sure everything is without borders
        p.noStroke();
        //Make it smooth
        p.frameRate(60);

        for (let i = 0; i < 100; ++i) {
            balls[i] = new BouncingBall(-1, -1, 15, 2);
        }

    };
    
    //This will be called every frame
    p.draw = function() {

        //Color the background with the current background color
        p.background(127);

        balls.forEach(function(e) {
            e.draw();
        });
    };

    

    
    p.mousePressed = function() {
        //Only when clicked on the canvas
        if (
            (p.mouseX >= 0 && p.mouseX <= p.width) &&
            (p.mouseY >= 0 && p.mouseY <= p.height)
        ) {

            //Change direction on mouse click
            balls.forEach(function(e) {
                e.toggleFollowMouse();
            });
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

        //When pressed space, toggle the speed 
        if (p.key == ' ') {
            balls.forEach(function(e) {
                e.toggleSpeed();
            });
        }
      }


};

//Create the object.
let bbS = new p5(bouncingBallConst);
