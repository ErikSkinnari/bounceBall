let ball;
let obstacles = [];

let paddleSpeed = 10;
let speedchange = .4;

let Score = 0;
let HighScore;
if (window.sessionStorage.HighScore !== null && window.sessionStorage.HighScore >= 0) {
  HighScore = window.sessionStorage.HighScore;
}
else {
  window.sessionStorage.HighScore = 0;
  HighScore = 0;
}



function setup() {
  createCanvas(500, 500);

  let startVelX = random(2, 4);
  let startVelY = random(2, 4);

  let isXVelNegative = random(-1, 1);
  if (isXVelNegative < 0) {
    startVelX *= -1;
  }
  let isYVelNegative = random(-1, 1);
  if (isYVelNegative < 0) {
    startVelY *= -1;
  }

  ball = new Ball(width / 2, 20, 5, startVelX, startVelY);

  obstacles.push(new Paddle(20, (width - 40), 60, 10));
  //obstacles.push(new Rectangle(100, 200, 100, 50));
}

function draw() {
  background(0);
  stroke(255);

  ball.move();
  ball.display();
  ball.update();

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].move();
    obstacles[i].display();
  }
  textSize(20);
  fill(255);
  text('Score: ' + Score, 20, 30);
  text('HighScore: ' + HighScore, width - 180, 30)
}