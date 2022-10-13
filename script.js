
const gameContainer = document.getElementById("game");
const gameStartBtn = document.querySelector('button');
const restartGameBtn = document.querySelector('#Restart');
const scoreDisplay = document.getElementById('score');

restartGameBtn.style.display = 'none';
scoreDisplay.style.fontSize = '30px';

gameStartBtn.addEventListener('click',startPause)
restartGameBtn.addEventListener('click', restartGame);

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;
    
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  
  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let firstCard = null;
let secondCard = null;
let firstClick = false;
let isMatch = false;
let startGame = false;
let score = 0;

scoreDisplay.textContent = score;

// TODO: Implement this function!
  function handleCardClick(event) {
    // you can use event.target to see which element was clicked
    if(startGame) {
      isMatch = false;
      let target = event.target;
      
      if(!firstCard && !secondCard) {
        target.style.backgroundColor = target.className;
        firstCard = target;
        firstClick = true;
        
        setTimeout(() => {
          if(isMatch) {
            return;
          }

          firstClick = false;
          firstCard.style.backgroundColor = '';
          firstCard = null;

          if(secondCard) {
            secondCard.style.backgroundColor = '';
            secondCard = null;
          }
          }, 1000);
        } else if(firstClick){
        firstClick = false;
        secondCard = event.target;
        secondCard.style.backgroundColor = target.className;

        let card1stBg = firstCard.style.backgroundColor;
        let card2ndBg = secondCard.style.backgroundColor;
        
        if(card1stBg === card2ndBg && firstCard !== secondCard) {
          updateScore();
          isMatch = true;
          removeCardEvent(firstCard, secondCard);
          if(score === 5) {
            restartGameBtn.style.display = 'inline-block';
            setTimeout(alert, 100,'WON');
            }
        }
      }

    }
  }

// helper functions
function resetCurrentCardFlip() {
  firstCard = null;
  secondCard = null;
  firstClick = false;
}

function startPause() {
  startGame = !startGame;
  if(startGame) {
    gameStartBtn.textContent = 'Pause';
  } else {
    gameStartBtn.textContent = 'Start Game'
  }
}

function restartGame() {
  let cards = gameContainer.children;
  firstCard = null;
  secondCard = null;
  firstClick = false;
  isMatch = false;
  score = 0;
  scoreDisplay.textContent = score;
  for( let i = 0; i < cards.length; i++ ) {
    cards[i].style.backgroundColor = '';
    cards[i].addEventListener('click', handleCardClick)
  }
}

function removeCardEvent(card1, card2) {
  card1.removeEventListener('click', handleCardClick);
  card2.removeEventListener('click', handleCardClick);
  firstCard = null;
  secondCard = null;
  firstClick = false;
}

function updateScore() {
  score++;
  scoreDisplay.textContent = score;
}
// when the DOM loads
createDivsForColors(shuffledColors);
