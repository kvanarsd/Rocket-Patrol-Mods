class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.notIncreased = true;
        this.time = false;
    }

    update() {
        this.x -= this.moveSpeed;

        if(this.x <= 0 - this.width) {
            this.reset();
        }

        if(this.notIncreased && this.time) {
            this.moveSpeed += 2;
            this.notIncreased = false;
        }
    }

    reset() {
        this.x = game.config.width;
    }
}