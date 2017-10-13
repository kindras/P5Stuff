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

class Particle{
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1,1);
    this.vy = random(-5,-1);
    this.alpha = 255;
  }

  shouldBeDeleted() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }

  show() {
    noStroke();
    let r = map(this.alpha, 0,255, 243, 218);
    let g = map(this.alpha, 0,255, 207,41);
    let b = map(this.alpha, 0,255, 85,28);
    fill(r,g,b,this.alpha);
    ellipse(this.x,this.y,10);
  }
}