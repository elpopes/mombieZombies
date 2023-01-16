import Room from "./room";
import Game from "./game";

class GameView {
  constructor(canvas, ctx) {
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
    this.game = new Game(this.room, this.canvas);

    let lastFrameTime = Date.now();
    this.loop = () => {
      let currentTime = Date.now();
      let deltaTime = currentTime - lastFrameTime;
      lastFrameTime = currentTime;

      this.game.update(deltaTime);
      requestAnimationFrame(this.loop);
    };
    this.loop();
  }

  loop() {
    const now = Date.now();
    const deltaTime = now - this.lastTime;
    this.game.update(deltaTime);
    this.lastTime = now;
    requestAnimationFrame(this.loop.bind(this));
  }
}
export default GameView;
