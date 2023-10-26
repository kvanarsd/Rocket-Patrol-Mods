/*
Cake Rush by Katrina VanArsdale
The mods took approximately 6 hours to do? (I didn't keep track so I'm not really sure)

Mods:
New background tilesheet(1)
Parallax Scrolling(3)
Speed Increase(1)
Control Rocket after launch(1)
4 new explosion sounds and randomized(3)
Time remaining displayed(3)
Title Screen(3)

My own mod ideas:
End Screen - displays total points and total slices (3)
    Justification: Very similar to adding a title screen which is worth 3 points.
    As well as displaying final score and covers the gameplay.
Cake Animation - Cake fills up with slices as you get more slices (5)
    Justification: Created a new animation and new type of score to keep track of.
    Made sure that the animation loops once it's a whole cake.
*/

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config)

// ui sizes 
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR, keyLEFT, keyRIGHT;