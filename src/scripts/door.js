class Door {
  constructor(position, width = 5, height = 100) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.open = false;
  }

  openDoor() {
    this.open = true;
  }

  closeDoor() {
    this.open = false;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    // console.log(this, this.position.x, this.position.y, this.width);
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

export default Door;
