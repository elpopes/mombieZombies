import Door from "./door";
import Window from "./window";

class Room {
  constructor(canvasWidth, canvasHeight) {
    this.roomWidth = canvasWidth;
    this.roomHeight = canvasHeight;

    // Set the circle radius
    this.circleRadius = 125;

    // Calculate door positions and pass them to the door instances
    this.leftDoor = new Door(
      this.calculateLeftDoorPosition(),
      this.doorWidth,
      this.doorHeight,
      1
    );
    this.rightDoor = new Door(
      this.calculateRightDoorPosition(),
      this.doorWidth,
      this.doorHeight,
      -1
    );

    //call the calculateWindowPosition and use it instantiate four windows
    this.topLeftWindow = new Window(this.calculateWindowPosition("topLeft"));
    this.topRightWindow = new Window(this.calculateWindowPosition("topRight"));
    this.bottomLeftWindow = new Window(
      this.calculateWindowPosition("bottomLeft")
    );
    this.bottomRightWindow = new Window(
      this.calculateWindowPosition("bottomRight")
    );
  }

  calculateLeftDoorPosition() {
    // position the door in the middle of the left wall, aligned with the circle
    const doorX = 0;
    const doorY = this.roomHeight / 2 - 100 / 2;
    return { x: doorX, y: doorY };
  }

  calculateRightDoorPosition() {
    // position the door in the middle of the right wall, aligned with the circle
    const doorX = this.roomWidth - 5;
    const doorY = this.roomHeight / 2 - 100 / 2;
    return { x: doorX, y: doorY };
  }

  // position each window using the room width to find the quadrants
  calculateWindowPosition(quadrant) {
    const windowWidth = 200;
    const windowHeight = 5;
    if (quadrant === "topLeft") {
      return { x: (this.roomWidth / 2 - windowWidth) / 2, y: 0 };
    } else if (quadrant === "topRight") {
      return {
        x: this.roomWidth / 2 + (this.roomWidth / 2 - windowWidth) / 2,
        y: 0,
      };
    } else if (quadrant === "bottomLeft") {
      return {
        x: (this.roomWidth / 2 - windowWidth) / 2,
        y: this.roomHeight - windowHeight,
      };
    } else if (quadrant === "bottomRight") {
      return {
        x: this.roomWidth / 2 + (this.roomWidth / 2 - windowWidth) / 2,
        y: this.roomHeight - windowHeight,
      };
    }
  }

  draw(ctx) {
    // Clear the canvas
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Save the current state of the canvas
    ctx.save();

    // Draw the room
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, this.roomWidth, this.roomHeight);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, this.roomWidth, this.roomHeight);

    // Draw the doors
    this.leftDoor.draw(ctx);
    this.rightDoor.draw(ctx);

    // Draw the windows
    this.topLeftWindow.draw(ctx);
    this.topRightWindow.draw(ctx);
    this.bottomLeftWindow.draw(ctx);
    this.bottomRightWindow.draw(ctx);

    // Draw the circle in the center of the room
    ctx.beginPath();
    ctx.arc(
      this.roomWidth / 2,
      this.roomHeight / 2,
      this.circleRadius,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.stroke();

    // Restore the canvas state
    ctx.restore();
  }
}

export default Room;
