// const mombieImg = new Image(30, 30);
// mombieImg.src = "../assets/images/sprites/mombie.png";

class Mombie {
  constructor(game, baby, room, canvas, ball, radius = 30) {
    const randomDoor = Math.random() < 0.5 ? room.leftDoor : room.rightDoor;
    this.position = {
      x: randomDoor.position.x,
      y: room.roomHeight / 2,
    };

    this.dir = randomDoor.dir;
    this.ball = ball;
    this.hit = false;
    this.radius = radius;
    this.game = game;
    this.baby = baby;
    this.room = room;
    this.ctx = canvas.getContext("2d");
    this.hasBaby = false;
    this.frame = 0;
    this.mombieImg = new Image(30, 30);
    this.mombieImg.src = "assets/images/sprites/mombie.png";
  }

  draw(ctx) {
    if (this.mombieImg.naturalWidth > 0) {
      ctx.drawImage(
        this.mombieImg,
        this.position.x - 30,
        this.position.y - 30,
        60,
        60
      );
    } else {
      this.mombieImg.onload = function () {
        ctx.drawImage(
          this.mombieImg,
          this.position.x - 30,
          this.position.y - 30,
          60,
          60
        );
      }.bind(this);
    }
  }

  //   draw(ctx) {
  //     ctx.drawImage(mombieImg, this.position.x, this.position.y, 60, 60);
  //   }

  //   draw(ctx) {
  //     ctx.fillStyle = "purple";
  //     ctx.beginPath();
  //     ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
  //     this.ctx.fill();
  //   }

  update() {
    this.frame++;

    if (this.hasBaby) {
      this.findNearestDoor();
    } else {
      // Calculate distance between mombie and baby
      let dx = this.baby.position.x - this.position.x;
      let dy = this.baby.position.y - this.position.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      // Normalize the distance to get a unit vector in the direction of the baby
      dx /= distance;
      dy /= distance;

      // Update mombie's velocity to move towards the baby
      if (!this.hit) {
        this.velocity = { x: dx, y: dy };
      }
      if (distance < 5) {
        this.pickUpBaby(this.baby);
      }

      if (this.hit) {
        this.friction = 0.95;
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        if (
          Math.abs(this.velocity.x) < 0.1 &&
          Math.abs(this.velocity.y) < 0.1
        ) {
          this.hit = false;
          this.velocity = { x: this.dir, y: 0 };
        }
      }

      if (this.frame > 40) {
        this.hitBy(this.ball);
        this.collidesWith(this.room);
      }

      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }

  hitBy(ball) {
    // Check if the object is a ball
    if (!(ball instanceof this.ball.constructor)) {
      return;
    }
    // calculate the distance between the center of the Mombie and the center of the ball
    let distance = Math.sqrt(
      Math.pow(this.position.x - ball.position[0], 2) +
        Math.pow(this.position.y - ball.position[1], 2)
    );

    // check if the distance is less than the sum of the two radii
    if (distance < this.radius + ball.radius) {
      this.dropBaby(this.baby);

      // Calculate direction to baby
      let dx = this.baby.position.x - this.position.x;
      let dy = this.baby.position.y - this.position.y;
      let babyDistance = Math.sqrt(dx * dx + dy * dy);
      dx /= babyDistance;
      dy /= babyDistance;

      // Apply the new velocity to the Mombie, but keep the magnitude of the impact
      let impactMagnitude = Math.sqrt(
        Math.pow(ball.velocity[0], 2) + Math.pow(ball.velocity[1], 2)
      );
      this.velocity.x = dx * impactMagnitude * -80;
      this.velocity.y = dy * impactMagnitude * -80;
    }
  }

  bounce(mombie) {
    // calculate the distance between the center of the Mombie and the center of the ball
    // console.log(ball);
    // debugger;
    let distance = Math.sqrt(
      Math.pow(this.position.x - mombie.position.x, 2) +
        Math.pow(this.position.y - mombie.position.y, 2)
    );

    // check if the distance is less than the sum of the two radii
    if (distance < this.radius + mombie.radius && this.frame > 100) {
      // collision flag
      this.hit = true;
      // drop baby...
      this.dropBaby(this.baby);
      // calculate the new velocity of the Mombie based on the mombie's velocity

      let newVelocity = {
        x: mombie.velocity.x * -1,
        y: mombie.velocity.y * -1,
      };
      //   debugger;
      // apply the new velocity to the Mombie

      this.velocity.x = newVelocity.x;
      this.velocity.y = newVelocity.y;
    }
  }

  outWindow() {
    this.position.x = -100;
    this.position.y = -100;
    this.velocity = [0, 0];

    this.game.mombies.splice(this.game.mombies.indexOf(this), 1);
  }

  collidesWith(room) {
    // Check for collision with doors, allowing to pass if door is open
    // Door lets mombie in but doesn't let them out unless they have baby

    // Check for collision with the windows
    // Top left
    if (
      this.position.x >= this.room.topLeftWindow.position.x &&
      this.position.x <=
        this.room.topLeftWindow.position.x + room.topLeftWindow.width &&
      this.position.y - this.radius <=
        this.room.topLeftWindow.position.y + this.room.topLeftWindow.height
    ) {
      this.outWindow();
    }
    // Top right
    if (
      this.position.x >= this.room.topRightWindow.position.x &&
      this.position.x <=
        this.room.topRightWindow.position.x + this.room.topRightWindow.width &&
      this.position.y - this.radius <=
        this.room.topRightWindow.position.y + this.room.topLeftWindow.height
    ) {
      this.outWindow();
    }
    // Bottom left
    if (
      this.position.x >= this.room.bottomLeftWindow.position.x &&
      this.position.x <=
        this.room.bottomLeftWindow.position.x +
          this.room.bottomLeftWindow.width &&
      this.position.y + this.radius >=
        this.room.bottomLeftWindow.position.y -
          this.room.bottomLeftWindow.height
    ) {
      this.outWindow();
    }
    // Bottom right
    if (
      this.position.x >= this.room.bottomRightWindow.position.x &&
      this.position.x <=
        this.room.bottomRightWindow.position.x +
          this.room.bottomRightWindow.width &&
      this.position.y >=
        this.room.bottomRightWindow.position.y -
          this.room.bottomLeftWindow.height
    ) {
      this.outWindow();
    }

    // Check for collision with the walls

    if (this.position.x - this.radius <= 0) {
      this.position.x = this.radius;
      this.velocity.x *= -1;
    } else if (this.position.x + this.radius >= room.roomWidth) {
      this.position.x = room.roomWidth - this.radius;
      this.velocity.x *= -1;
    }
    if (this.position.y - this.radius <= 0) {
      this.position.y = this.radius;
      this.velocity.y *= -1;
    } else if (this.position.y + this.radius >= room.roomHeight) {
      this.position.y = room.roomHeight - this.radius;
      this.velocity.y *= -1;
    }
  }

  pickUpBaby(baby) {
    this.hasBaby = true;
    baby.getPickedUp(this);
  }

  dropBaby(baby) {
    if (this.hasBaby) {
      this.hasBaby = false;
      baby.getDropped();
    }
    // debugger;
  }

  findNearestDoor() {
    // Find the distance to the left door

    let leftDoorDistance = Math.sqrt(
      Math.pow(this.position.x - this.room.leftDoor.position.x, 2) +
        Math.pow(this.position.y - this.room.leftDoor.position.y, 2)
    );

    // Find the distance to the right door
    let rightDoorDistance = Math.sqrt(
      Math.pow(this.position.x - this.room.rightDoor.position.x, 2) +
        Math.pow(this.position.y - this.room.rightDoor.position.y, 2)
    );

    // Compare the distances and set the nearest door
    let nearestDoor =
      leftDoorDistance < rightDoorDistance
        ? this.room.leftDoor
        : this.room.rightDoor;

    // Calculate distance between mombie and door
    let dx = nearestDoor.position.x - this.position.x;
    let dy = this.room.roomHeight / 2 - this.position.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    // Normalize the distance to get a unit vector in the direction of the door
    dx /= distance;
    dy /= distance;

    // Update mombie's velocity to move towards the door
    this.velocity = { x: dx, y: dy };

    // update position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (
      Math.abs(this.position.x - nearestDoor.position.x) < 5 &&
      this.hasBaby
    ) {
      // end the game
      this.game.gameOver = true;
    }
  }
}

export default Mombie;
