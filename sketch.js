import './p5/p5.js';
import './p5/p5.sound.js';
import {SoundAnalyzer} from './sound.js';
import {Game} from "./game.js";
import * as u from "./utils.js";

let p = new p5(obj => {
    window.p = obj;

    obj.preload = preload.bind(obj);
    obj.setup = setup;
    obj.draw = draw;
});


let song;
let analyzer;
let preloadSuccess = false;
let game;

function preload() {
    let p1 = u.loadSound("./audio/上海アリス幻樂団 - 明日ハレの日、ケの昨日.mp3").then((it) => {
        song = it;
        it.setVolume(0.5);
    });

    let p2 = Game.init(this);

    Promise.all([p1, p2]).then(() => {
        preloadSuccess = true;
    });
}

function setup() {

    this.createCanvas(innerWidth, innerHeight);

    analyzer = new SoundAnalyzer();

    game = new Game(this);
}

window.onStart = function onStart() {
    if (!song.isLoaded()) {
        setTimeout(() => {
            onStart();
        }, 1000);
        return;
    }
    if (!song.isPlaying()) {
        song.play();
    }
}

window.onStop = function onStop() {
    if (song.isPlaying()) {
        song.pause();
    }
}

function draw() {

    p.background("rgb(255, 255, 255)");

    if (!preloadSuccess) {
        p.textSize(50);
        p.textAlign(p.CENTER);
        p.text("Now Loading ...", p.width / 2, p.height / 2)
        return
    }


    if (song.isPlaying()) {
        analyzer.update();
        game.update();
    }

    game.draw(p);

    p.noStroke();
    p.colorMode(p.HSB, 100);

    // let {bar} = analyzer;
    // let {map, width, height} = p;

    // for (let i = 0; i < bar.length; i++) {
    //     let x = map(i, 0, bar.length, 0, width);
    //     let h = (-height + map(bar[i], 0, 4000, height, 0)) / 2;
    //
    //     p.fill(map(i, 0, bar.length, 0, 100), 80, 100);
    //     p.rect(x, height, width / bar.length, h);
    //
    // }

    p.textSize(10);
    p.textAlign(p.LEFT);

    p.fill("rgb(255, 0, 0)");
    p.text(analyzer.max, 30, 30);
    p.text(analyzer.sum, 30, 60);

}
