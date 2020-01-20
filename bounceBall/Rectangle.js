class Rectangle {
    constructor(x, y, height, width) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
    update() { }
    move() { }
    display() {
        rect(this.x, this.y, this.width, this.height);
    }
}