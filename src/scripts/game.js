export class Game {
  constructor(projectiles, zombies, babies, player, room) {
    this.projectiles = projectiles;
    this.zombies = zombies;
    this.babies = babies;
    this.player = player;
    this.room = room;
  }
  update() {
    // Update positions of projectiles, zombies, babies, and player
    for (let i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].update();
    }
    for (let i = 0; i < this.zombies.length; i++) {
      this.zombies[i].update();
    }
    for (let i = 0; i < this.babies.length; i++) {
      this.babies[i].update();
    }
    this.player.update();

    // Check for collisions
    this.checkCollision();
  }
  checkCollision() {
    // Check for collisions between projectiles and zombies
    for (let i = 0; i < this.projectiles.length; i++) {
      for (let j = 0; j < this.zombies.length; j++) {
        if (this.projectiles[i].collidesWith(this.zombies[j])) {
          this.projectiles[i].handleImpact(this.zombies[j]);
          this.zombies[j].handleImpact(this.projectiles[i]);
        }
      }
    }
    // Check for collisions between player and zombies
    for (let i = 0; i < this.zombies.length; i++) {
      if (this.player.collidesWith(this.zombies[i])) {
        this.player.handleImpact(this.zombies[i]);
        this.zombies[i].handleImpact(this.player);
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
    for (let i = 0; i < this.zombies.length; i++) {
      if (this.zombies[i].collidesWith(this.room)) {
        this.zombies[i].handleWallImpact(this.room);
      }
    }
    if (this.player.collidesWith(this.room)) {
      this.player.handleWallImpact(this.room);
    }
  }
}
