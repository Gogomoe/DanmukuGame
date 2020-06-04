function loadImage(url) {
    let p = window.p;
    return new Promise(function (resolve, reject) {
        p.loadImage(url, resolve, reject);
    });
}

function loadSound(url) {
    let p = window.p;
    return new Promise(function (resolve, reject) {
        p.loadSound(url, resolve, reject);
    });
}

Math.toRadian = function (a) {
    return a / 180.0 * Math.PI;
}

function randomInt(start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start);
}

function random(start, end) {
    return Math.random() * (end - start) + start;
}

function randomSign() {
    return Math.random() < 0.5 ? -1 : 1;
}

export {loadImage, loadSound, randomInt, random, randomSign}