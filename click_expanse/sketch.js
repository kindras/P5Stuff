var cells = [];

var colSize;
var rowSize;
const rows = 20;
const cols = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);
  stroke(255);

  colSize = floor(width / cols);
  rowSize = floor(height / rows);
  
  for (var index = 0; index < cols; index++) {
    line(index * colSize, 0, index * colSize, rows*rowSize);    
    line((index + 1) * colSize, 0, (index + 1) * colSize, rows*rowSize);    
  }

  for (var index = 0; index < rows; index++) {
    line(0, index * rowSize,  cols*colSize, index * rowSize);    
    line(0,(index + 1) * rowSize, cols*colSize, (index + 1) * rowSize);    
  }
}

function draw() {
  // background(51);
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
    if(cells[i * colSize + j]) {
      rect(j*colSize, i*rowSize, colSize, rowSize );
    }
  }
}
}

function mousePressed() {
  if (mouseX > width || mouseY > height) return;
  // find cell
  var c = floor(mouseX/colSize);
  var r = floor(mouseY/rowSize);
  if(! cells[r* colSize + c]) {
    cells[r* colSize + c] = true;
  }
  
}