/*
  Project: Snake Game
  Author: Infamick (https://github.com/Infamousmick)
  License: http://www.apache.org/licenses/LICENSE-2.0
*/

const canvas       = document.getElementById("game");
const ctx          = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const speedSelect  = document.getElementById("speed");
const startBtn     = document.getElementById("startBtn");

const box = 20;
let snake;
let direction;
let food;
let score;
let game = null;

// Forza dimensione visibile
canvas.style.width  = canvas.width + "px";
canvas.style.height = canvas.height + "px";

// genera cibo casuale
function generateFood() {
  const cols = Math.floor(canvas.width / box);
  const rows = Math.floor(canvas.height / box);
  return {
    x: Math.floor(Math.random() * cols) * box,
    y: Math.floor(Math.random() * rows) * box
  };
}

// reset gioco
function resetGame() {
  snake = [{ x: 9 * box, y: 9 * box }];
  direction = null;
  food = generateFood();
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  drawStatic();
}

// disegna stato fermo
function drawStatic() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#4caf50" : "#388e3c";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "#1e1e1e";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // cibo
  ctx.fillStyle = "#e91e63";
  ctx.fillRect(food.x + 2, food.y + 2, box - 4, box - 4);
}

// input
document.addEventListener("keydown", e => {
  if (!direction) return;
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

// loop principale
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // disegna snake
  for (let i = 0; i < snake.length; i++) {
    const greenShade = 180 - i * 10;
    ctx.fillStyle = i === 0 ? "#4caf50" : `rgb(0,${greenShade},0)`;
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "#1e1e1e";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // disegna cibo
  ctx.fillStyle = "#e91e63";
  ctx.fillRect(food.x + 2, food.y + 2, box - 4, box - 4);

  if (!direction) return;

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // --- LOOP BORDI ---
  if (snakeX < 0) snakeX = canvas.width - box;
  if (snakeY < 0) snakeY = canvas.height - box;
  if (snakeX >= canvas.width) snakeX = 0;
  if (snakeY >= canvas.height) snakeY = 0;

  const newHead = { x: snakeX, y: snakeY };

  // controlla se mangerà
  const willEat = (snakeX === food.x && snakeY === food.y);

  // collisione con se stesso (escludendo la coda se non mangia)
  const lenToCheck = snake.length - (willEat ? 0 : 1);
  for (let i = 0; i < lenToCheck; i++) {
    if (snake[i].x === newHead.x && snake[i].y === newHead.y) {
      endGame();
      return;
    }
  }

  // nuova testa
  snake.unshift(newHead);

  if (willEat) {
    score++;
    scoreDisplay.textContent = "Score: " + score;
    food = generateFood();
  } else {
    snake.pop();
  }
}

// fine partita
function endGame() {
  clearInterval(game);
  direction = null;
  startBtn.textContent = "Ricomincia";
  speedSelect.disabled = false;
  alert("Game Over! Punteggio: " + score);
}

// start/ricomincia
startBtn.addEventListener("click", () => {
  resetGame();
  direction = "RIGHT";
  speedSelect.disabled = true;

  if (game) clearInterval(game);
  game = setInterval(draw, parseInt(speedSelect.value));

  startBtn.textContent = "Inizia";
});

// avvio
resetGame();