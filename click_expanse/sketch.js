let cells = [];
let grid;

const rectSize = 20;
let rows;
let cols;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);
  fill(255);

  rows = floor( height / rectSize);
  cols = floor( width  / rectSize);
  grid = new Grid(cols, rows);
  for(let col = 0; col < cols; ++col) {
    for(let row = 0; row < rows; ++row) {
      if(grid.getCell(col,row)){
        rect(col * rectSize, row * rectSize, rectSize, rectSize);
      }
    }
  }
  frameRate(10);
}

function draw() {
  background(51);
  fill(255);
  grid.update();
  for(let col = 0; col < cols; ++col) {
    for(let row = 0; row < rows; ++row) {
      if(grid.getCell(col,row)){
        rect(col * rectSize, row * rectSize, rectSize, rectSize);
      }
    }
  }
}

function mousePressed() {
  if (mouseX > width || mouseY > height) return;
  let c = floor(mouseX/rectSize);
  let r = floor(mouseY/rectSize);
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
    const structures = [
      [[undefined,undefined,undefined],[true,true,true],[undefined,undefined,undefined]],
      [[undefined,true,undefined],[undefined,undefined,true],[true,true,true]]
    ];
    for(let i = 0; i < 180; ++i) {
      let middleW = floor(random(1,this.cols - 1));
      let middleH = floor(random(1,this.rows - 1));
      let structure = random(structures);
      console.log(structure)
      for(let c = 0; c < 3; c++) {
        for (let r = 0; r < 3;r++) {
          this.cells[middleW - 1 + c][middleH - 1 + r] = structure[c][r];
        }
      }
    }
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