import * as u from './utils.js';

const Background = {}

Background.imgs = [];
Background.update = function () {

    this.x += this.stepX;
    this.y += this.stepY;

    this.x %= this.currentImage.width;
    this.y %= this.currentImage.height;

}
Background.draw = function (p) {

    let {width, height} = p;

    p.push();
    p.translate(-this.x, -this.y);

    let imgWidth = this.currentImage.width;
    let imgHeight = this.currentImage.height;

    for (let i = -imgWidth; i < width + imgWidth; i += imgWidth) {
        for (let j = -imgHeight; j < height + imgHeight; j += imgHeight) {
            p.image(this.currentImage, i, j);
        }
    }
    p.pop();
}


Background.init = function (p) {
    let imageNames = [
        "stage05a.png",
        "stg3bg3.png",
        "stg4bg1.png",
        "stg4bg2.png",
        "world2.png",
        "world02.png",
        "world02b.png"
    ]
    let promises = imageNames.map(it =>
        u.loadImage(`./img/background/${it}`).then(img => {
            Background.imgs.push(img);
        })
    )

    return Promise.all(promises).then(() => {
        this.currentImage = this.imgs[Math.floor(Math.random() * this.imgs.length)];
        this.x = 0;
        this.y = 0;
        this.stepX = -1 + Math.random() * 3;
        this.stepY = -3 + Math.random() * 3;
    })
}

export {Background};