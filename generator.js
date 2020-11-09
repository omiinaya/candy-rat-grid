var cols, rows;
var w = 20;
var grid = [];
var available = [];
var current;
var cursorX = 0;
var cursorY = 0;
var selected;
var sets = [];
var wallsRemoved = 0;

function setup() {
  createCanvas(300, 300);
  cols = floor(width/w);
  rows = floor(height/w);

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
      sets.push([cell.id])
    }
  }
  available = grid;
  current = grid[int(random(0,(rows*cols)))];
}

function reset() {
  grid = [];
  cursorX = 0;
  cursorY = 0;
  sets = [];
  wallsRemoved = 0;
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
      sets.push([cell.id])
    }
  }
  available = grid;
  current = grid[int(random(0,(rows*cols)))];
}

function draw() {
  background("#000000");
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
    stroke('#FFFFFF');
    strokeWeight(4);
    noFill();
    circle(150,150, 200);
    circle(150,150, 100);
    strokeWeight(1);
  }

  if (wallsRemoved < cols*rows - 1) {
    if (!current.isFinished) {
      current.highlight();
      // CHOOSE RANDOM NEIGHBOR
      var neighbor = current.randomNeighbor();
      var mergedSet, removedSet, removedIndex;
      if (neighbor) {
        // FIND THE SETS THAT CURRENT AND NEIGHBOR ARE IN
        for (var i = 0; i < sets.length; i++) {
         if (sets[i].includes(current.id)) {
          mergedSet = sets[i];
         }
         else if (sets[i].includes(neighbor.id)) {
          removedSet = sets[i];
          removedIndex = i;
         }
        }
        // ADD NEIGHBOR TO CURRENT SET (UNION THE CELLS) AND DELETE NEIGHBOR'S SET
        if(removedSet !== undefined) {
          for (var i = 0; i < removedSet.length; i++) {
            mergedSet.push(removedSet[i]);
          }
          sets.splice(removedIndex,1);
          // REMOVE WALLS FROM BETWEEN CURRENT AND NEIGHBOR
          removeWalls(current, neighbor);
        }
      } else if (sets.length > 1) {
        current.isFinished = true;
        available = available.filter(cell => cell.id !== current.id);
      }
    }
    // GET NEW CURRENT (RANDOM)
    current = available[int(random(0,available.length))];
  } else {
    selected = grid.filter(cell => (cell.i === cursorX && cell.j === cursorY))[0];
    selected.highlight();
    grid[grid.length-1].highlight(true);
    if(grid[grid.length-1].id === selected.id) reset();
  }

}
// cell.i == x coord
//cell.j == y coord
function keyPressed() {
  if (key == 'R' || key =='r') {
    cursorX = 0;
    cursorY = 0;
  }
  else if ((key == 'W' || key == 'w') && cursorY > 0) {
    if(!selected.walls[0]) {
      cursorY--;
    }
  } else if ((key == 'A' || key == 'a') && cursorX > 0) {
    if(!selected.walls[3]) {
      cursorX--;
    }
  } else if ((key == 'S' || key == 's') && cursorY < rows-1) {
    if(!selected.walls[2]) {
      cursorY++;
    }
  } else if ((key == 'D' || key == 'd') && cursorX < cols-1) {
    if(!selected.walls[1]) {
      cursorX++;
    }
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1;
  }
  return i + j * cols;
}


function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
  wallsRemoved++;
}
