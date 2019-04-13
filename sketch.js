function setup() {
  // put setup code here
	createCanvas(300, 300);
}

function draw() {
  // put drawing code here
	if (mouseIsPressed) {
    	fill(0, 127, 127);
  	} else {
    	fill(255, 0, 0);
  	}
  	
	ellipse(mouseX, mouseY, 80, 80);
}