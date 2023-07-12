const grid_size = 9;

// A utility function to print the grid
function printGrid(grid) {
  for (let row = 0; row < grid_size; row++) {
    let rowStr = "";
    for (let col = 0; col < grid_size; col++) {
      rowStr += grid[row][col] + " ";
    }
    console.log(rowStr);
  }
}

// Checks whether it will be legal to assign num to the given row, col
function isSafe(grid, row, col, num) {
  // Check if we find the same num in the same row, return false
  for (let checkCol = 0; checkCol < grid_size; checkCol++) {
    if (grid[row][checkCol] === num) {
      return false;
    }
  }

  // Check if we find the same num in the same column, return false
  for (let checkRow = 0; checkRow < grid_size; checkRow++) {
    if (grid[checkRow][col] === num) {
      return false;
    }
  }

  // Check if we find the same num in the particular 3x3 matrix, return false
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let checkRow = 0; checkRow < 3; checkRow++) {
    for (let checkCol = 0; checkCol < 3; checkCol++) {
      if (grid[checkRow + startRow][checkCol + startCol] === num) {
        return false;
      }
    }
  }

  return true;
}

// Takes a partially filled-in grid and attempts to assign values to all unassigned locations
function solveSudoku(grid, row, col) {
  // Check if we have reached the last row and column, return true to avoid further backtracking
  if (row === grid_size - 1 && col === grid_size) {
    return true;
  }

  // Check if column value becomes grid_size, move to the next row and column start from 0
  if (col === grid_size) {
    row++;
    col = 0;
  }

  // Check if the current position of the grid already contains a value > 0, iterate for the next column
  if (grid[row][col] > 0) {
    return solveSudoku(grid, row, col + 1);
  }

  for (let num = 1; num <= grid_size; num++) {
    // Check if it is safe to place the num (1-9) in the given row, col
    if (isSafe(grid, row, col, num)) {
      // Assign the num in the current (row, col) position of the grid and assume it is correct
      grid[row][col] = num;

      // Check for the next possibility with the next column
      if (solveSudoku(grid, row, col + 1)) {
        return true;
      }

      // If the assumption was wrong, remove the assigned num and go for the next assumption with a different num value
      grid[row][col] = 0;
    }
  }

  return false;
}

// Driver Code
// 0 means unassigned cells
const grid = [
  [3, 0, 6, 5, 0, 8, 4, 0, 0],
  [5, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 8, 7, 0, 0, 0, 0, 3, 1],
  [0, 0, 3, 0, 1, 0, 0, 8, 0],
  [9, 0, 0, 8, 6, 3, 0, 0, 5],
  [0, 5, 0, 0, 9, 0, 6, 0, 0],
  [1, 3, 0, 0, 0, 0, 2, 5, 0],
  [0, 0, 0, 0, 0, 0, 0, 7, 4],
  [0, 0, 5, 2, 0, 6, 3, 0, 0]
];

if (solveSudoku(grid, 0, 0)) {
  printGrid(grid);
} else {
  console.log("No solution exists.");
}
