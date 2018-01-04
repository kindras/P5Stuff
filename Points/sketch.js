let points = [];
let lineW = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	points.push(createVector(0.2*width,height/2));
	points.push(createVector(0.8*width,height/2));
	
	
}

function draw() {
	background(51);
	fill(255);
	stroke(255);

	for (const pt of points) {
		ellipse(pt.x, pt.y,10);
	}
	
	lineW += 0.01;
	if(lineW > 1) {
		lineW = 0;
	}

	const pt1 = points[0];
	const pt2 = points[1];

	line(pt1.x, pt1.y, pt2.x * lineW, pt2.y * lineW)
}