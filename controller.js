class Controller {
    update(b) {

    }
}

class ConstSpeedController {

    constructor(speed) {
        this.speed = speed;
    }

    update(b) {
        let addX = Math.cos(Math.toRadian(b.angle)) * this.speed;
        let addY = Math.sin(Math.toRadian(b.angle)) * this.speed;

        b.x += addX;
        b.y += addY;
    }
}

class ConstAccelerationController {

    constructor(acceleration, speed = 0) {
        this.acceleration = acceleration;
        this.speed = speed;
    }

    update(b) {
        this.speed += this.acceleration;

        let addX = Math.cos(Math.toRadian(b.angle)) * this.speed;
        let addY = Math.sin(Math.toRadian(b.angle)) * this.speed;

        b.x += addX;
        b.y += addY;
    }
}

export {Controller, ConstSpeedController, ConstAccelerationController};