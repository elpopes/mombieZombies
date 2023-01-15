class Window {
  constructor(position, width = 75, height = 5) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.broken = false;
  }

  // may use later for added styling
  breakWindow() {
    this.broken = true;
  }

  fixWindow() {
    this.broken = false;
  }

  draw(ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

export default Window;
