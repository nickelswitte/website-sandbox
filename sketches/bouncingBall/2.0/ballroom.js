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
const ballroomConst = (p) => {

    //The array of balls to be displayed
    let balls = [];
    let configArray;
    let pathToConfigs = './sketches/bouncingBall/2.0/configs.json';

    let modeSelection;

    //This will be calles on start
    p.setup = function() {
        var c = p.createCanvas(800, 400);
        c.parent("p502");
        //c.style('display', 'block');

        //Make sure everything is without borders
        p.noStroke();
        //Make it smooth
        p.frameRate(60);

        // Load configs from json and trigger reset
        // First parameter is the callback method
        // Second is the path to the right config file
        loadJSON(p.onJSONLoaded, pathToConfigs);

    };

    /**
     * This method is the callback for the loadJSON function.
     * The JSON will land here as 'response'.
     */
    p.onJSONLoaded = function(response) {
        // It is saved into a variable for later use.
        configArray = response;

        // The reset method will be called to initiate the sketch.
        p.reset(configArray[0]);

        modeSelection = p.createSelect();
        modeSelection.parent("p502");
        modeSelection.id("bbSelect");

        configArray.forEach(function(e) {
            modeSelection.option(e.name);
        });

        modeSelection.changed(function() {
            
            let index = document.getElementById("bbSelect").selectedIndex;

            p.reset(configArray[index]);
        })
        
        //modeSelection.changed(p.reset(configArray[2]));
        
        /*
        var scripts = document.getElementsByTagName("script");
        var src = scripts[scripts.length-1].src;
        var name = scripts[scripts.length - 1].;
        p.print(src + " " + name);
        */
    }

    /**
     * This method will reset the sketch to its starting conditions
     * which are defined by the configs.json that is loaded asynchronosly.
     */
    p.reset = function(config) {

        // Create new empty array if there happen to be old elements inside
        balls = [];

        // Creating the balls with the config
        for (let i = 0; i < config.amount; ++i) {
            balls[i] = new BouncingBall(
                config.x, 
                config.y, 
                config.size, 
                config.speed,
                config.color
            );
        }
    }
    
    //This will be called every frame
    p.draw = function() {

        //Color the background with the current background color
        p.background(100);

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
let br = new p5(ballroomConst);

    

