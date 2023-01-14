import Room from "./room";
import Gameview from "./game_view";
import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas dimensions to 90% of browser screen
  canvas.width = window.innerWidth * 0.9;
  canvas.height = window.innerHeight * 0.9;

  // create room
  const room = new Room(canvas.width, canvas.height);

  // Center the canvas
  canvas.style.margin = "auto";
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.bottom = "0";
  canvas.style.left = "0";
  canvas.style.right = "0";

  room.draw(ctx); // Draw the room on the canvas

  //   const game = new Game(room);
  //   new GameView(game, ctx).start();

  // Update canvas dimensions and center when screen is resized
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.9;
    canvas.style.margin = "auto";
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.bottom = "0";
    canvas.style.left = "0";
    canvas.style.right = "0";
    room.draw(ctx); // redraw the room on the canvas
  });
});
