let ball;
let obstacles = [];

let paddleSpeed = 10;
let speedchange = .4;

let Score = 0;
let HighScore;
if (window.localStorage.HighScore !== null && window.localStorage.HighScore >= 0) {
  HighScore = window.localStorage.HighScore;
}
else {
  window.localStorage.HighScore = 0;
  HighScore = 0;
}

let canvasWidth = 400;

function setup() {

  setupGameBoard();

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
}

function draw() {
  background(0);
  stroke(255);


  ball.move();
  ball.display();
  if(ball.update() == false){
    gameOver();
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].move();
    obstacles[i].display();
  }
  textSize(20);
  fill(255);
  textAlign(LEFT);
  text('Score: ' + Score, 20, 30);
  textAlign(RIGHT);
  text('HighScore: ' + HighScore, canvasWidth - 20, 30);
}

function setupGameBoard() {
  let canvas = createCanvas(400, 400);
  canvas.position(windowWidth/2 - canvasWidth/2, 200);

  textAlign(CENTER);
  let pageTitle = createDiv('Ball Bounce');
  pageTitle.class('title');
  pageTitle.position(windowWidth/2 - canvasWidth/2, 50);

  let howToPlay = createDiv(
    '<ul><li>Play with left and right arrows</li>' +
    '<li>The ball travels a little faster after every paddle touch</li>' +
    '<li>Now go get that highscore!</li></ul>');
  howToPlay.class('instructions');
  howToPlay.position(100, 200);
}

function gameOver() {
  background(255, 0, 0);
  textAlign(CENTER);
  text('Game Over!', width / 2, height / 2 - 20);
  if (Score > HighScore) {
    text('New HighScore!', width / 2, height / 2 + 20);
  }
  // this.velY *= -1;
  if (Score > HighScore) {
    HighScore = Score
    window.localStorage.HighScore = HighScore;
  }
  noLoop();

  let button = createButton('New Game');
  button.position(windowWidth/2, 400);
  button.center();
  button.mousePressed(e => {
    location.reload();
  });
}