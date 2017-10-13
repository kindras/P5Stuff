var particles = [];
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
    fireplace.particles.push(new Particle(fireplace.x, fireplace.y));
    fireplace.particles.forEach((p, idx, objects) => {
      p.update();
      p.show();
    });
    fireplace.particles = fireplace.particles.filter(p => !p.shouldBeDeleted())
  });
}

function mouseClicked() {
  fireplaces.push({x:mouseX, y:mouseY, particles:[]});
}