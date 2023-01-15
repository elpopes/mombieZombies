import GameView from "./game_view";
import Game from "./game";
import Util from "./util";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  //   const game = new Game(); will need to include util.

  new GameView(canvas, ctx).start();
});
