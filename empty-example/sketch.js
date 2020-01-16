let ball;



function setup() {
  createCanvas(500, 500);
  ball = new Ball(100,100,20);
}

function draw() {
  background(0);
  stroke(255);
  ball.update();
  ball.move();
  ball.display();
}

class Ball {
  constructor(x,y,r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.velX = 1;
    this.velY = 2;
  }

  update(){
    if(this.velX > 0 && this.x+this.r >= width || this.velX < 0 && this.x-this.r <= 0){
      this.velX *= -1;
    }
    if (this.velY > 0 && this.y+this.r >= height || this.velY < 0 && this.y-this.r <= 0) {
      this.velY *= -1;
    }
  }

  move(){
    this.x += this.velX;
    this.y += this.velY;
  }

  display(){
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }
}