import Baby from "./baby";
import Mombie from "./mombie";
import Ball from "./ball";
import GameView from "./game_view";
import Util from "./util";

class Game {
  debugger;
  constructor(room, canvas) {
    this.mombies = [];
    this.babies = [];
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    // this.player = player;
    this.room = room;
    this.level = window.level;
    this.gameOver = false;
    this.ball = this.createBall();
    this.createBabies(this.zMultiplier(this.level));
    this.createMombies(this.zMultiplier(this.level));
  }

  levelUp() {
    window.level += 1;
    let nextCanvas = document.getElementById("canvas");
    let nextCtx = nextCanvas.getContext("2d");
    new GameView(nextCanvas, nextCtx).start();
  }

  zMultiplier(n) {
    if (n === 1) return 1;
    return 2 * this.zMultiplier(n - 1);
  }

  createBall() {
    return new Ball(this.room, this.canvas);
  }

  createBabies(num) {
    for (let i = 0; i < num; i++) {
      this.babies.push(new Baby(this.room, this.ctx));
    }
  }

  createMombies(num) {
    for (let i = 0; i < num; i++) {
      this.mombies.push(
        new Mombie(this, this.babies[i], this.room, this.canvas, this.ball)
      );
      //   debugger;
    }
  }

  update(deltaTime) {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.room.roomWidth, this.room.roomHeight);

    // Update positions of ball, mombies, babies, and player
    this.ball.update(deltaTime);

    for (let i = 0; i < this.mombies.length; i++) {
      this.mombies[i].update(deltaTime);
    }
    for (let i = 0; i < this.babies.length; i++) {
      this.babies[i].update();
    }

    // Check ball collision with all mombies
    this.ballStrike();

    // Check mombie collisions with eachother
    if (this.mombies.length > 1) {
      this.mombieVMombie();
    }

    // Check if all mombies have been knocked out the window
    // Currently checking in the loop, with mombies splicing themselves out of loop

    // Draw the room
    this.room.draw(this.ctx);

    // Draw the ball, mombies and babies

    this.ball.draw(this.ctx);

    for (let i = 0; i < this.mombies.length; i++) {
      this.mombies[i].draw(this.ctx);
    }

    for (let i = 0; i < this.babies.length; i++) {
      this.babies[i].draw(this.ctx);
    }
    // this.player.draw(this.ctx);
  }

  //   Check for collisions between ball and mombies
  ballStrike() {
    for (let i = 0; i < this.mombies.length; i++) {
      this.ball.bounceOff(this.mombies[i]);
    }
  }

  mombieVMombie() {
    for (let i = 0; i < this.mombies.length; i++) {
      for (let j = 0; j < this.mombies.length; j++) {
        if (i !== j) {
          this.mombies[i].bounce(this.mombies[j]);
        }
      }
    }
  }
}

export default Game;
