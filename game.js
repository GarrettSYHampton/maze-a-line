const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Clear the canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw a placeholder blue square
ctx.fillStyle = "blue";
ctx.fillRect(275, 275, 50, 50);
