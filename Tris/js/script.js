/*
  Project: Tic Tac Toe
  Author: Infamick (https://github.com/Infamousmick)
  License: http://www.apache.org/licenses/LICENSE-2.0
*/

// --- ELEMENTS ---
const setup = document.getElementById("setup");
const game = document.getElementById("game");
const startBtn = document.getElementById("startBtn");

const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const player1SymbolSelect = document.getElementById("player1Symbol");
const winTargetSelect = document.getElementById("winTarget");

const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const winLine = document.getElementById("win-line");
const statusText = document.getElementById("status");
const restartRoundBtn = document.getElementById("restartRound");
const resetGameBtn = document.getElementById("resetGame");
const turnText = document.getElementById("turnText");

const name1El = document.getElementById("name1");
const name2El = document.getElementById("name2");
const score1El = document.getElementById("score1");
const score2El = document.getElementById("score2");
const targetWinsEl = document.getElementById("targetWins");

// --- GAME STATE ---
let player1 = { name: "", symbol: "", score: 0 };
let player2 = { name: "", symbol: "", score: 0 };
let currentPlayer;
let boardState = Array(9).fill("");
let gameActive = false;
let winTarget = 3;

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// --- START GAME ---
startBtn.addEventListener("click", () => {
  const p1Name = player1Input.value.trim();
  const p2Name = player2Input.value.trim();
  if(!p1Name || !p2Name) { alert("Please fill in both player names!"); return; }

  const p1Symbol = player1SymbolSelect.value;
  const p2Symbol = p1Symbol === "X" ? "O" : "X";
  winTarget = parseInt(winTargetSelect.value);

  player1 = { name: p1Name, symbol: p1Symbol, score: 0 };
  player2 = { name: p2Name, symbol: p2Symbol, score: 0 };
  currentPlayer = player1;

  boardState.fill("");
  gameActive = true;

  // Mostra solo la schermata di gioco
  setup.classList.add("hidden");
  game.classList.remove("hidden");

  // Aggiorna info
  name1El.textContent = player1.name;
  name2El.textContent = player2.name;
  score1El.textContent = player1.score;
  score2El.textContent = player2.score;
  targetWinsEl.textContent = winTarget;

  clearBoard();
  updateTurnText();
});

// --- HANDLE CELL CLICK ---
cells.forEach(cell => {
  cell.addEventListener("click", e => {
    const index = e.target.dataset.index;
    if(!gameActive || boardState[index] !== "") return;

    boardState[index] = currentPlayer.symbol;
    e.target.textContent = currentPlayer.symbol;
    e.target.classList.add(currentPlayer.symbol === "X" ? "x" : "o");

    const combo = checkWin();
    if(combo) { handleWin(combo); return; }
    if(boardState.every(c => c !== "")) { statusText.textContent = "Draw 🤝"; gameActive=false; return; }

    currentPlayer = currentPlayer===player1 ? player2 : player1;
    updateTurnText();
  });
});

// --- TURN TEXT COLOR ---
function updateTurnText() {
  turnText.textContent = `${currentPlayer.name}'s turn (${currentPlayer.symbol})`;
  turnText.style.color = currentPlayer.symbol === "X" ? "#ff4c4c" : "#4caf50";
}

// --- WIN LOGIC ---
function checkWin() {
  for(const combo of winningCombos){
    const [a,b,c] = combo;
    if(boardState[a] && boardState[a]===boardState[b] && boardState[a]===boardState[c]) return combo;
  }
  return null;
}

function handleWin(combo) {
  statusText.textContent = `${currentPlayer.name} won this round! 🎉`;
  currentPlayer.score++;
  updateScore();
  drawWinLine(combo, currentPlayer.symbol);

  if(currentPlayer.score >= winTarget){
    statusText.textContent = `🏆 ${currentPlayer.name} wins the match! 🏆`;
    gameActive=false;
  } else { gameActive=false; }
}

function updateScore(){
  score1El.textContent = player1.score;
  score2El.textContent = player2.score;
}

function clearBoard(){
  cells.forEach(c => { c.textContent=""; c.classList.remove("x","o"); });
  winLine.style.width="0"; winLine.style.opacity="0";
}

// --- RESTART / RESET ---
restartRoundBtn.addEventListener("click", ()=>{
  boardState.fill("");
  clearBoard();
  gameActive=true;
  currentPlayer = player1;
  updateTurnText();
});

resetGameBtn.addEventListener("click", ()=>{
  game.classList.add("hidden");
  setup.classList.remove("hidden");
  player1Input.value="";
  player2Input.value="";
  clearBoard();
});

// --- DRAW WIN LINE ---
function drawWinLine(combo, symbol){
  const positions = {
    0:{x:0,y:0},1:{x:1,y:0},2:{x:2,y:0},
    3:{x:0,y:1},4:{x:1,y:1},5:{x:2,y:1},
    6:{x:0,y:2},7:{x:1,y:2},8:{x:2,y:2}
  };
  const start = positions[combo[0]];
  const end = positions[combo[2]];
  const cellSize = 120;
  const startX = start.x*cellSize + 55;
  const startY = start.y*cellSize + 55;
  const endX = end.x*cellSize + 55;
  const endY = end.y*cellSize + 55;
  const dx = endX-startX, dy = endY-startY;
  const length = Math.sqrt(dx*dx+dy*dy);
  const angle = Math.atan2(dy,dx)*180/Math.PI;

  winLine.style.top = `${startY}px`;
  winLine.style.left = `${startX}px`;
  winLine.style.background = symbol==="X"?"#ff4c4c":"#4caf50";
  winLine.style.boxShadow = symbol==="X"?"0 0 15px rgba(255,76,76,0.7)":"0 0 15px rgba(76,175,80,0.7)";
  winLine.style.transform = `rotate(${angle}deg)`;
  winLine.style.opacity="1";

  requestAnimationFrame(()=>winLine.style.width=`${length}px`);
}

// --- CHANGE SELECT COLOR ---
function updateSelectColor() {
  const symbol = player1SymbolSelect.value;
  player1SymbolSelect.style.color = symbol === "X" ? "#ff4c4c" : "#4caf50";
}
updateSelectColor();
player1SymbolSelect.addEventListener("change", updateSelectColor);
