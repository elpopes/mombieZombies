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
    // this.canvas.style.position = "absolute";
    // this.canvas.style.top = "0";
    this.canvas.style.bottom = "0";
    this.canvas.style.left = "0";
    this.canvas.style.right = "0";
  }

  handleResize() {
    this.setCanvasDimensions();
    this.centerCanvas();
    this.room.draw(this.ctx);
  }

  levelDisplay(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "purple";
    ctx.font = "128px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      `Level ${window.level}`,
      ctx.canvas.width / 2,
      ctx.canvas.height / 2
    );
    return new Promise((resolve) => setTimeout(resolve, 3000));
  }
  start() {
    this.levelDisplay(this.ctx).then(() => {
      this.game = new Game(this.room, this.canvas);
      this.room.draw(this.ctx);
      let lastFrameTime = Date.now();
      this.loop = () => {
        if (this.game.gameOver === true) {
          alert("Game over! Click OK to play again.");
          location.reload();
          return;
        }
        if (this.game.mombies.length < 1) {
          this.game.levelUp();
        } else {
          let currentTime = Date.now();
          let deltaTime = currentTime - lastFrameTime;
          lastFrameTime = currentTime;
          this.game.update(deltaTime);
          requestAnimationFrame(this.loop);
        }
      };
      this.loop();
    });
  }
}

export default GameView;
