const babyImg = new Image(20, 20);
babyImg.src = "../assets/images/sprites/baby.png";

class Baby {
  constructor(room, ctx) {
    this.room = room;
    this.ctx = ctx;
    this.position = this.randomPosition(this.room);
    this.room.center = this.center(room);
    this.radius = 20;
    this.attachedToMombie = false;
    this.mombie = null;
  }

  update() {
    if (!this.attachedToMombie) {
      this.moveInCircle();
    } else {
      this.position = this.mombie.position;
    }

    // this.collidesWith(this.room);
    // this.draw(this.ctx);
  }

  center(room) {
    return [room.roomWidth / 2, room.roomHeight / 2];
  }

  moveInCircle() {
    // Calculate the angle between the current position and the center of the room
    let angle = Math.atan2(
      this.position.y - this.room.center[1],
      this.position.x - this.room.center[0]
    );
    // Increment the angle by a small amount
    angle += 0.01;
    // Use the angle to calculate the new x and y positions
    this.position.x =
      this.room.center[0] + (Math.cos(angle) * this.room.circleRadius) / 4;
    this.position.y =
      this.room.center[1] + (Math.sin(angle) * this.room.circleRadius) / 4;
  }

  getPickedUp(mombie) {
    this.attachedToMombie = true;
    this.mombie = mombie;
  }

  getDropped() {
    this.attachedToMombie = false;
    // this.getAwayFrom(this.mombie);
    this.position = this.randomPosition(this.room);
    // this.draw(this.ctx);
  }

  getAwayFrom(mombie) {
    this.position.x = this.mombie.position.x - mombie.radius * 2;
    this.position.y = this.mombie.position.y - mombie.radius * 2;
    this.update();
  }

  draw(ctx) {
    ctx.drawImage(babyImg, this.position.x, this.position.y, 30, 30);
  }

  randomPosition(room) {
    let angle = Math.random() * 2 * Math.PI;
    let x = room.roomWidth / 2 + (room.circleRadius / 2) * Math.cos(angle);
    let y = room.roomHeight / 2 + (room.circleRadius / 2) * Math.sin(angle);
    return { x, y };
  }

  collidesWith(room) {
    if (
      this.position[0] - this.radius <= 0 ||
      this.position[0] + this.radius >= room.roomWidth
    ) {
      return true;
    }
    if (
      this.position[1] - this.radius <= 0 ||
      this.position[1] + this.radius >= room.roomHeight
    ) {
      return true;
    }
    return false;
  }
}
export default Baby;
