import Baby from "./baby";
import Mombie from "./mombie";
import Ball from "./ball";
import Util from "./util";

class Game {
  constructor(room, canvas) {
    this.mombies = [];
    this.babies = [];
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    // this.player = player;
    this.room = room;
    this.level = 1;

    this.ball = this.createBall();
    this.createBabies(this.zMultiplier(this.level));
    this.createMombies(this.zMultiplier(this.level));
  }

  zMultiplier(n) {
    if (n === 1) return 1;
    return 2 * returnValue(n - 1);
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
        new Mombie(this.babies[i], this.room, this.canvas, this.ball)
      );
    }
  }

  update(deltaTime) {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.room.roomWidth, this.room.roomHeight);

    // Update positions of ball, mombies, babies, and player
    this.ball.update(deltaTime);

    for (let i = 0; i < this.mombies.length; i++) {
      this.mombies[i].update();
    }
    for (let i = 0; i < this.babies.length; i++) {
      this.babies[i].update();
    }

    // Check ball collision with all mombies
    this.ballStrike();
    // Check if all mombies have been knocked out the window
    // this.checkLevel();
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

  ballStrike() {
    //   Check for collisions between ball and mombies

    for (let i = 0; i < this.mombies.length; i++) {
      this.ball.bounceOff(this.mombies[i]);
    }
  }

  // Check for collisions between player and mombies
  // for (let i = 0; i < this.mombies.length; i++) {
  //   if (this.player.collidesWith(this.mombies[i])) {
  //     this.player.handleImpact(this.mombies[i]);
  //     this.mombies[i].handleImpact(this.player);
  //   }
  // }
  // Check for collision between player and babies
  // for (let i = 0; i < this.babies.length; i++) {
  //   if (this.player.collidesWith(this.babies[i])) {
  //     this.player.handlePickUp(this.babies[i]);
  //     this.babies[i].handleImpact(this.player);
  //   }
  // }
  // Check for collision with walls
  // for (let i = 0; i < this.balls.length; i++) {
  //   if (this.balls[i].collidesWith(this.room, deltaTime)) {
  //     this.balls[i].handleWallImpact(this.room, deltaTime);
  //   }
  // }
  // for (let i = 0; i < this.mombies.length; i++) {
  //   if (this.mombies[i].collidesWith(this.room, deltaTime)) {
  //     this.mombies[i].handleWallImpact(this.room, deltaTime);
  //   }
  // }
  // if (this.player.collidesWith(this.room)) {
  //   this.player.handleWallImpact(this.room);
  // }
  //   }
}

export default Game;
