/**
 * This sketch is about a bouncing ball quite like the
 * DVD logo back on old tv's that bounces around the
 * screen.
 * 
 * Author:  Nickels Witte
 * Date:    28.04.2019
 * Version: 1.1
 */
const bouncingBallConst = (p) => {

    let balls = [];

    let i;

    //This will be calles on start
    p.setup = function() {
        var c = p.createCanvas(800, 400);
        c.parent("p502");
        //c.style('display', 'block');

        //Make sure everything is without borders
        p.noStroke();
        //Make it smooth
        p.frameRate(60);

        //balls = new Array[10];

        for (i = 0; i < 50; ++i) {
            balls[i] = new BouncingBall(-1, -1, 50, 2);
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

    

    //Change direction on mouse click
    p.mousePressed = function() {
        if (
            (p.mouseX >= 0 && p.mouseX <= p.width) &&
            (p.mouseY >= 0 && p.mouseY <= p.height)
        ) {

            balls.forEach(function(e) {
                e.followMouse = (e.followMouse == false);
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

        if (p.key == ' ') {
            balls.forEach(function(e) {
                e.toggleSpeed();
            });
        }
      }


};

//Create the object.
let bbS = new p5(bouncingBallConst);
