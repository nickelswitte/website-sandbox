/**
 * uniqueId = bb2_0
 * 
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
const bb2_0Const = (p) => {

    //The array of balls to be displayed
    let balls = [];
    let configArray;
    let pathToConfigs = '/sketches/bouncingBall/2.0/configs.json';

    let modeSelection;

    //This will be calles on start
    p.setup = function() {
        var c = p.createCanvas(800, 400);
        c.parent(bb2_0.sketchDivId);
        //c.style('display', 'block');

        p.windowResized()

        //Make sure everything is without borders
        p.noStroke();
        //Make it smooth
        p.frameRate(60);

        // Load configs from json and trigger reset
        // First parameter is the callback method
        // Second is the path to the right config file
        loadJSON(p.onJSONLoaded, pathToConfigs);

    };

    p.windowResized = function()  {
        let div = p.select(bb2_0.sketchDivId).size();
        p.resizeCanvas(div.width, div.width / 2);
    }

    /**
     * This method is the callback for the loadJSON function.
     * The JSON will land here as 'response'.
     */
    p.onJSONLoaded = function(response) {

        // console.log(response);

        // It is saved into a variable for later use.
        configArray = response;

        // The reset method will be called to initiate the sketch.
        p.reset(configArray[0]);

        modeSelection = p.createSelect();
        modeSelection.parent(bb2_0.controlsDivId);
        modeSelection.id("bbSelect");

        configArray.forEach(function(e) {
            modeSelection.option(e.name);
        });

        modeSelection.changed(function() {
            
            let index = document.getElementById("bbSelect").selectedIndex;

            p.reset(configArray[index]);
        });
    }

    /**
     * This method will reset the sketch to its starting conditions
     * which are defined by the configs.json that is loaded asynchronosly.
     */
    p.reset = function(config) {

        // Create new empty array if there happen to be old elements inside
        balls = [];


        switch (config.type) {
            // In case of basic configuraion
            case "basic":

                for (let i = 0; i < config.amount; ++i) {
                    balls[i] = new BouncingBall(
                        config.x, 
                        config.y, 
                        config.size, 
                        config.speed,
                        config.angle,
                        config.color
                    );
                }

                break;

            case "grid":

                let spawnDistanceX = (config.maxX - config.minX) / (config.m - 1);
                let spawnDistanceY = (config.maxY - config.minY) / (config.n - 1);

                let i = 0;

                for (let n = 0; n < config.n; ++n) {

                    for (let m = 0; m < config.m; ++m) {

                        balls[i] = new BouncingBall(
                            config.minX + spawnDistanceX * m,
                            config.minY + spawnDistanceY * n,
                            config.size,
                            config.speed,
                            config.angle,
                            config.color
                        );

                        ++i;
                    }

                }

                break;
            // When no type specified
            default:
                

        }
        // Creating the balls with the config
        
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
let bb2_0Sketch = new p5(bb2_0Const);

    

