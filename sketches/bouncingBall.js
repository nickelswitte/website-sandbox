let x = 172;
let y = 80;

let circleSpeed = 5;
let circleWidth = 50;

let xDirectionRight = true;
let yDirectionDown = true;

function setup() {
    // put setup code here
    createCanvas(600, 500);
    noStroke();
    frameRate(60);

    //noCursor();
    //print("This canvas is ready");
}
  
function draw() {

    background(200);
  
    if ( (x + circleWidth / 2) >= width) {
        xDirectionRight = false;
    } else if ( (x - circleWidth / 2) <= 0) {
        xDirectionRight = true;
    }

    if ( (y + circleWidth / 2) >= height) {
        yDirectionDown = false;
    } else if ( (y - circleWidth / 2) <= 0) {
        yDirectionDown = true;
    }

    if (xDirectionRight) {
        x += circleSpeed;
    } else {
        x -= circleSpeed;
    }
    
    if (yDirectionDown) {
        y += circleSpeed;
    } else {
        y -= circleSpeed;
    }
    
    ellipse(x, y, circleWidth);
}
  
function mousePressed() {

    if (
        (mouseX >= 0 && mouseX <= width) &&
        (mouseY >= 0 && mouseY <= height)
    ) {
        xDirectionRight = !xDirectionRight;
        yDirectionDown = !yDirectionDown;
    }
}