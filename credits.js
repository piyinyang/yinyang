import { GameScene } from "./GameScene.js";
export { credits }

var credits = new Phaser.Scene("SceneD");

credits.preload = function (){
    this.load.image("creditsimage", "assets/interface/TelaFinal.png")
};

credits.create = function (){
    this.add.image(400, 300, "creditsimage");
};
