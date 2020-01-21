class Ball {
  constructor(x, y, r, velx, vely) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.velX = velx;
    this.velY = vely;
  }

  update() {

    // Check for side collisions
    if (this.velX > 0 && this.x + this.r >= width || this.velX < 0 && this.x - this.r <= 0) {
      this.velX *= -1;
    }
    // ceiling collition
    if (this.velY < 0 && this.y - this.r <= 0) {
      this.velY *= -1;
    }
    if (this.velY > 0 && this.y + this.r >= height) {
      // Game Over
      return false;
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
      // Check for side collisions
      if (this.x + this.r + this.velX > obstacles[i].x &&
        this.x + this.velX < obstacles[i].x + obstacles[i].width &&
        this.y + this.r > obstacles[i].y &&
        this.y < obstacles[i].y + obstacles[i].height) {
        this.velX *= -1;
      }

      // Check for top / bottom collisions
      if (this.x + this.r > obstacles[i].x &&
        this.x < obstacles[i].x + obstacles[i].width &&
        this.y + this.r + this.velY > obstacles[i].y &&
        this.y + this.velY < obstacles[i].y + obstacles[i].height) {
        this.velY *= -1;

        // Is this a paddle collision?
        if (obstacles[i] instanceof Paddle) {
          Score += 10;

          // Increase ball speed, random on x OR y by 0,4
          let xOrY = random(-1, 1)
          if (xOrY < 0) {
            if (this.velX > 0) {
              this.velX += speedchange;
            }
            else {
              this.velX -= speedchange;
            }
          }
          else {
            if (this.velY > 0) {
              this.velY += speedchange;
            }
            else {
              this.velY -= speedchange;
            }
          }
        }
      }
    }
  }

  move() {
    this.x += this.velX;
    this.y += this.velY;
  }

  display() {
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}

function keyTyped() {
  // Reset HighScore with keypress 'r'
  if (key === 'r') {
    window.sessionStorage.HighScore = 0;
  }
}