class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/cake.png');
        this.load.image('spaceship2', './assets/cococake.png');
        this.load.image('spaceship3', './assets/pie.png');
        //this.load.image('starfield', './assets/starfield.png');
        this.load.image('counter', './assets/Counter.png');
        this.load.image('backCounter', './assets/Back_Counter.png');
        this.load.image('back', './assets/Back.png');
        this.load.image('end', './assets/Over.png');
        this.load.spritesheet('slices', './assets/slices.png', {frameWidth: 42, frameHeight: 42, startFrame: 0, endFrame: 7});
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 57, frameHeight: 54, startFrame: 0, endFrame: 3});
    }

    create() {
        //this.starfield = this.add.tileSprite(0,0,640,480,'starfield').setOrigin(0,0);
        this.back = this.add.tileSprite(0,0,640,480,'back').setOrigin(0,0);
        this.backcounter = this.add.tileSprite(0,0,640,480,'backCounter').setOrigin(0,0);
        this.counter = this.add.tileSprite(0,0,640,480,'counter').setOrigin(0,0);
        
        // green bckgr
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xffffff).setOrigin(0,0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize * 2 - borderPadding, 'rocket').setOrigin(0, 0);
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship2', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship3', 0, 10).setOrigin(0, 0);
        this.slices = this.add.sprite(game.config.width / 2, borderUISize + borderPadding * 4, "slices", 1).setScale(1.5)

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 3, first: 0}),
            frameRate: 12
        })

        this.anims.create({
            key: "slices-1",
            repeat: -1,
            frames: this.anims.generateFrameNumbers("slices", {start: 7, end: 7}),
            frameRate: 0
        })

        this.anims.create({
            key: "slices-2",
            repeat: -1,
            frames: this.anims.generateFrameNumbers("slices", {start: 6, end: 6}),
            frameRate: 0
        })

        this.anims.create({
            key: "slices-3",
            repeat: -1,
            frames: this.anims.generateFrameNumbers("slices", {start: 5, end: 5}),
            frameRate: 0
        })

        this.anims.create({
            key: "slices-4",
            repeat: -1,
            frames: this.anims.generateFrameNumbers("slices", {start: 4, end: 4}),
            frameRate: 0
        })

        this.anims.create({
            key: "slices-5",
            repeat: -1,
            frames: this.anims.generateFrameNumbers("slices", {start: 3, end: 3}),
            frameRate: 0
        })

        this.anims.create({
            key: "slices-6",
            repeat: -1,
            frames: this.anims.generateFrameNumbers("slices", {start: 2, end: 2}),
            frameRate: 0
        })

        this.anims.create({
            key: "slices-7",
            repeat: -1,
            frames: this.anims.generateFrameNumbers("slices", {start: 1, end: 1}),
            frameRate: 0
        })

        this.anims.create({
            key: "slices-8",
            repeat: -1,
            frames: this.anims.generateFrameNumbers("slices", {start: 0, end: 0}),
            frameRate: 0
        })

        // score displayed
        this.p1Score = 0;
        this.p1Slices = 0;
        let scoreConfig = {
            fontFamily: "Garamond Bold",
            fontSize: "28px",
            backgroundColor: "#facade",
            color: "#843605",
            align: "right",
            padding: {
                tom: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);
        
        // highscore
        //this.highText = this.add.text(game.config.width/2, borderUISize + borderPadding * 2, highScore, scoreConfig);

        // game over countdown
        scoreConfig.fixedWidth = 0;
        this.gameOver = false;
        this.end = this.add.tileSprite(0,0,640,480,'end').setOrigin(0,0);
        this.end.visible = false;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height - borderPadding * 2 - borderUISize, "Press (R) to Restart", scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/5, borderPadding*2 + borderUISize * 2, "You got " + this.p1Slices + " slices", scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width - borderPadding*3 - borderUISize * 3, borderPadding*2 + borderUISize * 2, "And " + this.p1Score + " points!", scoreConfig).setOrigin(0.5);
            scoreConfig.fontSize = "32px";
            scoreConfig.backgroundColor = "#fff";
            this.add.text(game.config.width/2, borderPadding + borderUISize, "GAMEOVER", scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            this.end.visible = true;
            this.countDown.visible = false;
        }, null, this);
        
        // displayed clock countdown
        let timeConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#facade",
            color: "#843605",
            align: "right",
            padding: {
                tom: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.countDown = this.add.text(game.config.width/2 + borderPadding**2 + borderUISize*2, borderUISize + borderPadding * 2, Math.ceil(this.clock.getRemainingSeconds()), timeConfig);
    }

    update() {
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
        this.scene.restart();
        }

        //this.starfield.tilePositionX -= 4;
        if(!this.gameOver){
            this.counter.tilePositionX -= 2;
            this.backcounter.tilePositionX -= 3;
            this.back.tilePositionX -= 4;
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();  
        }

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

        if(this.clock.getElapsedSeconds() >= 30) {
            this.ship01.time = true;
            this.ship02.time = true;
            this.ship03.time = true;
        }

        this.countDown.text = Math.ceil(this.clock.getRemainingSeconds());

        if(this.p1Slices != 0){
            let curSlices;
            let cakes = Math.floor(this.p1Slices / 8);
            curSlices = this.p1Slices - (8 * cakes);
            if(this.p1Slices >= 7) {
                curSlices++;
            }
            this.slices.play("slices-" + curSlices, true);
            this.slices.visible = true;
        } else {
            this.slices.visible = false;
        }
    }

    checkCollision(rocket, ship) {
        if(rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;

        let boom = this.add.sprite(ship.x, ship.y - 11, "explosion").setOrigin(0,0);
        boom.anims.play("explode");
        boom.on("animationcomplete", () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        this.p1Score += ship.points;
        this.p1Slices++;
        this.scoreLeft.text = this.p1Score;
        let soundNum = Phaser.Math.Between(1, 4);
        this.sound.play("sfx_explosion-" + soundNum);
    }
}