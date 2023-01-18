import Room from "./room";
import Game from "./game";

class GameView {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.setCanvasDimensions();
    this.centerCanvas();
    window.addEventListener("resize", this.handleResize.bind(this));
  }
  setCanvasDimensions() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
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
    this.game = new Game(this.room, this.canvas);
    this.room.draw(this.ctx);

    let lastFrameTime = Date.now();

    this.loop = () => {
      if (this.game.mombies.length < 1) {
        this.game.levelUp();
      } else {
        // debugger;
        let currentTime = Date.now();
        let deltaTime = currentTime - lastFrameTime;
        lastFrameTime = currentTime;

        this.game.update(deltaTime);
        requestAnimationFrame(this.loop);
      }
    };

    this.loop();
  }
}
export default GameView;

// else if (this.game.gameOver === true) {
//     debugger;
//     this.game.gameOver();
//   }
