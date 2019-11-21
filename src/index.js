import Phaser from "phaser";
import Logo from "./logo.js";


const config = {
  type: Phaser.AUTO,
  backgroundColor: '#CFEFFC',
  physics: {
    default: 'matter',
    matter: {
        debug: false,
        gravity: { y: 0.3 },
        setBounds: true
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 600,
    height: 1000
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
