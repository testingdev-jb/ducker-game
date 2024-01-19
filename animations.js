// ----------------- 
// ANIMATIONS
// -----------------
function moveRight(gridRowIndex) {
  // get all of cells in current row
  const currentRow = gridMatrix[gridRowIndex];
  // remove the last element
  const lastElement = currentRow.pop();
  // put it back to the beginning index 0
  currentRow.unshift(lastElement);
}

function moveLeft(gridRowIndex) {
  const currentRow = gridMatrix[gridRowIndex];
  const firstElement = currentRow.shift();
  currentRow.push(firstElement);
}

function animateGame() {
  // Animate River

  moveRight(1);
  moveLeft(2);

  // Animate Road
  moveRight(4);
  moveRight(5);
  moveRight(6);
}