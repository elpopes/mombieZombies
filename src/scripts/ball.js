class Ball {
  constructor(room, canvas) {
    this.room = room;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.position = this.center(room);
    this.radius = 20;
    this.color = "red";
    this.velocity = [0, 0];
    this.pullDirection = [0, 0];
    this.decay = 0.97;
    this.firedTime = null;

    // Event listeners for firing
    window.addEventListener("mousedown", (event) => this.startPulling(event));
    window.addEventListener("mousemove", (event) => this.pull(event));
    window.addEventListener("mouseup", (event) => this.fire());
  }

  center(room) {
    return [room.roomWidth / 2, room.roomHeight / 2];
  }

  startPulling(event) {
    this.pulling = true;
    // Save the starting position of the pull
    this.pullStart = [event.clientX, event.clientY];
  }

  pull(event) {
    if (!this.pulling) return;
    // Calculate the pull direction by subtracting the starting position from the current mouse position
    this.pullDirection = [
      event.clientX - this.pullStart[0],
      event.clientY - this.pullStart[1],
    ];
  }

  fire() {
    if (!this.pulling) return;
    this.pulling = false;
    // Set the velocity to be the opposite of the pull direction
    this.velocity = [-this.pullDirection[0] / 15, -this.pullDirection[1] / 15];
    this.pullDirection = [0, 0];
    // Save the time the projectile was fired
    this.firedTime = Date.now();
  }

  collidesWith(room, deltaTime) {
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

  bounceOff(mombie) {
    const dx = this.position[0] - mombie.position.x;
    const dy = this.position[1] - mombie.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance <= this.radius + mombie.radius) {
      mombie.hitBy(this);
      this.velocity[0] = -this.velocity[0];
      this.velocity[1] = -this.velocity[1];
    }
  }

  update(deltaTime) {
    // Update the position of the ball based on its velocity and the delta time
    this.position[0] += this.velocity[0] * deltaTime;
    this.position[1] += this.velocity[1] * deltaTime;
    // Check for collision with the walls and windows
    this.collidesWith(this.room, deltaTime);

    // Slow ball down over time
    this.velocity[0] *= this.decay;
    this.velocity[1] *= this.decay;

    // if ball stops moving recenter
    if (
      Math.abs(this.velocity[0]) < 0.01 &&
      Math.abs(this.velocity[1]) < 0.01
    ) {
      this.position = this.center(this.room);
      this.velocity = [0, 0];
    }

    // Clear the projectile after 4 seconds
    // if (this.firedTime && Date.now() - this.firedTime > 4000) {
    //   this.position = this.center(this.room);
    //   this.firedTime = null;
    // }
    // this.draw(this.ctx);
  }

  draw() {
    // Draw the projectile at its current position
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(
      this.position[0],
      this.position[1],
      this.radius,
      0,
      2 * Math.PI
    );
    this.ctx.fill();

    // // Update the position based on the velocity
    // this.position[0] += this.velocity[0];
    // this.position[1] += this.velocity[1];

    // // Slow down the projectile over time
    // this.velocity[0] *= this.decay;
    // this.velocity[1] *= this.decay;

    // Clear the projectile after 4 seconds
    // if (this.firedTime && Date.now() - this.firedTime > 4000) {
    //   this.position = [-100, -100];
    //   this.firedTime = null;
    // }
  }
}

export default Ball;
