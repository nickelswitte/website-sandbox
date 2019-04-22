let x;
let y;

let circleSpeed = 5;
let circleWidth = 50;
let backgroundColors;
let backgroundColor;

let xDirectionRight = true;
let yDirectionDown = true;

function setup() {
    // put setup code here
    var c = createCanvas(600, 500);
    c.parent("p502");
    c.style('display', 'block');

    noStroke();
    frameRate(60);

    backgroundColors = [
        color(0, 127, 255), 
        color(255, 127, 0), 
        color(127, 0, 255), 
        color(255, 0, 127)
    ];

    x = random(0, width);
    y = random(0, height);

    backgroundColor = backgroundColors[0];
}
  
function draw() {

    background(backgroundColor);

    fill(255);
  
    //Change x direction when hitting the sides
    if ( (x + circleWidth / 2) >= width) {
        xDirectionRight = false;

        changeBackground();
    } else if ( (x - circleWidth / 2) <= 0) {
        xDirectionRight = true;

        changeBackground();
    }

    //change y direction when hitting top or bottom
    if ( (y + circleWidth / 2) >= height) {
        yDirectionDown = false;

        changeBackground();
    } else if ( (y - circleWidth / 2) <= 0) {
        yDirectionDown = true;

        changeBackground();
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
    
    ellipse(x, y, circleWidth);
}

//Change direction on mouse click
function mousePressed() {

    //only cound clicks inside the canvas
    if (
        (mouseX >= 0 && mouseX <= width) &&
        (mouseY >= 0 && mouseY <= height)
    ) {
        xDirectionRight = !xDirectionRight;
        yDirectionDown = !yDirectionDown;
    }
    
}

//Pick random color background
function changeBackground() {
    backgroundColor = random(backgroundColors);
}