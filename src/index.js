import Phaser from "phaser";
import Logo from "./logo.js";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: 'matter',
    matter: {
        debug: true,
        gravity: { y: 0.3 },
        setBounds: true
    }
  },
  scene: [
    Logo
  ]
};

const game = new Phaser.Game(config);

/*  this.tweens.add({
    targets: logo,
    y: 450,
    duration: 2000,
    ease: "Power2",
    yoyo: true,
    loop: -1
  });*/
