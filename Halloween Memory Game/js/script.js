/*
  Project: Halloween Memory Game
  Author: Gianluca Grasso (https://github.com/gian-grasso)
  License: http://www.apache.org/licenses/LICENSE-2.0
*/

const allEmojis = [
  "\u{1F383}",
  "\u{1F47B}",
  "\u{1F987}",
  "\u{1F577}",
  "\u{1F578}",
  "\u{1F9D9}\u{200D}\u{2640}\u{FE0F}",
  "\u{1F9DB}",
  "\u{1F989}",
  "\u{1F480}",
  "\u{1F36C}",
  "\u{1FA78}",
  "\u{1FAA6}"
];
let currentLevel = 1;
let maxLevel = 4;

let cards = [];
let flippedCards = [];
let matchedCount = 0;
let moves = 0;
let timer = 0;
let timerInterval;

const board = document.getElementById("gameBoard");
const movesCounter = document.getElementById("moves");
const restartBtn = document.getElementById("restart");
const timerDisplay = document.getElementById("timer");
const levelDisplay = document.getElementById("level");

const soundMatch = document.getElementById("sound-match");
const soundWrong = document.getElementById("sound-wrong");
const soundWin = document.getElementById("sound-win");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startTimer() {
    timer = 0;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = timer;
    }, 1000);
}

function initGame() {
    board.innerHTML = "";
    matchedCount = 0;
    moves = 0;
    movesCounter.textContent = moves;
    flippedCards = [];
    levelDisplay.textContent = currentLevel;
    startTimer();

    let numPairs = 4 + currentLevel - 1;
    let selectedEmojis = allEmojis.slice(0, numPairs);
    cards = shuffle([...selectedEmojis, ...selectedEmojis]);

    cards.forEach(emoji => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.textContent   = "";
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
        card.textContent = card.dataset.emoji; //Shows emojis only on click
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
        soundMatch.play();

        if (matchedCount === cards.length) {
            soundWin.play();
            clearInterval(timerInterval);
            setTimeout(() => {
                if (currentLevel < maxLevel) {
                    alert(`Level ${currentLevel} completed! 🎉 Moving to next level.`);
                    currentLevel++;
                    initGame();
                } else {
                    alert(`🏆 You won all levels in ${moves} moves and ${timer} seconds!`);
                    currentLevel = 1;
                    initGame();
                }
            }, 500);
        }
    } else {
        soundWrong.play();
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.textContent = ""; //Hide emojis
            card2.textContent = "";
            flippedCards      = [];
        }, 1000);
    }
}

restartBtn.addEventListener("click", () => {
    currentLevel = 1;
    initGame();
});

initGame();