class Mover {
  constructor(position, velocity, radius, isBaby = false) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.isBaby = isBaby;
  }
  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
  handleImpact(impactForce) {
    // Implement bounce
  }
  getBounds() {
    return {
      x: this.position.x,
      y: this.position.y,
      r: this.radius,
    };
  }
}
export default Mover;
