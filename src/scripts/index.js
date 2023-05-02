import GameView from "./game_view";
window.level = 1;

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  new GameView(canvas, ctx).start();

  let touchStartY = 0;

  window.addEventListener("touchstart", function (event) {
    if (event.touches.length === 1) {
      touchStartY = event.touches[0].clientY;
    }
  });

  window.addEventListener("touchmove", function (event) {
    event.preventDefault();
  });
});
