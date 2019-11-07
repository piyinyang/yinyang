import { GameScene } from "./GameScene.js";
import { start } from "./start.js";
import { gameover } from "./gameover.js";

var config = {
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 800 },
      debug: false
    }
  },
  // Suporte a tela cheia
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "game",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
  },
  // VÃÂ¡rias cenas, em sequÃÂªncia
  scene: [start, GameScene, gameover]
};

var game = new Phaser.Game(config);
