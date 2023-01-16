class Baby {
  constructor(room, util) {
    this.room = room;
    this.util = util;
    this.position = util.randomPosition(room.center, room.radius / 4);
    this.velocity = Util.randomVec(0.1);
    this.radius = 5;
    this.attachedToMombie = false;
    this.mombieId = null;
  }

  update() {
    if (!this.attachedToMombie) {
      this.moveInCircle();
    }
  }

  moveInCircle() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (Util.dist(this.position, this.room.center) > this.room.radius / 4) {
      this.velocity = Util.scale(this.velocity, -1);
    }
  }

  getPickedUp(mombieId) {
    this.attachedToMombie = true;
    this.mombieId = mombieId;
  }

  getDropped() {
    this.attachedToMombie = false;
    this.mombieId = null;
  }

  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y);
    ctx.lineTo(this.position.x - this.radius, this.position.y + this.radius);
    ctx.lineTo(this.position.x + this.radius, this.position.y + this.radius);
    ctx.fill();
  }

  getBounds() {
    return {
      x: this.position.x,
      y: this.position.y,
      r: this.radius,
    };
  }
}
export default Baby;
