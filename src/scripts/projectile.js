class Projectile {
  constructor(room) {
    this.room = room;
    this.position = [room.roomWidth / 2, room.roomHeight / 2];
    this.radius = 10;
    this.color = "red";
    this.velocity = [0, 0];
    this.pullDirection = [0, 0];
    this.decay = 0.99;
    this.firedTime = null;

    // Event listeners for firing
    this.room.canvas.addEventListener("mousedown", (event) =>
      this.startPulling(event)
    );
    this.room.canvas.addEventListener("mousemove", (event) => this.pull(event));
    this.room.canvas.addEventListener("mouseup", (event) => this.fire(event));
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
    this.velocity = [-this.pullDirection[0] / 10, -this.pullDirection[1] / 10];
    this.pullDirection = [0, 0];
    // Save the time the projectile was fired
    this.firedTime = Date.now();
  }

  draw() {
    // Draw the projectile at its current position
    this.room.context.fillStyle = this.color;
    this.room.context.beginPath();
    this.room.context.arc(
      this.position[0],
      this.position[1],
      this.radius,
      0,
      2 * Math.PI
    );
    this.room.context.fill();

    // Check for collision with the walls and windows
    if (
      this.position[0] - this.radius <= 0 ||
      this.position[0] + this.radius >= this.room.roomWidth
    ) {
      this.velocity[0] *= -1;
    }
    if (
      this.position[1] - this.radius <= 0 ||
      this.position[1] + this.radius >= this.room.roomHeight
    ) {
      this.velocity[1] *= -1;
    }
    if (
      this.position[0] >= this.room.topLeftWindow.x &&
      this.position[0] <=
        this.room.topLeftWindow.x + this.room.topLeftWindow.width &&
      this.position[1] >= this.room.topLeftWindow.y &&
      this.position[1] <=
        this.room.topLeftWindow.y + this.room.topLeftWindow.height
    ) {
      this.position = [-100, -100];
    }
    // Repeat the check for the other three windows

    // Update the position based on the velocity
    this.position[0] += this.velocity[0];
    this.position[1] += this.velocity[1];

    // Slow down the projectile over time
    this.velocity[0] *= this.decay;
    this.velocity[1] *= this.decay;

    // Clear the projectile after 4 seconds
    if (this.firedTime && Date.now() - this.firedTime > 4000) {
      this.position = [-100, -100];
      this.firedTime = null;
    }
  }
}

export default Projectile;
