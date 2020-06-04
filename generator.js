import {Bullet, BulletType} from "./bullet.js";
import {ConstSpeedController} from "./controller.js";

class Generator {

    generate(arr) {

    }

}

class RoundGenerator {

    constructor(lines, x, y, angle = 0) {
        this.lines = lines;
        this.angle = angle;
        this.x = x;
        this.y = y;
        this.updater = () => {
        };
        this.updateFrame = 1;
        this.bulletBuilder = [];
        this.buildCount = 0;
    }

    generate(arr, g) {
        if (g.frame % this.updateFrame !== 0) {
            return;
        }

        this.updater();

        let angle = this.angle;
        for (let i = 0; i < this.lines; i++) {
            let b = this.bulletBuilder[(this.buildCount++) % this.bulletBuilder.length].build();
            b.x = this.x;
            b.y = this.y;
            b.angle = angle;
            arr.push(b);

            angle += 360.0 / this.lines;
        }
    }

}

export {Generator, RoundGenerator}