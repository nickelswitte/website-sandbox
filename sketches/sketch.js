function setup() {
  // put setup code here
	createCanvas(500, 500);

	

	noCursor();


	print("This canvas is ready");
}

function draw() {

	noStroke();
	
	// put drawing code here
	if (mouseIsPressed) {
    	fill(0, 127, 127);
  	} else {
    	fill(255, 0, 0);
  	}
  	
	//ellipse(mouseX, mouseY, 80, 80);

	background(200);

	quad(
		10, 10, 
		10, 40, 
		40, 40, 
		40, 10
	);

	quad(
		mouseX - 10, mouseY - 10, 
		mouseX - 10, mouseY + 10, 
		mouseX + 10, mouseY + 10, 
		mouseX + 10, mouseY - 10
	);
	
}

function mousePressed() {
  if (mouseX >= 10 && mouseX <= 40 && mouseY >= 10 && mouseY <= 40) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}