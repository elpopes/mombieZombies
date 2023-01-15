import Mover from "./mover";

class Mombie extends Mover {
  constructor(id, room, util, radius = 10) {
    super({ x: 0, y: 0 }, { x: 0, y: 0 }, radius);
    this.position = this.generateAtRandomDoor(room);
    this.id = id;
    this.room = room;
    this.util = util;
    this.hasBaby = false;
    this.dir = this.setDirection(room);
  }

  generateAtRandomDoor(room) {
    const randomDoor = Math.random() < 0.5 ? room.leftDoor : room.rightDoor;
    return { x: randomDoor.x, y: randomDoor.y };
  }

  setDirection(room) {
    return randomDoor.x === room.leftDoor.x ? 1 : -1;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "purple";
    ctx.fill();
  }

  update() {
    this.velocity = { x: this.dir, y: 0 };
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  pickUpBaby(baby) {
    this.hasBaby = true;
    baby.position = { x: this.position.x, y: this.position.y };
    baby.velocity = { x: this.velocity.x, y: this.velocity.y };
    baby.isHeld = true;
  }

  pickUpBaby(baby) {
    this.hasBaby = true;
    baby.position = { x: this.position.x, y: this.position.y };
    baby.velocity = { x: this.velocity.x, y: this.velocity.y };
    baby.isHeld = true;
  }
}

export default Mombie;
