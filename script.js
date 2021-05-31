// Get the timer box to reference many times
const $timerBox = $(".timer");
// Get tail box for reference
const $tail = $(".tail");
// Global timer ID
let timerID;
// READY SET GO timer ID
let readySetGoID;
// Boolean to check if game is already running
let isRunning = false;
// Get START/STOP button
$startGame = $("#startGame");

// Get tail width and heigh to prevent tail from crossing border
const tailWidth = parseInt($tail.width());
const tailHeight = parseInt($tail.height());

// Size of Donkey Div
const MAX_WIDTH = 450 - tailWidth;
const MAX_HEIGHT = 500 - tailHeight;

// Gets tail position, removes last two letters "px", and parses as an int to later modify
// Axis values are a string of either "top" or "left"
function getTailPosition(axis) {
  return parseInt($tail.css(axis).slice(0, -2));
}

// Sets new tail position, returning position value to string and adding "px" to conform to CSS requirements
// Axis values are a string of either "top" or "left"
function setTailPosition(axis, value) {
  stringValue = String(value) + "px";
  $tail.css(axis, stringValue);
}

// Key press listener for up, right, down, left and space bar key presses
// Each if statement prevents tail from going beyond the border of the Donkey Div
const keyPressListener = $(document).keydown(function (e) {
  const xPos = getTailPosition("left");
  const yPos = getTailPosition("top");
  const moveValue = 5;
  if ([32, 37, 38, 39, 40].includes(e.which)) {
    // Prevent default keystroke behaviour
    if (e.stopPropagation) {
      e.stopPropagation();
      e.preventDefault();
    }
  }
  // Up
  if (e.which == 38 && yPos - moveValue >= 0) {
    setTailPosition("top", yPos - moveValue);
    // Right
  } else if (e.which == 39 && xPos + moveValue <= MAX_WIDTH) {
    setTailPosition("left", xPos + moveValue);
    // Down
  } else if (e.which == 40 && yPos + moveValue <= MAX_HEIGHT) {
    setTailPosition("top", yPos + moveValue);
    // Left
  } else if (e.which == 37 && xPos - moveValue >= 0) {
    setTailPosition("left", xPos - moveValue);
    // Space Bar
  } else if (e.which == 32) {
    startStopSwitch();
  }
});

function startGame() {
  const randomX = Math.floor(Math.random() * MAX_WIDTH);
  const randomY = Math.floor(Math.random() * MAX_HEIGHT);
  setTailPosition("left", randomX);
  setTailPosition("top", randomY);

  // READY SET GO timer
  const readyText = ["READY...", "SET...", "GO!"];
  let i = 0;
  const readySetGo = window.setInterval(function () {
    readySetGoID = readySetGo;
    $timerBox.text(readyText[i]);
    i++;
    if (i === readyText.length) {
      clearInterval(readySetGo);

      // Display the tail on the screen
      $tail.css("display", "inherit");

      // Timer until game ends
      let seconds = 10;
      const startTimer = window.setInterval(function () {
        timerID = startTimer;
        console.log(timerID); // set global timerID for later reference
        $timerBox.text(`Seconds Left: ${seconds}`);
        if (seconds == 0) {
          endGame();
        }
        seconds--;
      }, 1000);
    }
  }, 1000);
}

function endGame() {
  // Check tail position and compare to hitbox
  const xPos = getTailPosition("left");
  const yPos = getTailPosition("top");
  console.log("x: " + xPos);
  console.log("y: " + yPos);
  if (xPos >= 220 && xPos <= 300 && yPos >= 235 && yPos <= 315) {
    alert("Congratulations! Great Success!");
  } else {
    alert("Try Again WOMP WOMP");
  }
  resetGame();
}

function resetGame() {
  // Reset timer and other displayed items
  // (timerBox text, Tail, isRunning Boolean and Button text)
  window.clearInterval(timerID);
  window.clearInterval(readySetGoID);
  $timerBox.text("");
  $tail.css("display", "none");
  isRunning = false;
  $startGame.text("START");
}

function startStopSwitch() {
  if (!isRunning) {
    isRunning = true;
    startGame();
    $startGame.text("STOP");
  } else {
    // Stop Game
    endGame();
  }
}

// On START/STOP click, run game start/stop switch
$startGame.on("click", startStopSwitch);