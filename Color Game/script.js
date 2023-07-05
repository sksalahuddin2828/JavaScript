const COLORS = ["Red", "Orange", "White", "Black", "Green", "Blue", "Brown", "Purple", "Cyan", "Yellow", "Pink", "Magenta"];

let score = 0;
let displayedWordColor = "";
let gameRunning = false;

function printScore() {
  document.getElementById("game-score").textContent = "Your Score: " + score;
}

function printTimeLeft(secondsLeft) {
  document.getElementById("time-left").textContent = "Game Ends in: " + secondsLeft + "s";
}

function printGameDescription() {
  document.getElementById("game-description").textContent = "Game Description: Enter the color of the words displayed below. And keep in mind not to enter the word text itself";
}

function startGame() {
  if (!gameRunning) {
    gameRunning = true;
    score = 0;
    displayedWordColor = "";
    document.getElementById("color-entry").value = "";
    document.getElementById("color-entry").focus();
    printGameDescription();
    printScore();
    printTimeLeft(60);
    nextWord();
    startTimer();
  }
}

function stopGame() {
  gameRunning = false;
  clearInterval(timerInterval);
  document.getElementById("displayed-words").textContent = "";
}

function nextWord() {
  if (gameRunning) {
    const displayedWordText = COLORS[Math.floor(Math.random() * COLORS.length)];
    displayedWordColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    document.getElementById("displayed-words").textContent = displayedWordText;
    document.getElementById("displayed-words").style.color = displayedWordColor;
  }
}

function checkWord() {
  if (gameRunning) {
    const inputColor = document.getElementById("color-entry").value.trim().toLowerCase();
    if (inputColor === displayedWordColor.toLowerCase()) {
      score++;
      printScore();
    }
    document.getElementById("color-entry").value = "";
    nextWord();
  }
}

function startTimer() {
  let secondsLeft = 60;
  printTimeLeft(secondsLeft);
  timerInterval = setInterval(() => {
    secondsLeft--;
    if (secondsLeft >= 0) {
      printTimeLeft(secondsLeft);
    } else {
      stopGame();
    }
  }, 1000);
}

document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("reset-button").addEventListener("click", stopGame);
document.getElementById("color-entry").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkWord();
  }
});
