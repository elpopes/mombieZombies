const canvasEl = document.getElementById("canvas");
const ctx = canvasEl.getContext("2d");

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

const reduction = 0.2;

canvas.width = windowWidth;
canvas.height = windowHeight;
const roomHeight = canvas.height * 0.9;
const roomWidth = canvas.width * 0.9;

function getCanvasCenter() {
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  return { x: centerX, y: centerY };
}

function drawRoom() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  c;
  ctx.strokeStyle = "rgba(255, 0, 0, 1)";
  ctx.fillRect(10, 10, canvas.width, canvas.height);
}

// Draw the circle at the center of the canvas
function drawCircle() {
  let center = getCanvasCenter();
  ctx.beginPath();
  ctx.arc(center.x, center.y, 100, 0, 2 * Math.PI);
  ctx.lineWidth = 5;
  ctx.stroke();
}

drawRoom();

window.addEventListener("resize", function () {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  canvas.width = windowWidth;
  canvas.height = windowHeight;
  drawRoom();
});

// Draw the circle when the page loads
drawCircle();

// Re-draw the circle when the window is resized
window.addEventListener("resize", function () {
  drawCircle();
});
