let ball;
let obstacles = [];
let paddleSpeed;
let slider;



function setup() {
  createCanvas(500, 500);

  slider = createSlider(1, 20, 5);
  slider.style('width', '80px');

  ball = new Ball(20,20,5,2,-4);

  obstacles.push(new Paddle(20, (width-40), 60, 10));
  obstacles.push(new Rectangle(100, 200, 100, 50));
}

function draw() {
  paddleSpeed = slider.value();
  background(0);
  stroke(255);

  ball.move();
  ball.display();
  ball.update();

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].move();
    obstacles[i].display();
  }
}

class Ball {
  constructor(x,y,r,velx, vely) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.velX = velx;
    this.velY = vely;
  }

  update(){

    // Check for side collisions
    if(this.velX > 0 && this.x+this.r >= width || this.velX < 0 && this.x-this.r <= 0){
      this.velX *= -1;
    }
    // ceiling collition
    if (this.velY < 0 && this.y-this.r <= 0) {
      this.velY *= -1;
    }
    if (this.velY > 0 && this.y+this.r >= height) {
      // this.velY *= -1;
      background(255,0,0);
      noLoop();
    }
    
    for (let i = obstacles.length - 1; i >= 0; i--) {
      // Check for side collisions
      if(this.x + this.r + this.velX > obstacles[i].x &&
        this.x + this.velX < obstacles[i].x + obstacles[i].width &&
        this.y + this.r > obstacles[i].y &&
        this.y < obstacles[i].y + obstacles[i].height){
          this.velX *= -1;
      }

      // Check for top / bottom collisions
      if(this.x + this.r > obstacles[i].x &&
        this.x < obstacles[i].x + obstacles[i].width &&
        this.y + this.r + this.velY > obstacles[i].y &&
        this.y + this.velY < obstacles[i].y + obstacles[i].height) {
          this.velY *= -1;
      }
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

class Paddle {
  constructor(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  move(){
    if(keyIsDown(188) && this.x > 0){
      this.x -= paddleSpeed;
    }
    else if (keyIsDown(190) && this.x + this.width < width){
      this.x += paddleSpeed;
    }
  }

  display(){
    rect(this.x,this.y,this.width,this.height);
  }
}

class Rectangle {
  constructor(x,y,height,width){
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }
  update(){}
  move(){}
  display(){
    rect(this.x, this.y, this.width, this.height);
  }
}
