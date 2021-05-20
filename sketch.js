// This code is very limited on comments on purpose. The variable names are not descriptive and badly named
// The reason is to make it a weee bit more difficult to cheat a score into the highscore list. 

// Name of the player - for the Highscore list
let nm;
if (window.localStorage.PlayerName !== null || window.localStorage.PlayerName !== "") {
	nm = window.localStorage.PlayerName;
} else {
	nm = "Player";
}

let ta = 20;
let ma = 120;
const cs = 400;
let ps = 10;
let ph = 0;
let sc = .4;
let Score = 0;
let hs;
let hst;
let f;
const kw = 60;
const kh = 12;
class U {

	constructor(y, x) {
		this.x = x;
		this.y = y;
	}

	getW() {
		return kw;
	}

	getH() {
		return kh;
	}

	move() {
		if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && this.x > 0) {
			this.x -= ps;
		}
		else if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && this.x + this.getW() < cs) {
			this.x += ps;
		}
	}

	display() {
		rect(this.x, this.y, this.getW(), this.getH());
	}
}

const k = new U(cs - 20, (cs / 2 - 40));
class Q {

	constructor(x, y, r, vx, vy) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.sv = vx;
		this.vv = vy;
		this.sc = sc;
	}

	update() {

		// Check for side collisions
		if (this.sv > 0 && this.x + this.r >= cs || this.sv < 0 && this.x - this.r <= 0) {
			this.sv *= -1;
		}
		// ceiling collision
		if (this.vv < 0 && this.y - this.r <= 0) {
			this.vv *= -1;
		}
		if (this.vv > 0 && this.y + this.r >= height) {
			// Game Over
			return false;
		}

		// Check for side collisions
		if (this.x + this.r + this.sv > k.x &&
			this.x + this.sv < k.x + k.getW() &&
			this.y + this.r > k.y &&
			this.y < k.y + k.getH()) {
			this.sv *= -1;
		}

		// Check for top / bottom collisions
		if (this.x + this.r > k.x &&
			this.x < k.x + k.getW() &&
			this.y + this.r + this.vv > k.y &&
			this.y + this.vv < k.y + k.getH()) {
			this.vv *= -1;

			// Is this a paddle collision?
			if (k instanceof U) {
				Score += 10;
				ph += 1;

				// Increase ball speed, random on x OR y by 0,4
				let xOrY = random(-1, 1)
				if (xOrY < 0) {
					if (this.sv > 0) {
						this.sv += this.sc;
					}
					else {
						this.sv -= this.sc;
					}
				}
				else {
					if (this.vv > 0) {
						this.vv += this.sc;
					}
					else {
						this.vv -= this.sc;
					}
				}
			}
		}
	}

	move() {
		this.x += this.sv;
		this.y += this.vv;
	}

	display() {
		ellipse(this.x, this.y, this.r * 2, this.r * 2);
	}
}

const z = new Q(cs / 2 / 2, 20, 5, (Math.random() < 0.5 ? -2 : 2), (Math.random() < 0.5 ? -2 : 2));


if (window.localStorage.HighScore !== null && window.localStorage.HighScore >= 0) {
	f = window.localStorage.HighScore;
}
else {
	window.localStorage.HighScore = 0;
	f = 0;
}


// Get current highscores
function preload() {
	// let url = '../gamehandler/gethighscores.php?gameid=1';
	// hs = loadJSON(url);
}

function setupGameBoard() {
	let canvas = createCanvas(cs, cs);
	canvas.position(windowWidth / 2 - cs / 2, ma);

	// Game title banner
	textAlign(CENTER);
	let pageTitle = createDiv('Paddle Frenzy');
	pageTitle.class('title');
	pageTitle.position(windowWidth / 2 - cs / 2, ta);

	// Insructions (left side of gameplay canvas)
	let howToPlay = createDiv(
		'<ul><li>Play with left and right arrows or A & D</li>' +
		'<li>The ball travels a little faster after every paddle touch</li>' +
		'<li>Now go get that highscore!</li><br>' +
		'<li>Press ENTER to reload</li></ul>');
	howToPlay.class('instructions');
	howToPlay.position(100, ma);

	// If higscore list is loaded display the data
	if (hs !== null) {
		let Highscores = createDiv();
		Highscores.class('Highscores');
		Highscores.position(windowWidth / 2 + cs / 2 + 100, ma);
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

	// Playername input field
	let CurrentPlayer = createElement('h3', nm);
	CurrentPlayer.position(windowWidth / 2 - cs / 2, ma + cs + 5);

	let nameInput = createElement('form', '<input type="text" id="textbox" style="width: 100;" placeholder="Enter your Name"><button id="submit">Confirm Name</button>');
	nameInput.position(windowWidth / 2 - cs / 2, ma + cs + 55);

	document.getElementById('submit').addEventListener('click', function () {
		window.localStorage.PlayerName = document.getElementById('textbox').value;
	});
}

function setup() {
	setupGameBoard();
}

function draw() {
	background(0);
	stroke(255);

	z.move();
	z.display();
	if (z.update() == false) {
		gameOver();
	}

	k.move();
	k.display();
	textSize(20);
	fill(255);
	if (Score > 1000) {
		alert("No cheating!");
	}
	textAlign(LEFT);
	text('Score: ' + Score, 20, 30);
	textAlign(RIGHT);
	text('HighScore: ' + f, cs - 20, 30);
}

function gameOver() {
	background(255, 0, 0);
	textAlign(CENTER);
	text('Game Over!', cs / 2, height / 2 - 20);
	if (Score > f) {
		text('New HighScore!', cs / 2, height / 2 + 20);
	}
	if (Score > f) {
		f = Score
		window.localStorage.HighScore = f;
		h();
	}
	noLoop();

	let button = createButton('New Game');
	button.position(windowWidth / 2 - button.width / 2, ma + cs - 100);
	button.mousePressed(e => {
		location.reload();
	});
}



function keyTyped() {
	if (key === 'r') {
		console.log('r');
		window.localStorage.HighScore = 0;
	}
}

function keyPressed() {
	if (keyCode === ENTER) {
		location.reload();
	}
}

function h() {
	const y = k.getW
	const url = '../gamehandler/highscoreinsert.php?ga=1&is=' + f + '&sc=' + Score + '&ph=' + ph + '&pn=' + nm + '&y=' + y;
	const Param = {
		method: "GET"
	};
	fetch(url, Param)
		.then(res => { console.log(res) })
		.catch(error => console.log(JSON.parse(JSON.stringify(error))))
}

