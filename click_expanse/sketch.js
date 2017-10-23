let cells = [];
let grid;

let colSize;
let rowSize;
const rows = 40;
const cols = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);
  fill(255);
  colSize = floor( width / cols);
  rowSize = floor( height / rows);
  grid = new Grid(cols, rows);
  for(let col = 0; col < cols; ++col) {
    for(let row = 0; row < rows; ++row) {
      if(grid.getCell(col,row)){
        rect(col * colSize, row * rowSize, colSize, rowSize);
      }
    }
  }
  frameRate(5);
}

function draw() {
  background(51);
  fill(255);
  grid.update();
  for(let col = 0; col < cols; ++col) {
    for(let row = 0; row < rows; ++row) {
      if(grid.getCell(col,row)){
        rect(col * colSize, row * rowSize, colSize, rowSize);
      }
    }
  }
}

function mousePressed() {
  if (mouseX > width || mouseY > height) return;
  let c = floor(mouseX/colSize);
  let r = floor(mouseY/rowSize);
  if(!grid.getCell(c,r)) {
    grid.setCell(c,r);
  }
  
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
    for(let col = 0; col < this.cols; col++) {
      for(let row = 0; row < this.rows; row++) {
        if(random() < this.initCell) {
          this.cells[col][row] = true;
        }
      }
    }
    this.generateStructures();    
  }

  setCell(col, row) {
    if(col >= this.cols || col < 0 || row >= this.rows || row < 0) {
      return undefined;
      
    }
    this.cells[col][row] = 111;
  }
  
  getCell(col, row) {
    if(col >= this.cols || col < 0 || row >= this.rows || row < 0) {
      return undefined;
    }
    return this.cells[col][row];
  }

  /* Structures can be:
     - Blinker
       3*3
       ...    .-.
       --- => .-.
       ...    .-.
     - Planner 
       3*3
      .-.
      ..-
      ---      
   */
  generateStructures(numberOfStructures) {
    let middleW = floor(this.cols / 2);
    let middleH = floor(this.rows / 2);
    if(random() > 0.5) {
      // Blinker
      this.cells[middleW-1][middleH-1] = undefined;
      this.cells[middleW][middleH-1] = undefined;
      this.cells[middleW+1][middleH-1] = undefined;
      this.cells[middleW-1][middleH] = true;
      this.cells[middleW][middleH] = true;
      this.cells[middleW+1][middleH] = true;
      this.cells[middleW-1][middleH+1] = undefined;
      this.cells[middleW][middleH+1] = undefined;
      this.cells[middleW+1][middleH+1] = undefined;
    } else {
      // Planner
      this.cells[middleW-1][middleH-1] = undefined;
      this.cells[middleW][middleH-1] = true;
      this.cells[middleW+1][middleH-1] = undefined;
      this.cells[middleW-1][middleH] = undefined;
      this.cells[middleW][middleH] = undefined;
      this.cells[middleW+1][middleH] = true;
      this.cells[middleW-1][middleH+1] = true;
      this.cells[middleW][middleH+1] = true;
      this.cells[middleW+1][middleH+1] = true;
    }
    console.log(this.getLivingNeighbors(middleW-1,middleH-1) );
    console.log(this.getLivingNeighbors(middleW,middleH-1));
    console.log(this.getLivingNeighbors(middleW+1,middleH-1));
    console.log(this.getLivingNeighbors(middleW-1,middleH));
    console.log(this.getLivingNeighbors(middleW,middleH));
    console.log(this.getLivingNeighbors(middleW+1,middleH));
    console.log(this.getLivingNeighbors(middleW-1,middleH+1));
    console.log(this.getLivingNeighbors(middleW,middleH+1));
    console.log(this.getLivingNeighbors(middleW+1,middleH+1));
  }

  update() {
    let tempCells = new Array(cols);
    for (var col = 0; col < cols; col++) {
      tempCells[col] = new Array(rows);      
    } 
    for(let col = 1; col < cols -1; ++col) {
      for(let row = 1; row < rows -1; ++row) {
        let livingCells = this.getLivingNeighbors(col,row);
        if(livingCells == 3) {
          tempCells[col][row] = true;
        } else if(livingCells == 2) {
          tempCells[col][row] = this.cells[col][row];
        } 
      }
    }
    this.cells = tempCells;    
  }
  getLivingNeighbors(col,row) {
    let counter = 0;
    for(let i = -1; i <= 1;i++) {
      for(let j = -1; j <= 1;j++) {
        if(i == 0 && j == 0) {
          continue;
        }
        if(this.cells[col+i][row +j]) 
          counter ++;
      }
    }
    return counter;
  }
}