var fireplaces = [];

/**
 * Canvas initialisation
 */
function setup() {
  createCanvas(windowWidth, windowHeight); 
  background(51);
}

/**
 * P5 function called every frame.
 */
function draw() {
  background(51);
  fireplaces.forEach(fireplace => {
    fireplace.update();
    fireplace.show();
  });
}

function mouseClicked() {
  fireplaces.push(new Fireplace(mouseX, mouseY));
}