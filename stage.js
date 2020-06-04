import {RoundGenerator} from "./generator.js";
import {BulletBuilder} from "./bullet.js";
import {ConstSpeedController} from "./controller.js";
import {randomInt, random, randomSign} from "./utils.js";

class Stage {
    constructor(g) {
        this.g = g;
        this.updateFrame = 0;
    }

    update() {
        if (this.g.frame - this.updateFrame >= 20 * 60) {
            this.updateFrame = this.g.frame;
            this.g.generator = [];
        }
        if (this.g.frame - this.updateFrame >= 3 * 60 && this.g.generator.length === 0) {
            this.switchStage();
        }
    }

    switchStage() {
        let gen = this.roundGenerator();
        this.g.generator.push(gen);
    }

    roundGenerator() {
        let line = randomInt(1, 6);

        let roundGenerator = new RoundGenerator(
            line, this.g.width / 2, 100, 0
        );
        let builder = new BulletBuilder().changeType();
        builder.controller = new ConstSpeedController(3);

        let colorRandom = randomInt(1, 10);
        if (colorRandom <= 2) {
            roundGenerator.bulletBuilder.push(builder.changeColor())
        } else if (colorRandom <= 4) {
            roundGenerator.bulletBuilder.push(
                builder.changeColor(), builder.changeColor()
            )
        } else if (colorRandom <= 6) {
            roundGenerator.bulletBuilder.push(
                builder.changeColor(), builder.changeColor(), builder.changeColor()
            )
        } else if (colorRandom <= 9) {
            for (let i = 0; i < line; i++) {
                roundGenerator.bulletBuilder.push(builder.changeColor());
            }
        } else {
            roundGenerator.bulletBuilder.push(builder.randomColor())
        }

        let accRandom = random(0.5, 1.8) * randomSign();
        let speedRandom = random(0.5, 2) * randomSign();

        if (Math.abs(accRandom) < 0.8) {
            accRandom = 0;
            speedRandom *= random(1, 4);
        }

        roundGenerator.updater = function () {
            if (this.speedAngle === undefined) {
                this.speedAngle = speedRandom;
            } else {
                this.speedAngle += accRandom;
                this.angle += this.speedAngle;
            }
        };
        roundGenerator.updateFrame = 5;

        return roundGenerator;
    }

}

export {Stage}