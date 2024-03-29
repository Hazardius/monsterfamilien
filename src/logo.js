import logoImg from "./assets/logo.png";
import logoRed from "./assets/red.png";
import shapeZombie from "./assets/zombie.json";
import fogImage from './assets/fog2.png'
import backgroundXml from "./assets/background-elements-redux/Spritesheet/spritesheet_default.xml";
import backgroundImage from "./assets/background-elements-redux/Spritesheet/spritesheet_default.png";
import backgroundTopImage from "./assets/photo-elements/bergen-bryggen_1920.jpg";
import bossnettetImage from "./assets/photo-elements/bossnettet.jpg";
import soilLayerImage from "./assets/photo-elements/soil-layer_1280.png";
import trashBagImage from "./assets/photo-elements/clear-trash-bag.png";
import zombieXml from "./assets/kenney_tooncharacters1/Zombie/Tilesheet/character_zombie_sheet.xml";
import zombieImage from "./assets/kenney_tooncharacters1/Zombie/Tilesheet/character_zombie_sheet.png";
import backgroundForest from "./assets/background-elements-redux/Backgrounds/backgroundForest.png";
import mixedIcon from './assets/mixed_icon.png';
import paperIcon from './assets/paper_icon.png';
import plasticIcon from './assets/plastic_icon.png';

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
        this.load.image('bossnettet', bossnettetImage);
        this.load.image('trash-bag', trashBagImage);
        this.load.image('logo', logoImg);
        this.load.image('red', logoRed);
        this.load.image('soil-layer', soilLayerImage)
        this.load.image('backgroundForest', backgroundForest);
        this.load.image('fog', fogImage);
        this.load.image('mixedIcon', mixedIcon);
        this.load.image('paperIcon', paperIcon);
        this.load.image('plasticIcon', plasticIcon);

        this.matter.world.setBounds(0, 300, 600, 600, 300)
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

    move_around(zombie)
    {
        if (zombie.x < 125)
        {
            zombie.direction = 1;
        } else if (zombie.x > 475) {
            zombie.direction = -1;
        } else if (Phaser.Math.Between(0, 1000) > 995) {
            zombie.direction = -zombie.direction;
        }
        zombie.setVelocity(zombie.direction * 0.5);
    }

    straighten_up(game_object)
    {
        if (game_object.angle < -5)
        {
            game_object.angle += 1;
        } else if (game_object.angle > 5) {
            game_object.angle -= 1;
        }
    }

    update(time, delta)
    {
        if (this.zombie.y > 750)
        {
            if (this.zombiestate != 1)
            {
                this.zombie.setTexture("zombie", "side");
                this.zombiestate = 1;
            } else if (this.zombie.y > 850 && this.zombie.y <= 870) {
                this.move_around(this.zombie);
            }
        } else {
            if (this.zombiestate != 2)
            {
                this.zombie.setTexture("zombie", "fallDown");
                this.zombiestate = 2;
            }
        }
        this.straighten_up(this.zombie);
    }
        /*
            (Min(100, T / 30) +
            Max(0,Min(100, (((G/T) - 0.2) / 0.8)*100 ))) / 2;
        */

    magicFormula(rest, plast, papir)
    {
        var total = rest + plast + papir;

        var restscore = Math.min(100, (total*100) / 30);
        var ratio = (((rest / total) - 0.2) / 0.8) * 100;

        return (restscore + ratio) / 2;
    }

    create() {
        var shapes = this.cache.json.get('shapes');

        var top = 600;

        const background = this.add.sprite(300, top + 100, "backgroundForest");
        background.setDisplaySize(600, 600);
        // background.tint = 0x909090;

        var particles = this.add.particles('red');
        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD'
        });

        const cloud = this.add.sprite(500, 100, "background", "cloud4.png");
        this.setinteractiveX(cloud);

        this.zombie = this.matter.add.sprite(400, top - 200, "zombie", "fallDown", {shape: shapes.character_zombie_side});
        this.setinteractive(this.zombie);
        this.zombiestate = 1;
        this.zombie.direction = 1;

        const moon = this.matter.add.sprite(200, top, "background", "moon.png", { shape: shapes.moon });
        this.setinteractive(moon);

        const decoration = this.add.image(50, top + 300, "background", "cactus1.png").setDepth(3);
        this.setinteractiveX(decoration);

        const decoration2 = this.add.image(550, top + 300, "background", "treeDead.png").setDepth(3);
        this.setinteractiveX(decoration2);

        const trash = [];

        emitter.startFollow(this.zombie);

        const fog = this.add.sprite(300, 0, "fog");

//        this.add.tween(fog).to({x: 300, y: top + 600}, 1000, Phaser.Easing.Quadratic.InOut, true);

        const background_top = this.add.sprite(300, 120, "background-top");
        background_top.setDisplaySize(600, 360);
        background_top.tint = 0x808080;

        const trash_pipe_mixed = this.add.sprite(300, 250, "background", "tower.png").setDepth(2);
        trash_pipe_mixed.tint = 0x00FF00;
        trash_pipe_mixed.setDisplaySize(75, 400);
        const trash_can_mixed = this.add.sprite(300, 200, "bossnettet").setDepth(2);
        trash_can_mixed.tint = 0x00FF00;
        trash_can_mixed.setDisplaySize(75, 133);
        const icon_mixed = this.add.sprite(305, 220, "mixedIcon").setDepth(2);
        icon_mixed.setDisplaySize(55, 55);
        const trash_pipe_paper = this.add.sprite(400, 250, "background", "tower.png").setDepth(2);
        trash_pipe_paper.tint = 0x0000FF;
        trash_pipe_paper.setDisplaySize(75, 400);
        const trash_can_paper = this.add.sprite(400, 200, "bossnettet").setDepth(2);
        trash_can_paper.tint = 0x0000FF;
        trash_can_paper.setDisplaySize(75, 133);
        const icon_paper = this.add.sprite(405, 220, "paperIcon").setDepth(2);
        icon_paper.setDisplaySize(55, 55);
        const trash_pipe_plastic = this.add.sprite(500, 250, "background", "tower.png").setDepth(2);
        trash_pipe_plastic.tint = 0xFFFFFF;
        trash_pipe_plastic.setDisplaySize(75, 400);
        const trash_can_plastic = this.add.sprite(500, 200, "bossnettet").setDepth(2);
        trash_can_plastic.tint = 0xFFFFFF;
        trash_can_plastic.setDisplaySize(75, 133);
        const icon_plastic = this.add.sprite(505, 220, "plasticIcon").setDepth(2);
        icon_plastic.setDisplaySize(55, 55);

        this.mixed = 0;
        this.paper = 0;
        this.plastic = 0;

        let lastTime = 0;
        this.input.on("pointerdown", (pointer) => {
            var changed = false;

            let clickDelay = this.time.now - lastTime;
            lastTime = this.time.now;
            if(clickDelay > 350) {
                if (pointer.y < 250 && pointer.y > 150)
                {
                    if (pointer.x < 525)
                    {
                        if (pointer.x < 425)
                        {
                            if (pointer.x < 325 && pointer.x > 275)
                            {
                                var new_mixed = this.matter.add.sprite(300, 350, "trash-bag", null, {shape: shapes["clear-trash-bag"]}).setDepth(1);
                                new_mixed.tint = 0x00FF00;
                                new_mixed.setDisplaySize(50, 50);
                                new_mixed.setRotation(Phaser.Math.Between(0, 360));
                                trash.push(new_mixed);
                                this.mixed++;
                                changed = true;
                            } else if (pointer.x > 375) {
                                var new_paper = this.matter.add.sprite(400, 350, "trash-bag", null, {shape: shapes["clear-trash-bag"]}).setDepth(1);
                                new_paper.tint = 0x0000FF;
                                new_paper.setDisplaySize(50, 50);
                                new_paper.setRotation(Phaser.Math.Between(0, 360));
                                trash.push(new_paper);
                                this.paper++;
                                changed = true;
                            }
                        } else if (pointer.x > 475) {
                            var new_plastic = this.matter.add.sprite(500, 350, "trash-bag", null, {shape: shapes["clear-trash-bag"]}).setDepth(1);
                            new_plastic.tint = 0xFFFFFF;
                            new_plastic.setDisplaySize(50, 50);
                            new_plastic.setRotation(Phaser.Math.Between(0, 360));
                            trash.push(new_plastic);
                            this.plastic++;
                            changed = true;
                        }
                    }
                }
            }

            if (changed)
            {
                var score = this.magicFormula(this.mixed, this.plastic, this.paper);
                this.tweens.add({
                    targets: fog,
                    y: score*6,
                    duration: 1000,
                    ease: 'Linear'
                });
            }
        });

        const soil_layer = this.add.sprite(300, 300, "soil-layer");
        soil_layer.setDisplaySize(800, 200).setDepth(10);

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
