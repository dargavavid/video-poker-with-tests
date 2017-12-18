class Card {
    constructor(value, suite, name = "") {
        this.value = value;
        this.suite = suite;
        this.name = name;
        this.isSelected = false;
    }
}

class DisplayCard extends Card {
    constructor(value, suite, name, x, y, width, height, vx = 0, vy = 0, targetX = 0, targetY = 0) {
        super(value, suite, name);
        this.originalX = x;
        this.originalY = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vx = vx;
        this.vy = vy;
    }
    render(context) {
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    move() {
        this.x += this.vx;
        this.y += this.vy;
    }
    moveToTarget() {
        this.x += vx;
        this.y += vy;
        if (this.x > this.targetX) {
            this.x = targetX;
        }
        if (this.y > this.targetY) {
            this.y = this.targetY;
        }
    }
    moveToOriginal() {
        this.x += vx * -1;
        this.y += vy * -1;
        if (this.x > this.originalX) {
            this.x = originalX;
        }
        if (this.y > this.originalY) {
            this.y = this.orignalY;
        }
    }
}