/*
  Project: Memory Game
  Author: Gianluca Grasso (https://github.com/gian-grasso)
  License: http://www.apache.org/licenses/LICENSE-2.0
*/

const emojis     = ["\u{1F34E}","\u{1F34C}","\u{1F352}","\u{1F347}","\u{1F349}","\u{1F34B}","\u{1F34F}","\u{1F353}"];
let cards        = [...emojis, ...emojis]; //Double for couples
let flippedCards = [];
let matchedCount = 0;
let moves        = 0;

const board = document.getElementById("gameBoard");
const movesCounter = document.getElementById("moves");
const restartBtn = document.getElementById("restart");

//Shuffle (using Fisher-Yates algorithm)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//Init game
function initGame() {
  board.innerHTML = "";
  matchedCount = 0;
  moves = 0;
  movesCounter.textContent = moves;
  flippedCards = [];

  shuffle(cards).forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.textContent = emoji;

    card.addEventListener("click", () => flipCard(card));

    board.appendChild(card);
  });
}

function flipCard(card) {
  if (
    flippedCards.length < 2 &&
    !card.classList.contains("flipped") &&
    !card.classList.contains("matched")
  ) {
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      moves++;
      movesCounter.textContent = moves;
      checkMatch();
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.emoji === card2.dataset.emoji) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCount += 2;
    flippedCards = [];

    if (matchedCount === cards.length) {
      setTimeout(() => {
        alert(`You won in ${moves} moves! 🎉`);
      }, 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}

restartBtn.addEventListener("click", initGame);

//Start
initGame();