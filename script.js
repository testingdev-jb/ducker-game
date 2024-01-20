//Select the relevant elements from the HTML

const grid = document.querySelector('.grid');
const timer = document.querySelector('.timer');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainBtn = document.querySelector('.play-again');
const gridMatrix = [
  ['', '', '', '', '', '', '', '', ''],
  [
    'river',
    'wood',
    'wood',
    'river',
    'wood',
    'river',
    'river',
    'river',
    'river',
  ],
  ['river', 'river', 'river', 'wood', 'wood', 'river', 'wood', 'wood', 'river'],
  ['', '', '', '', '', '', '', '', ''],
  ['road', 'bus', 'road', 'road', 'road', 'car', 'road', 'road', 'road'],
  ['road', 'road', 'road', 'car', 'road', 'road', 'road', 'road', 'bus'],
  ['road', 'road', 'car', 'road', 'road', 'road', 'bus', 'road', 'road'],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
];

const victoryRow = 0; // prevents magicNumbers - a number taken from nowhere
const riverRows = [1, 2];
const roadRows = [4, 5, 6];
const duckPosition = { x: 4, y: 8 };
let contentBeforeDuck = ''; //when duck leaves this position we move the items back into where the duck was stood so theyy aren't missing
let time = 15;
function drawGrid() {
  grid.innerHTML = '';

  // For each row in grid matrix, we need to process what will be drawn or displayed on the screen

  gridMatrix.forEach(function (gridRow, gridRowIndex) {
    gridRow.forEach(function (cellContent, cellContentIndex) {
      const cellDiv = document.createElement('div');
      //<div class="cell"></div>
      cellDiv.classList.add('cell');

      // [1, 2] includs the value of the index for first loop execute statement
      if (riverRows.includes(gridRowIndex)) {
        cellDiv.classList.add('river');
      } else if (roadRows.includes(gridRowIndex)) {
        cellDiv.classList.add('road');
      }

      // ' ' --> 'falsy' do not enter this if statement
      // 'river', 'road', 'car', 'bus' 'wood' --> "truthy"
      if (cellContent) {
        cellDiv.classList.add(cellContent);
      }

      grid.appendChild(cellDiv);
    });
  });
}

function placeDuck() {
  contentBeforeDuck = gridMatrix[duckPosition.y][duckPosition.x];
  gridMatrix[duckPosition.y][duckPosition.x] = 'duck';
  // gridMatrix[8][4] = 'duck'
  //['', '', '', '<duck placed here>', '', '', '', '', ''],
}

function moveDuck(event) {
  const key = event.key;
  console.log('key', key);
  console.log(contentBeforeDuck);
  gridMatrix[duckPosition.y][duckPosition.x] = contentBeforeDuck;

  switch (key) {
    case 'ArrowUp':
      if (duckPosition.y > 0) duckPosition.y--;
      break;
    case 'ArrowDown':
      if (duckPosition.y < 8) duckPosition.y++;
      break;
    case 'ArrowLeft':
      if (duckPosition.x > 0) duckPosition.x--;
      break;
    case 'ArrowRight':
      if (duckPosition.x < 8) duckPosition.x++;
      break;
  }

  render();
}
function updateDuckPosition() {
  gridMatrix[duckPosition.y][duckPosition.x] = contentBeforeDuck;

  if(contentBeforeDuck === 'wood'){
    if(duckPosition.y === 1 && duckPosition.x < 0 ) 
    duckPosition.x++
    else if (duckPosition.y === 2 && duckPosition.x > 0) 
    duckPosition.x--
  }
}


function checkPosition() {
  // duck makes it to the end == win
  if (duckPosition.y === victoryRow) endGame('duck-arrived');
  else if (contentBeforeDuck === 'river') endGame('duck-drowned');
  else if (contentBeforeDuck === 'car' || contentBeforeDuck == 'bus')
  endGame('duck-hit')
}

// ------------------------
// Game Win/Loss Logic
// ------------------------

function endGame(reason) {
  // victory
  if (reason === 'duck-arrived') {
    endGameText.innerHTML = 'YOU<br>WON!';
    endGameScreen.classList.add('win');
  }

  gridMatrix[duckPosition.x][duckPosition.y] = reason

  // stop timer
  clearInterval(countdownLoop);
  // stop game loop
  clearInterval(renderLoop);
  // stop player from being able to move
  document.removeEventListener('key', moveDuck);
  // display game over screen
  endGameScreen.classList.remove('hidden');
}

function countdown() {
  if (time != 0) {
    time--;
    timer.innerText = time.toString().padStart(5, '0');
  }

  if (time == 0) {
    //end the game as player has lost
    endGame();
  }
}

// Rendering

function render() {
  placeDuck();
  checkPosition();
  drawGrid();
}

const renderLoop = setInterval(function () {
  updateDuckPosition();
  animateGame();
  render();
}, 600);

const countdownLoop = setInterval(countdown, 1000);

document.addEventListener('keyup', moveDuck);
playAgainBtn.addEventListener('click', function () {
  location.reload();
});
