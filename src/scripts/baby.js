class Baby {
  constructor(room, ctx) {
    this.room = room;
    this.ctx = ctx;
    this.position = this.randomPosition(this.room);
    this.room.center = this.center(room);
    this.radius = 20;
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
    this.position.x = this.room.center[0] + Math.cos(angle) * this.radius;
    this.position.y = this.room.center[1] + Math.sin(angle) * this.radius;
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

  randomPosition(room) {
    let angle = Math.random() * 2 * Math.PI;
    this.radius = Math.random() * (120 - 20) + 20; // Assign a random radius between 20 and 120
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
