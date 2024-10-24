const start = document.querySelector('#startGame');
const seconds = document.querySelector('#seconds');
const currentWord = document.querySelector('#currentWord');
const wordInput = document.querySelector('#wordInput');
const message = document.querySelector('#message');
const timeDisplay = document.querySelector('#timeLeft');
const scoreDisplay = document.querySelector('#score');
const difficulty = document.querySelector('#levels');

//Available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2,
};

window.addEventListener('load', setDifficulty);
start.addEventListener('click', init);
difficulty.addEventListener('change', selectValue);

// Globals
let currentLevel = levels.easy;
let time = currentLevel;
let score = 0;
let isPlaying;
let countInterval;

const words = [
  'Hat',
  'River',
  'Lucky',
  'Relief',
  'Sober',
  'Green',
  'Statue',
  'Generate',
  'Display',
  'Stubborn',
  'Runaway',
  'Cocktail',
  'Establish',
  'Javascript',
  'Revolver',
  'Siblings',
  'Developer',
  'Definition',
  'Investigate',
  'Magic',
  'Space',
  'Evolution',
  'Stars',
  'Cosmos',
  'Coding',
  'Fortune',
  'Echo',
  'Print',
  'Joke',
  'Master',
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Honeydew',
  'Kiwi',
  'Lemon',
  'Mango',
  'Nectarine',
  'Orange',
  'Papaya',
  'Quince',
  'Raspberry',
  'Strawberry',
  'Tangerine',
  'Ugli',
  'Vanilla',
  'Watermelon',
  'Xigua',
  'Yellow',
  'Zucchini',
  'Apricot',
  'Blueberry',
  'Cantaloupe',
  'Dragonfruit',
  'Fig',
  'Guava',
];

// Initialize Game
function init() {
  // Enable input field
  wordInput.disabled = false;
  difficulty.disabled = true;
  wordInput.focus();
  timeDisplay.innerHTML = time;
  // console.log("Game has been Initialized");
  start.style.display = 'none';

  // Load Word From Array
  showWord(words);

  // Call Countdown every second
  countInterval = setInterval(countDown, 1000);

  // Start matching on word input
  wordInput.addEventListener('input', startMatch);

  // Check Game Status
  setInterval(checkStatus, 50);

  // Set time and score to default
  scoreDisplay.innerHTML = 0;
  time = currentLevel;

  // Remove Game Over Message
  message.style.display = 'none';
}

//Pick & Show random word
function showWord(words) {
  // Generate Random Index
  const randIndex = Math.floor(Math.random() * words.length);
  // //Output a random word
  currentWord.innerHTML = words[randIndex];
}

// Countdown Timer
function countDown() {
  // Check time is not run out
  if (time > 0) {
    // Decrement time
    time--;
  } else if (time === 0) {
    //Game Over
    isPlaying = false;
    message.classList.remove('success');
    void message.offsetWidth;
    message.style.display = 'block';
    message.innerHTML = 'Game Over!!!';
    message.classList.add('failure');

    // SET THE HIGH SCORE
    increaseScore();
  }
  // Show Time
  timeDisplay.innerHTML = time;
  //console.log(score);
}

// Start Match
function startMatch() {
  if (matchWords()) {
    //console.log("MATCHED!!!");
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  }

  scoreDisplay.innerHTML = score;
}

// Match Current word to the word input
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.classList.remove('success');
    message.classList.remove('failure');
    void message.offsetWidth;
    message.style.display = 'block';
    message.innerHTML = 'Correct';
    message.classList.add('success');

    return true;
  } else {
    //message.innerHTML = '...';
    return false;
  }
}

//Create Function to Increase Score to High Score
let increaseScore = () => {
  //const scores = getScores();
  let checkScore = JSON.parse(localStorage.getItem('Scores'));

  let checkEasyScore = checkScore[0].Easy;
  let checkMedScore = checkScore[0].Medium;
  let checkHardScore = checkScore[0].Hard;

  if (score > checkEasyScore) {
    //Add Score to UI and Local Storage
    updateScore();
  } else if (score > checkMedScore) {
    //Add Score to UI and Local Storage
    updateScore();
  } else if (score > checkHardScore) {
    //Add Score to UI and Local Storage
    updateScore();
  } else {
    return;
  }
  //console.log(checkMedScore);
};

// Create function to add Score to the score UI
let updateScore = () => {
  if (difficulty.value == 'easy') {
    let easyScoreUpd = JSON.parse(localStorage.getItem('Scores'));

    newEasyScore = score;
    easyScoreUpd[0].Easy = score;
    localStorage.setItem('Scores', JSON.stringify(easyScoreUpd));
    easyScore.innerHTML = easyScoreUpd[0].Easy;

    //console.log(easyScoreUpd);
  } else if (difficulty.value == 'medium') {
    let medScoreUpd = JSON.parse(localStorage.getItem('Scores'));

    newMedScore = score;
    medScoreUpd[0].Medium = score;
    localStorage.setItem('Scores', JSON.stringify(medScoreUpd));
    medScore.innerHTML = medScoreUpd[0].Medium;

    //console.log(medScoreUpd);
  } else if (difficulty.value == 'hard') {
    let hardScoreUpd = JSON.parse(localStorage.getItem('Scores'));

    newHardScore = score;
    hardScoreUpd[0].Hard = score;
    localStorage.setItem('Scores', JSON.stringify(hardScoreUpd));
    hardScore.innerHTML = hardScoreUpd[0].Hard;

    //console.log(hardScoreUpd);
  }
};

function checkStatus() {
  if (!isPlaying && time === 0) {
    clearInterval(countInterval);
    time = currentLevel;
    message.classList.remove('success');
    void message.offsetWidth;
    message.style.display = 'block';
    message.innerHTML = 'Game Over!!!';
    message.classList.add('failure');

    score = 0;
    //Disable input field
    wordInput.disabled = true;
    difficulty.disabled = false;
    wordInput.value = '';

    start.style.display = 'block';
  }
}

function setDifficulty() {
  if (difficulty.value == 'easy') {
    currentLevel = levels.easy;
    time = currentLevel;
    // Show number of seconds in UI
    seconds.innerHTML = currentLevel;
  } else if (difficulty.value == 'medium') {
    currentLevel = levels.medium;
    time = currentLevel;
    // Show number of seconds in UI
    seconds.innerHTML = currentLevel;
  } else if (difficulty.value == 'hard') {
    currentLevel = levels.hard;
    time = currentLevel;
    // Show number of seconds in UI
    seconds.innerHTML = currentLevel;
  } else {
    currentLevel = 0;
    time = currentLevel;
  }
}

function selectValue() {
  if (difficulty.value == 'easy') {
    currentLevel = levels.easy;
    time = currentLevel;
    // Show number of seconds in UI
    seconds.innerHTML = currentLevel;
  } else if (difficulty.value == 'medium') {
    currentLevel = levels.medium;
    time = currentLevel;
    // Show number of seconds in UI
    seconds.innerHTML = currentLevel;
  } else if (difficulty.value == 'hard') {
    currentLevel = levels.hard;
    time = currentLevel;
    // Show number of seconds in UI
    seconds.innerHTML = currentLevel;
  } else {
    currentLevel = 0;
    time = currentLevel;
  }
}

// Disable Input and Levels field
wordInput.disabled = true;
difficulty.disabled = false;

// LOCAL STORAGE SCRIPT
let easyScore = document.querySelector('#easyScore');
let medScore = document.querySelector('#medScore');
let hardScore = document.querySelector('#hardScore');

let newEasyScore = 0;
let newMedScore = 0;
let newHardScore = 0;

let getScores = () => {
  let scores;
  if (localStorage.getItem('Scores') === null) {
    scores = [
      {
        Easy: newEasyScore,
        Medium: newMedScore,
        Hard: newHardScore,
      },
    ];

    localStorage.setItem('Scores', JSON.stringify(scores));
  } else {
    scores = JSON.parse(localStorage.getItem('Scores'));
  }

  let genScoreUpd = JSON.parse(localStorage.getItem('Scores'));
  easyScore.innerHTML = genScoreUpd[0].Easy;
  medScore.innerHTML = genScoreUpd[0].Medium;
  hardScore.innerHTML = genScoreUpd[0].Hard;

  return scores;
};
window.addEventListener('load', getScores);

// MODAL SCRIPT
let mainModal = document.querySelector('.mainModal');
//let modal = document.querySelector('.modal');
let highScore = document.querySelector('#highScore');
let closeModal = document.querySelector('.closeModal');

let hideModal = () => {
  mainModal.style.display = 'none';
};
let close = () => {
  mainModal.style.display = 'none';
};
let openModal = () => {
  mainModal.style.display = 'flex';
};

window.addEventListener('load', hideModal);
highScore.addEventListener('click', openModal);
closeModal.addEventListener('click', close);
mainModal.addEventListener('click', close);
