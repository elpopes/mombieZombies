const Util = {
  // Normalize the length of the vector to 1, maintaining direction.
  dir(vec) {
    const norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },
  // Find distance between two points.
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  // Find the length of the vector.
  norm(vec) {
    return Util.dist([0, 0], vec);
  },
  // Return a randomly oriented vector with the given length.
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },
  //Inherit prototype methods
  inherits(ChildClass, BaseClass) {
    ChildClass.prototype = Object.create(BaseClass.prototype);
    ChildClass.prototype.constructor = ChildClass;
  },

  //Calculate window position will need to be debugged
  //calling directly from index in the meantime

  calculateWindowPosition(
    quadrant,
    roomWidth,
    roomHeight,
    windowWidth = 75,
    windowHeight = 5
  ) {
    if (quadrant === "topLeft") {
      return { x: (roomWidth / 2 - windowWidth) / 2, y: 0 };
    } else if (quadrant === "topRight") {
      return {
        x: roomWidth / 2 + (roomWidth / 2 - windowWidth) / 2,
        y: 0,
      };
    } else if (quadrant === "bottomLeft") {
      return {
        x: (roomWidth / 2 - windowWidth) / 2,
        y: roomHeight - windowHeight,
      };
    } else if (quadrant === "bottomRight") {
      return {
        x: roomWidth / 2 + (roomWidth / 2 - windowWidth) / 2,
        y: roomHeight - windowHeight,
      };
    }
  },
};

export default Util;
