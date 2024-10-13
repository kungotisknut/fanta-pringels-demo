const words = [
    "javascript är ett programerings språk", "jag är en developer", "hej jag heter otis",
    "vad heter du?", "jag gillar at spela", "du är dum", "bs luktar äckligt", "fortsät skriva",
    "jag heter kidnapad otis", "save me"
];

const wordDisplay = document.getElementById("word-display");
const inputField = document.getElementById("input-field");
const startButton = document.getElementById("start-button");
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");

let currentWord = '';
let score = 0;
let time = 60;
let timerInterval;

// High Score Setup
const highScoreDisplay = document.createElement('span');
highScoreDisplay.textContent = 'High Score: 0';
document.querySelector('.stats').appendChild(highScoreDisplay);

// Load high score from localStorage
let highScore = localStorage.getItem('highScore') || 0;
highScoreDisplay.textContent = `High Score: ${highScore}`;

// Function to pick a random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Function to display a new word
function displayNewWord() {
  currentWord = getRandomWord();
  wordDisplay.textContent = currentWord;
}

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(() => {
    time--;
    timeDisplay.textContent = time;
    if (time === 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

// Function to start the game
function startGame() {
  score = 0;
  time = 60;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = time;
  displayNewWord();
  inputField.value = '';
  inputField.disabled = false;
  inputField.focus();
  startButton.disabled = true;
  startTimer();
}

// Function to end the game
function endGame() {
  wordDisplay.textContent = `Game Over! Your score: ${score}`;
  inputField.disabled = true;
  startButton.disabled = false;
  
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
    highScoreDisplay.textContent = `High Score: ${highScore}`;
  }
}

// Event listener for input field
inputField.addEventListener('input', () => {
  const typedWord = inputField.value.trim();
  if (typedWord === currentWord) {
    score++;
    scoreDisplay.textContent = score;
    displayNewWord();
    inputField.value = '';
  }
});

// Event listener for start button
startButton.addEventListener('click', startGame);
