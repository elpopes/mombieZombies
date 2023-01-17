// import Mover from "./mover";

// class Mombie extends Mover {
//   constructor(id, room, canvas, radius = 30) {
//     super({ x: 0, y: 0 }, { x: 0, y: 0 }, radius);
class Mombie {
  constructor(id, room, canvas, ball, radius = 30) {
    const randomDoor = Math.random() < 0.5 ? room.leftDoor : room.rightDoor;
    this.position = {
      x: randomDoor.position.x,
      y: room.roomHeight / 2,
    };
    this.dir = randomDoor.dir;
    this.ball = ball;
    this.hit = false;
    this.radius = radius;
    this.id = id;
    this.room = room;
    this.ctx = canvas.getContext("2d");
    // this.util = util;
    this.hasBaby = false;
    console.log(this.ball.radius);
  }

  draw(ctx) {
    ctx.fillStyle = "purple";
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  update() {
    // console.log(this.velocity.x);
    if (this.hit) {
      this.friction = 0.98;
      this.velocity.x *= this.friction;
      this.velocity.y *= this.friction;
      if (Math.abs(this.velocity.x) < 0.1 && Math.abs(this.velocity.y) < 0.1) {
        this.hit = false;
        this.velocity = { x: this.dir, y: 0 };
      }
    } else {
      this.velocity = { x: this.dir, y: 0 };
      //   debugger;
      console.log(this.velocity.x);
    }
    this.hitBy(this.ball);
    this.collidesWith(this.room);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.draw(this.ctx);
  }

  hitBy(ball) {
    // calculate the distance between the center of the Mombie and the center of the ball
    // console.log(ball);
    let distance = Math.sqrt(
      Math.pow(this.position.x - ball.position[0], 2) +
        Math.pow(this.position.y - ball.position[1], 2)
    );

    // check if the distance is less than the sum of the two radii
    if (distance < this.radius + ball.radius) {
      // collision flag
      this.hit = true;
      // calculate the new velocity of the Mombie based on the ball's velocity
      let newVelocity = {
        x: this.ball.velocity[0] * 0.9 * -1,
        y: this.ball.velocity[1] * 0.9 * -1,
      };
      // apply the new velocity to the Mombie

      this.velocity.x = newVelocity.x;
      this.velocity.y = newVelocity.y;
    }
  }

  collidesWith(room) {
    // Check for collision with the windows
    // Top left
    if (
      this.position[0] >= this.room.topLeftWindow.position.x &&
      this.position[0] <=
        this.room.topLeftWindow.position.x + room.topLeftWindow.width &&
      this.position[1] - this.radius <=
        this.room.topLeftWindow.position.y + this.room.topLeftWindow.height
    ) {
      this.position = this.center(this.room);
      this.velocity = [0, 0];
    }
    // Top right
    if (
      this.position[0] >= this.room.topRightWindow.position.x &&
      this.position[0] <=
        this.room.topRightWindow.position.x + this.room.topRightWindow.width &&
      this.position[1] - this.radius <=
        this.room.topRightWindow.position.y + this.room.topLeftWindow.height
    ) {
      this.position = this.center(this.room);
      this.velocity = [0, 0];
    }
    // Bottom left
    if (
      this.position[0] >= this.room.bottomLeftWindow.position.x &&
      this.position[0] <=
        this.room.bottomLeftWindow.position.x +
          this.room.bottomLeftWindow.width &&
      this.position[1] + this.radius >=
        this.room.bottomLeftWindow.position.y -
          this.room.bottomLeftWindow.height
    ) {
      this.position = this.center(this.room);
      this.velocity = [0, 0];
    }
    // Bottom right
    if (
      this.position[0] >= this.room.bottomRightWindow.position.x &&
      this.position[0] <=
        this.room.bottomRightWindow.position.x +
          this.room.bottomRightWindow.width &&
      this.position[1] >=
        this.room.bottomRightWindow.position.y -
          this.room.bottomLeftWindow.height
    ) {
      this.position = this.center(this.room);
      this.velocity = [0, 0];
    }

    // Check for collision with the walls
    if (
      this.position[0] - this.radius <= 0 ||
      this.position[0] + this.radius >= room.roomWidth
    ) {
      this.velocity[0] *= -1;
    }
    if (
      this.position[1] - this.radius <= 0 ||
      this.position[1] + this.radius >= room.roomHeight
    ) {
      this.velocity[1] *= -1;
    }
  }

  pickUpBaby(baby) {
    this.hasBaby = true;
    baby.position = { x: this.position.x, y: this.position.y };
    baby.velocity = { x: this.velocity.x, y: this.velocity.y };
    baby.isHeld = true;
  }
}

export default Mombie;
