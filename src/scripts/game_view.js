import Room from "./room";

class GameView {
  constructor(canvas, ctx, game) {
    // this.game = game;
    this.canvas = canvas;
    this.ctx = ctx;
    this.setCanvasDimensions();
    this.centerCanvas();
    window.addEventListener("resize", this.handleResize.bind(this));
  }
  setCanvasDimensions() {
    this.canvas.width = window.innerWidth * 0.9;
    this.canvas.height = window.innerHeight * 0.9;
    this.room = new Room(this.canvas.width, this.canvas.height);
  }

  centerCanvas() {
    this.canvas.style.margin = "auto";
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.bottom = "0";
    this.canvas.style.left = "0";
    this.canvas.style.right = "0";
  }

  handleResize() {
    this.setCanvasDimensions();
    this.centerCanvas();
    this.room.draw(this.ctx);
  }

  start() {
    this.room.draw(this.ctx);
  }
}
export default GameView;
