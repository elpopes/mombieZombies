import Baby from "./baby";
import Mombie from "./mombie";

export class Game {
  constructor(projectiles, player, room, util) {
    this.projectiles = projectiles;
    this.mombies = [];
    this.babies = [];
    this.player = player;
    this.room = room;
    this.level = 1;
  }

  createBabies(num) {
    for (let i = 0; i < num; i++) {
      this.babies.push(new Baby(this.room));
    }
  }

  createMombies(num) {
    for (let i = 0; i < num; i++) {
      this.mombies.push(new Mombie(this.room));
    }
  }

  update() {
    // Update positions of projectiles, mombies, babies, and player
    for (let i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].update();
    }
    for (let i = 0; i < this.mombies.length; i++) {
      this.mombies[i].update();
    }
    for (let i = 0; i < this.babies.length; i++) {
      this.babies[i].update();
    }
    this.player.update();
    // Check for collisions
    this.checkCollision();
    // Check if all mombies have been knocked out the window
    this.checkLevel();
  }

  checkCollision() {
    // Check for collisions between projectiles and mombies
    for (let i = 0; i < this.projectiles.length; i++) {
      for (let j = 0; j < this.mombies.length; j++) {
        if (this.projectiles[i].collidesWith(this.mombies[j])) {
          this.projectiles[i].handleImpact(this.mombies[j]);
          this.mombies[j].handleImpact(this.projectiles[i]);
        }
      }
    }
    // Check for collisions between player and mombies
    for (let i = 0; i < this.mombies.length; i++) {
      if (this.player.collidesWith(this.mombies[i])) {
        this.player.handleImpact(this.mombies[i]);
        this.mombies[i].handleImpact(this.player);
      }
    }
    // Check for collision between player and babies
    for (let i = 0; i < this.babies.length; i++) {
      if (this.player.collidesWith(this.babies[i])) {
        this.player.handlePickUp(this.babies[i]);
        this.babies[i].handleImpact(this.player);
      }
    }
    // Check for collision with walls
    for (let i = 0; i < this.projectiles.length; i++) {
      if (this.projectiles[i].collidesWith(this.room)) {
        this.projectiles[i].handleWallImpact(this.room);
      }
    }
    for (let i = 0; i < this.mombies.length; i++) {
      if (this.mombies[i].collidesWith(this.room)) {
        this.mombies[i].handleWallImpact(this.room);
      }
    }
    if (this.player.collidesWith(this.room)) {
      this.player.handleWallImpact(this.room);
    }
  }
}
