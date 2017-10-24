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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  let newCols = floor(width / colSize);
  rows = floor(height / rowSize);
  if(newCols > cols) {
    for(i = cols; i < newCols; i++)
      grid.cells.push([]);
  }
  cols = newCols;

}

function mousePressed() {
  if (mouseX > width || mouseY > height) return;
  let c = floor(mouseX / colSize);
  let r = floor(mouseY / rowSize);
  grid.setCell(c, r);
}

class Grid {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.cells = new Array(cols);
    this.initCell = 0;
    for (let col = 0; col < cols; col++) {
      this.cells[col] = new Array(rows);
    }
    this.init();
  }

  init() {
    for (let col = 0; col < this.cols; col++) {
      for (let row = 0; row < this.rows; row++) {
        if (random() < this.initCell) {
          this.cells[col][row] = true;
        }
      }
    }
    this.generateStructures();
  }

  setCell(col, row) {
    if (col >= this.cols || col < 0 || row >= this.rows || row < 0) {
      return undefined;
    }
    this.cells[col][row] = true;
  }

  getCell(col, row) {
    if (col >= this.cols || col < 0 || row >= this.rows || row < 0) {
      return undefined;
      }
    return this.cells[col][row];
  }

  generateStructures(numberOfStructures) {
    const structures = [
      [
        [undefined, undefined, undefined], [true, true, true],
        [undefined, undefined, undefined]
      ],  // Blinker
      [
        [undefined, true, undefined], [undefined, undefined, true],
        [true, true, true]
      ]  // Planner
    ];
    for (let i = 0; i < 180; ++i) {
      let middleW = floor(random(1, this.cols - 2));
      let middleH = floor(random(1, this.rows - 2));
      let structure = random(structures);
      for (let c = 0; c < 3; c++) {
        for (let r = 0; r < 3; r++) {
          this.cells[middleW + c][middleH + r] = structure[c][r];
        }
      }
    }
  }

  update() {
    let tempCells = new Array(cols);
    let oldCells = 0;
    let newCells = 0;
    for (var col = 0; col < cols; col++) {
      tempCells[col] = new Array(rows);
    }

    for (let col = 1; col < cols - 1; ++col) {
      for (let row = 1; row < rows - 1; ++row) {
        oldCells += this.getCell(col, row) ? 1:0;
        let livingCells = this.getLivingNeighbors(col, row);
        if (livingCells == 3) {
          tempCells[col][row] = true;
        } else if (livingCells == 2) {
          tempCells[col][row] = this.cells[col][row];
        }

        if(tempCells[col][row])
          newCells ++;
      }
    }
    this.cells = tempCells;

    if(newCells > oldCells) {
      oscillator.freq(map(newCells - oldCells, 1, 10, 500,650));
      oscillator.amp(0.5,0.1);
    } else if(newCells < oldCells)  {
      oscillator.freq(map(oldCells - newCells, 1, 10, 350,480));
      oscillator.amp(0.5,0.1);
    } else {
      oscillator.amp(0,0.1);
    }
  }
  getLivingNeighbors(col, row) {
    let counter = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i == 0 && j == 0) {
          continue;
          }
        if (this.cells[col + i][row + j]) counter++;
      }
      }
    return counter;
  }
}