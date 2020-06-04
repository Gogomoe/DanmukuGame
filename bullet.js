import * as u from "./utils.js";
import {ConstSpeedController} from "./controller.js";
import {randomInt} from "./utils.js";

class BulletType {
    constructor(imgs) {
        this.imgs = imgs;
    }
}

BulletType.init = function (p) {

    let p1 = u.loadImage("./img/bullet/bullet1.png").then(source => {
        let imgs1 = [];
        for (let i = 0; i < 16; i++) {
            let img = p.createImage(16, 16);
            img.copy(source, 16 * i, 16, 16, 16, 0, 0, 16, 16);
            imgs1.push(img);
        }
        BulletType.SHARP_BLT = new BulletType(imgs1);

        let imgs2 = [];
        for (let i = 0; i < 16; i++) {
            let img = p.createImage(16, 16);
            img.copy(source, 16 * i, 32, 16, 16, 0, 0, 16, 16);
            imgs2.push(img);
        }
        BulletType.LIGHT_BLT = new BulletType(imgs2);

        let imgs3 = [];
        for (let i = 0; i < 16; i++) {
            let img = p.createImage(16, 16);
            img.copy(source, 16 * i, 48, 16, 16, 0, 0, 16, 16);
            imgs3.push(img);
        }
        BulletType.SMALL_BLT = new BulletType(imgs3);

        let imgs4 = [];
        for (let i = 0; i < 16; i++) {
            let img = p.createImage(16, 16);
            img.copy(source, 16 * i, 112, 16, 16, 0, 0, 16, 16);
            imgs4.push(img);
        }
        BulletType.CARD = new BulletType(imgs4);

        let imgs5 = [];
        for (let i = 0; i < 16; i++) {
            let img = p.createImage(16, 16);
            img.copy(source, 16 * i, 128, 16, 16, 0, 0, 16, 16);
            imgs5.push(img);
        }
        BulletType.BLT_BLT = new BulletType(imgs5);

        let imgs6 = [];
        for (let i = 0; i < 16; i++) {
            let img = p.createImage(16, 16);
            img.copy(source, 16 * i, 160, 16, 16, 0, 0, 16, 16);
            imgs6.push(img);
        }
        BulletType.SMALL_STAR = new BulletType(imgs6);
    })

    let p2 = u.loadImage("./img/bullet/bullet2.png").then(source => {
        let imgs1 = [];
        for (let i = 0; i < 8; i++) {
            let img = p.createImage(32, 32);
            img.copy(source, 32 * i, 0, 32, 32, 0, 0, 32, 32);
            imgs1.push(img);
        }
        BulletType.MID_STAR = new BulletType(imgs1);

        let imgs2 = [];
        for (let i = 0; i < 8; i++) {
            let img = p.createImage(32, 32);
            img.copy(source, 32 * i, 64, 32, 32, 0, 0, 32, 32);
            imgs2.push(img);
        }
        BulletType.BUTTERFLY = new BulletType(imgs2);
    })

    return Promise.all([p1, p2]);
}

class Bullet {

    constructor(type, color, controller) {
        this.type = type;
        this.color = color;
        this.controller = controller;
        this.x = 0;
        this.y = 0;
        this.angle = 0;
    }

    update(g) {
        this.controller.update(this);
    }

    draw(p) {
        p.push();

        p.translate(this.x, this.y);
        p.angleMode(p.DEGREES);
        p.rotate(this.angle + 90);

        let img = this.type.imgs[this.color];
        p.image(img, -img.width / 2, -img.height / 2);

        p.pop();
    }

}

class BulletBuilder {
    constructor(type = BulletType.MID_STAR,
                color = 0,
                controller = new ConstSpeedController(3)) {
        this.type = type;
        this.color = color;
        this.controller = controller;
    }

    beforeBuild() {
    }

    build() {
        this.beforeBuild();
        return new Bullet(this.type, this.color, this.controller);
    }

    changeColor() {
        let color = randomInt(0, this.type.imgs.length - 1);
        return new BulletBuilder(this.type, color, this.controller);
    }

    changeType() {
        let allTypes = [
            BulletType.MID_STAR, BulletType.BLT_BLT, BulletType.BUTTERFLY, BulletType.CARD,
            BulletType.LIGHT_BLT, BulletType.SHARP_BLT, BulletType.SMALL_BLT, BulletType.SMALL_STAR
        ]
        let type = allTypes[randomInt(0, allTypes.length - 1)];
        return new BulletBuilder(type, this.color, this.controller);
    }

    randomColor() {
        let builder = new BulletBuilder(this.type, this.color, this.controller);
        builder.beforeBuild = function () {
            this.color = randomInt(0, this.type.imgs.length - 1);
        }
        return builder;
    }
}

export {BulletType, Bullet, BulletBuilder};