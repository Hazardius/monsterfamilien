import logoImg from "./assets/logo.png";
import logoRed from "./assets/red.png";
import shapeZombie from "./assets/zombie.json";
import backgroundXml from "./assets/background-elements-redux/Spritesheet/spritesheet_default.xml";
import backgroundImage from "./assets/background-elements-redux/Spritesheet/spritesheet_default.png";
import backgroundTopImage from "./assets/photo-elements/bergen-bryggen_1920.jpg";
import zombieXml from "./assets/kenney_tooncharacters1/Zombie/Tilesheet/character_zombie_sheet.xml";
import zombieImage from "./assets/kenney_tooncharacters1/Zombie/Tilesheet/character_zombie_sheet.png";

export default class Logo extends Phaser.Scene {
    constructor() {
        super("Logo");
    }

    init() {

    };

    preload() {
        // Load a texture atlas - with multiple images (see xml for names)
        // Or call var atlasTexture = this.textures.get('background').getFrameNames();
        this.load.atlasXML('background', backgroundImage, backgroundXml);
        this.load.atlasXML('zombie', zombieImage, zombieXml);
        this.load.json('shapes', shapeZombie);
        this.load.image('background-top', backgroundTopImage);
        this.load.image('logo', logoImg);
        this.load.image('red', logoRed);

        this.matter.world.setBounds(0, 300, 600, 600, 150)
    };

    setinteractive(o) {
        o.setInteractive();
        o.on('drag', function (pointer, dragX, dragY) {
            // Should take time into account - for slow updates:
            this.setVelocity(dragX - this.x, dragY - this.y);
        });
        this.input.setDraggable(o);
    };

    setinteractiveX(o) {
        o.setInteractive();
        o.on('drag', function (pointer, dragX, dragY) {
            // Should take time into account - for slow updates:
            this.setPosition(dragX, this.y);
        });
        this.input.setDraggable(o);
    };

    create() {
        var particles = this.add.particles('red');
        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD'
        });

        var shapes = this.cache.json.get('shapes');

        var top = 300;

        const background_top = this.add.sprite(300, 100, "background-top");
        background_top.setDisplaySize(667, 400);

        const cloud = this.add.sprite(500, 100, "background", "cloud4.png");
        this.setinteractiveX(cloud);

        const zombie = this.matter.add.sprite(400, top +200, "zombie", "fallDown", {shape: shapes.character_zombie_fallDown});
        this.setinteractive(zombie);

        const moon = this.matter.add.sprite(200, top, "background", "moon.png");
        this.setinteractive(moon);

        emitter.startFollow(zombie);

       /* logo.setInteractive();
        this.input.setDraggable(logo);

        // this.scene.start('SceneB');

        logo.on('dragstart', function (pointer) {
            this.setTint(0x00ff00);
        });

        logo.on('drag', function (pointer, dragX, dragY) {
            // Should take time into account - for slow updates:
            this.setVelocity(dragX - this.x, dragY - this.y);
//            this.x = dragX;
//            this.y = dragY;
        });

        logo.on('dragend', function (pointer) {
            this.clearTint();
        });*/

/*        this.physics.startSystem(Phaser.Physics.P2JS);
        this.physics.p2.enable([logo], true)*/
    }
}