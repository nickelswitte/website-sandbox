const drawCirclesConst = (p) => {

    p.setup = function() {
        var c = p.createCanvas(800, 400);
        c.parent("p501");

        p.resetSketch();
    };

    p.draw = function() {
        p.ellipse(p.mouseX, p.mouseY, 50, 50);
    };

    p.resetSketch = function() {
        p.fill(255);
        p.background(0);
    }

    p.mousePressed = function() {
        if (
            (p.mouseX >= 0 && p.mouseX <= p.width) &&
            (p.mouseY >= 0 && p.mouseY <= p.height)
        ) {
            p.resetSketch();        
        }
        
    };

};

let drawCirclesSketch = new p5(drawCirclesConst);