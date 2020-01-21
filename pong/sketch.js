let ball;
let paddleSpeed = 10;
let ballRadius = 6;

let p1Score = 0;
let p2Score = 0;


let canvasWidth = 900;
let canvasHeight = 500;

function setup() {


  let canvas = createCanvas(canvasWidth, canvasHeight);
  
  canvas.position(windowWidth/2, 100);
  canvas.center('horizontal');

  displayScores();
  
  
  let startVelX = 4;
  let startVelY = 0;
  
  let isXVelNegative = random(-1, 1);
  if (isXVelNegative < 0) {
    startVelX *= -1;
  }
  
  ball = new Ball(width / 2, random(0 + ballRadius, height - ballRadius), ballRadius, startVelX, startVelY);
}

function draw() {
  background(0);
  stroke(255);
  displayScores();


  ball.move();
  ball.display();
}

function displayScores() {
  textSize(20);
  fill(255);
  textAlign(LEFT);
  text('Player 1: ' + p1Score, 20, 30);
  textAlign(RIGHT);
  text('Player 2: ' + p2Score, canvasWidth - 20, 30);
}
