let cells = [];
let grid;

let colSize = rowSize = 20;
let rows;
let cols;
let oscillator;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);
  fill(255);

  rows = floor(height / rowSize);
  cols = floor(width / colSize);
  grid = new Grid(cols, rows);
  frameRate(10);

  oscillator = new p5.Oscillator();
  oscillator.setType('square');
  oscillator.freq(440);
  oscillator.amp(0);
  oscillator.start();
}

function draw() {
  background(51);
  grid.update();
  for (let col = 0; col < cols; ++col) {
    for (let row = 0; row < rows; ++row) {
      if (grid.getCell(col, row)) {
        let distance = abs(col - floor(cols / 2)) + abs(row - floor(rows / 2));
        let r = map(distance, 0, floor(rows / 2) + floor(cols / 2), 0, 255);
        let b = map(distance, 0, floor(rows / 2) + floor(cols / 2), 255, 0);
        fill(r, 0, b);
        rect(col * colSize, row * rowSize, colSize, rowSize);
      }
    }
  }
}
function mousePressed() {
  if (mouseX > width || mouseY > height) return;
  let c = floor(mouseX / colSize);
  let r = floor(mouseY / rowSize);
  grid.setCell(c, r);
}