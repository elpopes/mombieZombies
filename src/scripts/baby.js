class Baby {
  constructor(room, ctx) {
    this.room = room;
    this.ctx = ctx;
    this.radius = Math.random() * (120 - 20) + 20;
    this.position = this.randomPosition(this.room);
    this.room.center = this.center(room);
    this.attachedToMombie = false;
    this.mombie = null;
    this.babyImg = new Image(20, 20);
    this.babyImg.src = "assets/images/sprites/baby.png";
  }

  draw(ctx) {
    if (this.babyImg.naturalWidth > 0) {
      ctx.drawImage(this.babyImg, this.position.x, this.position.y, 30, 30);
    } else {
      this.babyImg.onload = function () {
        ctx.drawImage(this.babyImg, this.position.x, this.position.y, 30, 30);
      }.bind(this);
    }
  }

  update() {
    if (!this.attachedToMombie) {
      this.moveInCircle();
    } else {
      this.position = this.mombie.position;
    }
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
    // Increment the angle by a small amount, divided by the radius
    angle += 0.2 / this.radius;
    // Use the angle to calculate the new x and y positions based on the baby's radius
    this.position.x = this.room.center[0] + this.radius * Math.cos(angle);
    this.position.y = this.room.center[1] + this.radius * Math.sin(angle);
  }

  getPickedUp(mombie) {
    this.attachedToMombie = true;
    this.mombie = mombie;
  }

  getDropped() {
    this.attachedToMombie = false;
    this.position = this.randomPosition(this.room);
  }

  getAwayFrom(mombie) {
    this.position.x = this.mombie.position.x - mombie.radius * 2;
    this.position.y = this.mombie.position.y - mombie.radius * 2;
    this.update();
  }

  randomPosition(room) {
    let angle = Math.random() * 2 * Math.PI;
    this.radius = Math.random() * (120 - 20) + 20;
    let x = room.roomWidth / 2 + this.radius * Math.cos(angle);
    let y = room.roomHeight / 2 + this.radius * Math.sin(angle);
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
