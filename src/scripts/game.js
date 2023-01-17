import Baby from "./baby";
import Mombie from "./mombie";
import Ball from "./ball";
import Util from "./util";

class Game {
  constructor(room, canvas) {
    this.balls = [];
    this.mombies = [];
    this.babies = [];
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    // this.player = player;
    this.room = room;
    this.level = 1;
    this.createBall();
    this.createMombies(1);
    this.createBabies(1);
  }

  createBall() {
    this.balls.push(new Ball(this.room, this.canvas));
  }

  createBabies(num) {
    for (let i = 0; i < num; i++) {
      this.babies.push(new Baby(this.room, this.ctx));
    }
  }

  createMombies(num) {
    for (let i = 0; i < num; i++) {
      this.mombies.push(
        new Mombie(this.mombies.length, this.room, this.canvas, this.balls[0])
      );
    }
  }

  update(deltaTime) {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.room.roomWidth, this.room.roomHeight);

    // Update positions of ball, mombies, babies, and player
    for (let i = 0; i < this.balls.length; i++) {
      this.balls[i].update(deltaTime);
    }
    for (let i = 0; i < this.mombies.length; i++) {
      this.mombies[i].update();
    }
    for (let i = 0; i < this.babies.length; i++) {
      this.babies[i].update();
    }
    // this.player.update();
    // Check for collisions
    // this.checkCollision();
    // Check if all mombies have been knocked out the window
    // this.checkLevel();
    // Draw the room
    this.room.draw(this.ctx);
    // Draw the ball, mombies and babies
    for (let i = 0; i < this.balls.length; i++) {
      this.balls[i].draw(this.ctx);
    }
    for (let i = 0; i < this.mombies.length; i++) {
      this.mombies[i].draw(this.ctx);
    }
    for (let i = 0; i < this.babies.length; i++) {
      this.babies[i].draw(this.ctx);
    }
    // this.player.draw(this.ctx);
  }

  //   checkCollision() {
  // Check for collisions between ball and mombies
  // for (let i = 0; i < this.balls.length; i++) {
  //   for (let j = 0; j < this.mombies.length; j++) {
  //     if (this.balls[i].collidesWith(this.mombies[j])) {
  //       this.balls[i].handleImpact(this.mombies[j]);
  //       this.mombies[j].handleImpact(this.balls[i]);
  //     }
  //   }
  // }
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
