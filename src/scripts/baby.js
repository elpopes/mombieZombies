class Baby {
  constructor(room, ctx) {
    this.room = room;
    this.ctx = ctx;
    this.position = this.randomPosition(this.room);
    this.room.center = this.center(room);
    this.velocity = this.randomVec(0.1);
    this.radius = 20;
    this.attachedToMombie = false;
    this.mombieId = null;
  }

  update() {
    if (!this.attachedToMombie) {
      this.moveInCircle();
    }
    this.draw(this.ctx);
  }

  center(room) {
    return [
      (room.roomWidth * room.scale) / 2,
      (room.roomHeight * room.scale) / 2,
    ];
  }

  moveInCircle() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.dist(this.position, this.room.center) > this.room.radius / 4) {
      this.velocity = this.scale(this.velocity, -1);
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

  randomPosition(room) {
    let angle = Math.random() * 2 * Math.PI;
    let x = room.roomWidth / 2 + room.circleRadius * Math.cos(angle);
    let y = room.roomHeight / 2 + room.circleRadius * Math.sin(angle);
    return { x, y };
  }

  randomVec(length) {
    let angle = Math.random() * 2 * Math.PI;
    return {
      x: length * Math.cos(angle),
      y: length * Math.sin(angle),
    };
  }

  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)
    );
  }

  scale(vec, m) {
    return { x: vec.x * m, y: vec.y * m };
  }
}
export default Baby;
