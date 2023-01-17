// import Mover from "./mover";

// class Mombie extends Mover {
//   constructor(id, room, canvas, radius = 30) {
//     super({ x: 0, y: 0 }, { x: 0, y: 0 }, radius);
class Mombie {
  constructor(id, room, canvas, radius = 30) {
    const randomDoor = Math.random() < 0.5 ? room.leftDoor : room.rightDoor;
    this.position = {
      x: randomDoor.position.x,
      y: (room.roomHeight * room.scale) / 2,
    };
    this.dir = randomDoor.dir;

    this.radius = radius;
    this.id = id;
    this.room = room;
    this.ctx = canvas.getContext("2d");

    // this.util = util;
    this.hasBaby = false;
  }

  draw(ctx) {
    ctx.fillStyle = "purple";
    ctx.beginPath();
    ctx.arc(
      this.position.x * this.room.scale,
      this.position.y,
      this.radius,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
  }

  update() {
    this.velocity = { x: this.dir, y: 0 };
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.draw(this.ctx);
  }

  pickUpBaby(baby) {
    this.hasBaby = true;
    baby.position = { x: this.position.x, y: this.position.y };
    baby.velocity = { x: this.velocity.x, y: this.velocity.y };
    baby.isHeld = true;
  }

  //   pickUpBaby(baby) {
  //     this.hasBaby = true;
  //     baby.position = { x: this.position.x, y: this.position.y };
  //     baby.velocity = { x: this.velocity.x, y: this.velocity.y };
  //     baby.isHeld = true;
  //   }
}

export default Mombie;
