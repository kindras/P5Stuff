let cells = [];
let grid;

let colSize;
let rowSize;
const rows = 20;
const cols = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);
  stroke(255);
  colSize = floor( width / cols);
  rowSize = floor( height / rows);
  grid = new Grid(cols, rows);
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
  var c = floor(mouseX/colSize);
  var r = floor(mouseY/rowSize);
  if(!grid.getCell(c,r)) {
    grid.setCell(c,r);
  }
  
}

class Grid {
  constructor(cols, rows) {
    this.cols = cols; 
    this.rows = rows;
    this.cells = new Array(cols);
    for (var col = 0; col < cols; col++) {
      this.cells[col] = new Array(rows);      
    }
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

  update() {
    let tempCells = new Array(cols);
    for (var col = 0; col < cols; col++) {
      tempCells[col] = new Array(rows);      
    } 
    for(let col = 0; col < cols; ++col) {
      for(let row = 0; row < rows; ++row) {
        if(this.getCell(col,row)){
          tempCells[col][row] = true;
          this.getNeighbors(col,row).forEach(cell => tempCells[cell.col][cell.row] = 111);
        }
      }
    }
    this.cells = tempCells;    
  }
  getNeighbors(col,row) {
    let neighbors = [];
    if(col > 0) {
      neighbors.push({col: col-1, row:row});
    } 
    if(row > 0) {
      neighbors.push({col: col, row:row-1});
    }
    if(col < this.cols - 1) {
      neighbors.push({col: col+1, row:row});
    }
    if(row < this.rows - 1) {
      neighbors.push({col: col, row:row+1});
    }
    return neighbors;
  }

}