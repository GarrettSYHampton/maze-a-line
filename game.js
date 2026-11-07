const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const TILE = 40; // 600 / 15

// 15x15 maze: 1 = wall, 0 = path. Outer border is all walls.
// Clear path exists from top-left (1, 1) to the center (7, 7).
const GRID = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Player: small blue square representing the line (MVP).
// Starts at the top-left open cell (row 1, col 1).
const player = {
  x: 1 * TILE,
  y: 1 * TILE,
  size: 20,
  speed: 120, // pixels per second
};

// Keys currently held down, keyed by e.key.toLowerCase().
const keysDown = {};

window.addEventListener("keydown", (e) => {
  keysDown[e.key.toLowerCase()] = true;
  // Keep arrow keys from scrolling the page while playing.
  if (e.key.startsWith("Arrow")) {
    e.preventDefault();
  }
});

window.addEventListener("keyup", (e) => {
  keysDown[e.key.toLowerCase()] = false;
});

function update(dt) {
  let dx = 0;
  let dy = 0;
  if (keysDown["arrowleft"] || keysDown["a"]) dx -= 1;
  if (keysDown["arrowright"] || keysDown["d"]) dx += 1;
  if (keysDown["arrowup"] || keysDown["w"]) dy -= 1;
  if (keysDown["arrowdown"] || keysDown["s"]) dy += 1;

  player.x += dx * player.speed * dt;
  player.y += dy * player.speed * dt;
}

function render() {
  for (let row = 0; row < GRID.length; row++) {
    for (let col = 0; col < GRID[row].length; col++) {
      ctx.fillStyle = GRID[row][col] === 1 ? "gray" : "black";
      ctx.fillRect(col * TILE, row * TILE, TILE, TILE);
    }
  }

  // Light outline around the center 3x3 goal zone (rows/cols 6-8).
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.strokeRect(6 * TILE, 6 * TILE, 3 * TILE, 3 * TILE);

  // Player drawn after the maze so it stays visible.
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

let lastTime = performance.now();

function gameLoop(now) {
  const dt = (now - lastTime) / 1000;
  lastTime = now;
  update(dt);
  render();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
