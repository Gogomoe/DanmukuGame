import * as u from "./utils.js";

class Player {

    constructor() {
        this.x = 0;
        this.y = 0;
        this.currentImageIndex = 0;
        this.lastUpdateFrame = 0;
    }

    update(g) {
        if (g.frame - this.lastUpdateFrame >= 20) {
            this.lastUpdateFrame = g.frame;
            this.currentImageIndex++;
            this.currentImageIndex %= Player.imgs.length;
        }

        let p = g.p;
        let xMove = 0, yMove = 0;
        if (p.keyIsDown(p.LEFT_ARROW)) {
            xMove--;
        }
        if (p.keyIsDown(p.RIGHT_ARROW)) {
            xMove++;
        }
        if (p.keyIsDown(p.UP_ARROW)) {
            yMove--;
        }
        if (p.keyIsDown(p.DOWN_ARROW)) {
            yMove++;
        }

        let speed = 3;
        if (p.keyIsDown(p.SHIFT)) {
            speed = 1.5;
        }
        let newX = this.x + xMove * speed;
        let newY = this.y + yMove * speed;

        if (newX >= 10 && newX <= g.width - 10) {
            this.x = newX;
        }
        if (newY >= 10 && newY <= g.height - 10) {
            this.y = newY;
        }


    }

    draw(p) {
        let img = Player.imgs[this.currentImageIndex];
        p.image(img, this.x - img.width / 2, this.y - img.height / 2);
    }

}

Player.init = function (p) {
    return u.loadImage("./img/player/pl00.png").then(source => {
        let imgs = [];
        for (let i = 0; i < 3; i++) {
            let img = p.createImage(32, 48);
            img.copy(source, 0, 48 * i, 32, 48, 0, 0, 32, 48);
            imgs.push(img);
        }
        Player.imgs = imgs;
    });
}

export {Player}