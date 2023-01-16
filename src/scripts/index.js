import GameView from "./game_view";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  new GameView(canvas, ctx).start();
});
