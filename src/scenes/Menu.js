class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio("sfx_select", "./assets/blip_select12.wav");
        this.load.audio('sfx_explosion-1', './assets/jump.wav');
        this.load.audio('sfx_explosion-2', './assets/jump2.wav');
        this.load.audio('sfx_explosion-3', './assets/jump3.wav');
        this.load.audio('sfx_explosion-4', './assets/jump4.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('bckg', './assets/Menu.png');
    }

    create() {
        let menuConfig = {
            fontFamily: "Garamond Bold",
            fontSize: "32px",
            backgroundColor: "#fff",
            color: "#cc2570",
            align: "right",
            padding: {
                tom: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        this.bckg = this.add.tileSprite(0,0,640,480,'bckg').setOrigin(0,0);

        this.add.text(game.config.width/2, borderPadding + borderUISize, "CAKE RUSH", menuConfig).setOrigin(0.5);
        menuConfig.fontSize = "24px";
        this.add.text(game.config.width/2, borderPadding*2 + borderUISize *2, "Use <--> arrows to move & (F) to fire", menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = "#facade";
        menuConfig.Color = "#000";
        this.add.text(game.config.width/2, borderPadding*3 + borderUISize *3, "Press <- for Novice or -> for Expert", menuConfig).setOrigin(0.5);
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }

            this.sound.play("sfx_select");
            this.scene.start("playScene");
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }

            this.sound.play("sfx_select");
            this.scene.start("playScene");
        }
    }
}