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