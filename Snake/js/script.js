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

canvas.style.width  = canvas.width + "px";
canvas.style.height = canvas.height + "px";

function generateFood() {
  const cols = Math.floor(canvas.width / box);
  const rows = Math.floor(canvas.height / box);
  return {
    x: Math.floor(Math.random() * cols) * box,
    y: Math.floor(Math.random() * rows) * box
  };
}

function resetGame() {
  snake = [
    { x: 9 * box, y: 9 * box },
    { x: 8 * box, y: 9 * box }
  ];
  direction = null;
  food = generateFood();
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  drawStatic();
}

function drawStatic() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#4caf50" : "#388e3c";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "#1e1e1e";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "#e91e63";
  ctx.fillRect(food.x + 2, food.y + 2, box - 4, box - 4);
}

document.addEventListener("keydown", e => {
  if (!direction) return;
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    const greenShade = 180 - i * 10;
    ctx.fillStyle = i === 0 ? "#4caf50" : `rgb(0,${greenShade},0)`;
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "#1e1e1e";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "#e91e63";
  ctx.fillRect(food.x + 2, food.y + 2, box - 4, box - 4);

  if (!direction) return;

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  if (snakeX < 0) snakeX = canvas.width - box;
  if (snakeY < 0) snakeY = canvas.height - box;
  if (snakeX >= canvas.width) snakeX = 0;
  if (snakeY >= canvas.height) snakeY = 0;

  const newHead = { x: snakeX, y: snakeY };
  const willEat = (snakeX === food.x && snakeY === food.y);

  snake.unshift(newHead);

  if (willEat) {
    score++;
    scoreDisplay.textContent = "Score: " + score;
    food = generateFood();
  } else {
    snake.pop();
  }

  //Collision check
  const lenToCheck = willEat ? snake.length : snake.length - 1;
  for (let i = 1; i < lenToCheck; i++) {
    if (snake[i].x === newHead.x && snake[i].y === newHead.y) {
      endGame();
      return;
    }
  }
}

function endGame() {
  clearInterval(game);
  direction            = null;
  startBtn.textContent = "Restart";
  speedSelect.disabled = false;
  alert("Game Over! Score: " + score);
}

startBtn.addEventListener("click", () => {
  resetGame();
  direction = "RIGHT";
  speedSelect.disabled = true;

  if (game) clearInterval(game);
  game = setInterval(draw, parseInt(speedSelect.value));

  startBtn.textContent = "Start";
});

resetGame();