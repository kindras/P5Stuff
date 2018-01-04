let angle = 0;
const rectWidth = 20;
let slider;

function setup() {
	createCanvas(800, 600);
	rectMode(CENTER);
	slider  = createSlider(0,0.1,0,0);
}

function draw() {
	let offset = 1;
	background(51);
	fill(255);
	translate(width/2,height/2);
	
	let y = map(sin(angle),-1,1,-height / 2,height / 2);
	ellipse(0,y,10,10);
	
	angle += slider.value();
}