//
//                                                //walls in grid object are defined as [0]top, [1]right, [2]bottom, [3]left.
//GENERAL NOTES                                   //isFinished means there are no walls to be removed.
//                                                //neighbor and current are individual cells. currently picked at random.
//
var cols, rows;
var w = 20;                                       //width of each cell
var grid = [];
var available = [];
var current;
var cursorX = 0;                                  //starting x coordinate of player
var cursorY = 0;                                  //starting y coordinate of player
var selected;
var sets = [];
var wallsRemoved = 0;                             //keeps count to remove a total of 255 walls

function setup() {
  createCanvas(300, 300);                         //canvas width and hegiht
  cols = floor(width / w);                        //columns = 300/20 = 15
  rows = floor(height / w);                       //rows = 300/20 = 15

  for (var j = 0; j < rows; j++) {                //for loop runs 15 times to create 15 rows
    for (var i = 0; i < cols; i++) {              //for loop runs 15 times to create 15 cols
      var cell = new Cell(i, j);                  //class that defines the cell
      grid.push(cell);                            //pushing cell to grid
      sets.push([cell.id])                        ////unsure what sets is for.
    }
  }
  available = grid;                               //saving as available
  current = grid[0];
}

var layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  7, 11, 2, 12, 0, 0, 12, 0, 12, 0, 0, 12, 11, 2, 9, 
  7, 6, 11, 8, 0, 0, 0, 0, 0, 0, 0, 8, 2, 13, 9, 
  7, 14, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 14, 9, 
  7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 
  7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 
  7, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 9, 
  7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 
  7, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 9, 
  7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 
  7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 
  7, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 14, 9, 
  7, 11, 2, 12, 0, 0, 0, 0, 0, 0, 0, 12, 11, 2, 9, 
  7, 6, 13, 12, 0, 0, 12, 0, 12, 0, 0, 12, 6, 13, 9, 
  10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 
]

function draw() {
  background("#000000");                          //sets background black
  for (var i = 0; i < grid.length; i++) {         //for every element in the grid
    grid[i].show();                               //draw grid
    //top, right, bottom, left
    if (layout[i] == 1) {
    grid[i].walls = [true, false, false, false] 
    } 
    else if (layout[i] == 2) {
      grid[i].walls = [true, true, false, false]
    }
    else if (layout[i] == 3) {
      grid[i].walls = [true, true, true, false]
    }
    else if (layout[i] == 4) {
      grid[i].walls = [true, true, true, true]
    }
    else if (layout[i] == 5) {
      grid[i].walls = [false, true, true, true]
    }
    else if (layout[i] == 6) {
      grid[i].walls = [false, false, true, true]
    }
    else if (layout[i] == 7) {
      grid[i].walls = [false, false, false, true]
    }
    else if (layout[i] == 8) {
      grid[i].walls = [false, false, false, false]
    }
    else if (layout[i] == 9) {
      grid[i].walls = [false, true, false, false]
    }
    else if (layout[i] == 10) {
      grid[i].walls = [false, false, true, false]
    }
    else if (layout[i] == 11) {
      grid[i].walls = [true, false, false, true]
    }
    else if (layout[i] == 12) {
      grid[i].walls = [false, true, false, true]
    }
    else if (layout[i] == 13) {
      grid[i].walls = [false, true, true, false]
    }
    else if (layout[i] == 14) {
      grid[i].walls = [true, false, true, false]
    }
}



  if (wallsRemoved < cols * rows - 1) {           //checks if any walls have been removed at all
    //defines selected to allow player movement
    selected = grid.filter(cell => (cell.i === cursorX && cell.j === cursorY))[0];
    selected.highlight();                                                                  //mark player blue
    grid[grid.length - 1].highlight(true);                                                 //mark last cell red
    if (grid[grid.length - 1].id === selected.id) reset();

    if (!current.isFinished) {                    //if there are no walls to be removed
      

      //selected.walls = [false, false, false, false]
    }
  }
}
// CHOOSE RANDOM NEIGHBOR
/*
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
  if (removedSet !== undefined) {
    for (var i = 0; i < removedSet.length; i++) {
      mergedSet.push(removedSet[i]);
    }
    sets.splice(removedIndex, 1);
    // REMOVE WALLS FROM BETWEEN CURRENT AND NEIGHBOR
    removeWalls(current, neighbor);
  }
} else if (sets.length > 1) {
  current.isFinished = true;
  available = available.filter(cell => cell.id !== current.id);
}
}
// need to adjust to iterate not randomize.
current = available[int(random(0, available.length))];
} else {
selected = grid.filter(cell => (cell.i === cursorX && cell.j === cursorY))[0];
selected.highlight();                                                                  //mark player blue
grid[grid.length - 1].highlight(true);                                                 //mark last cell red
if (grid[grid.length - 1].id === selected.id) reset();                                 //if you reach the end, reset.
}

}
*/

// cell.i == x coord
//cell.j == y coord
function keyPressed() {
  if (key == 'R' || key == 'r') {
    //cursorX = 0;
    //cursorY = 0;
    console.log(cells)
  }
  else if ((key == 'W' || key == 'w') && cursorY > 0) {
    if (!selected.walls[0]) {
      console.log(selected)
      cursorY--;
      //console.log(grid)
    }
  } else if ((key == 'A' || key == 'a') && cursorX > 0) {
    if (!selected.walls[3]) {
      console.log(selected)
      cursorX--;
      //console.log(grid)
    }
  } else if ((key == 'S' || key == 's') && cursorY < rows - 1) {
    if (!selected.walls[2]) {
      console.log(selected)
      cursorY++;
      //console.log(grid)
    }
  } else if ((key == 'D' || key == 'd') && cursorX < cols - 1) {
    if (!selected.walls[1]) {
      console.log(selected)
      cursorX++;
      //console.log(grid)
    }
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}


function removeWalls(current, neighbor) {
  var x = current.i - neighbor.i;
  if (x === 1) {
    current.walls[3] = false;
    neighbor.walls[1] = false;
  } else if (x === -1) {
    current.walls[1] = false;
    neighbor.walls[3] = false;
  }
  var y = current.j - neighbor.j;
  if (y === 1) {
    current.walls[0] = false;
    neighbor.walls[2] = false;
  } else if (y === -1) {
    current.walls[2] = false;
    neighbor.walls[0] = false;
  }
  wallsRemoved++;
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
  current = grid[int(random(0, (rows * cols)))];
}