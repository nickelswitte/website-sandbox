const bouncingBallConst = (p) => {

    let x;
    let y;

    let circleSpeed = 5;
    let circleWidth = 50;
    let backgroundColors;
    let backgroundColor;

    let xDirectionRight = true;
    let yDirectionDown = true;

    p.setup = function() {
        // put setup code here
        var c = p.createCanvas(800, 400);
        c.parent("p502");
        //c.style('display', 'block');

        p.noStroke();
        p.frameRate(60);

        backgroundColors = [
            p.color(0, 127, 255), 
            p.color(255, 127, 0), 
            p.color(127, 0, 255), 
            p.color(255, 0, 127)
        ];

        x = p.random(0, p.width);
        y = p.random(0, p.height);

        backgroundColor = backgroundColors[0];
    };
    
    p.draw = function() {

        p.background(backgroundColor);

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


};


let bouncingBallSketch = new p5(bouncingBallConst);
