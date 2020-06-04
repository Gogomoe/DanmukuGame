import {BulletType} from "./bullet.js";
import {Background} from "./background.js";
import {Player} from "./player.js";
import {Stage} from "./stage.js";

class Game {
    constructor(p) {
        this.p = p;

        this.frame = 0;
        this.width = p.width;
        this.height = p.height;

        this.player = new Player();
        this.player.y = this.height - 100;
        this.player.x = this.width / 2;

        this.generator = [];
        this.bullet = [];

        this.stage = new Stage(this);
    }

    update() {
        Background.update(this);
        this.player.update(this);

        this.stage.update();

        this.generator.forEach(it => {
            it.generate(this.bullet, this);
        });

        this.bullet = this.bullet.filter(b => {
            return b.x >= -100 && b.x <= this.width + 100 && b.y >= -100 && b.y <= this.height + 100
        });
        this.bullet.forEach(it => it.update(this));
        this.frame++;
    }

    draw(p) {
        Background.draw(p);
        this.player.draw(p);
        this.bullet.forEach(it => it.draw(p));
    }
}

Game.init = function (p) {
    let p2 = BulletType.init(p);
    let p3 = Background.init(p);
    let p4 = Player.init(p);

    return Promise.all([p2, p3, p4]);
}

export {Game}