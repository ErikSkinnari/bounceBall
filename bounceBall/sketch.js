let ball;
let obstacles = [];

let paddleSpeed = 10;
let paddleHits = 0;
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

let hs;
let highscorestable;

let canvasWidth = 400;

function preload() {
  let url = '../gamehandler/gethighscores.php?gameid=1';
  hs = loadJSON(url);
}

function setup() {

  setupGameBoard();

  let startVelX = 2;
  let startVelY = 2;

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
  if (ball.update() == false) {
    gameOver();
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].move();
    obstacles[i].display();
  }
  textSize(20);
  fill(255);
  if (Score > 1000) {
    noLoop();
  }
  textAlign(LEFT);
  text('Score: ' + Score, 20, 30);
  textAlign(RIGHT);
  text('HighScore: ' + HighScore, canvasWidth - 20, 30);
}


function setupGameBoard() {
  let canvas = createCanvas(canvasWidth, canvasWidth);
  canvas.position(windowWidth / 2 - canvasWidth / 2, 200);

  textAlign(CENTER);
  let pageTitle = createDiv('Ball Bounce');
  pageTitle.class('title');
  pageTitle.position(windowWidth / 2 - canvasWidth / 2, 50);

  let howToPlay = createDiv(
    '<ul><li>Play with left and right arrows</li>' +
    '<li>The ball travels a little faster after every paddle touch</li>' +
    '<li>Now go get that highscore!</li></ul>');
  howToPlay.class('instructions');
  howToPlay.position(100, 200);


  if (hs !== null) {
    let Highscores = createDiv();
    Highscores.class('Highscores');
    Highscores.position(windowWidth / 2 + canvasWidth / 2 + 100, 200);

    let hsTitle = createElement('h3', 'Highscores (WIP)');

    Highscores.child(hsTitle);

    var hsTable = createElement('table');
    let hsTableHead = createElement('thead', '<tr><th style="text-align: left;">Player</th><th style="text-align: left;">Score</th></tr>');

    hsTable.child(hsTableHead);


    var hsTableBody = createElement('tbody');
    for (var score in hs) {
    let row = createElement('tr', '<td>' + hs[score].playername + '</td><td>' + hs[score].score + '</td>');
      hsTableBody.child(row);
    }

    hsTable.child(hsTableBody);
    Highscores.child(hsTable);
  }
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
  button.position(windowWidth / 2 - button.width / 2, 200 + canvasWidth - 100);
  button.mousePressed(e => {
    location.reload();
  });
}

class Ball {

  constructor(x, y, r, velx, vely) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.velX = velx;
    this.velY = vely;
    this.speedchange = speedchange;
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
          paddleHits += 1;

          // Increase ball speed, random on x OR y by 0,4
          let xOrY = random(-1, 1)
          if (xOrY < 0) {
            if (this.velX > 0) {
              this.velX += this.speedchange;
            }
            else {
              this.velX -= this.speedchange;
            }
          }
          else {
            if (this.velY > 0) {
              this.velY += this.speedchange;
            }
            else {
              this.velY -= this.speedchange;
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

class Paddle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  move() {
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= paddleSpeed;
    }
    else if (keyIsDown(RIGHT_ARROW) && this.x + this.width < width) {
      this.x += paddleSpeed;
    }
  }

  display() {
    rect(this.x, this.y, this.width, this.height);
  }
}