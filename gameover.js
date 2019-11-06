import { GameScene } from "./GameScene.js";
export { gameover };
import {start} from "./start.js";

var setupSceneInput;
var gameover = new Phaser.Scene("SceneC");
var cursors;

gameover.preload = function() {
  this.load.audio("youlose", "assets/sounds/sfx/interface/you_lose.ogg");

  this.load.image("gameover", "assets/interface/gameover.png");
};
gameover.create = function() {
  //console.log("SceneA");

  this.add.image(400, 300, "gameover");

  var youlose = this.sound.add("youlose");

  youlose.play();

  cursors = this.input.keyboard.createCursorKeys();




  /*if (this.sound.locked) {
    this.sound.once(
      "unlocked",
      function(soundManager) {
        setupSceneInput.call(this, theme);
      },
      this
    );
  } else {
    setupSceneInput.call(this, theme);
  }
};

setupSceneInput = function(theme) {
  this.input.once(
    "pointerup",
    function() {
      theme.stop();
      this.scene.start(GameScene);
    },
    this
  );
  */
};

gameover.update = function (){
  if(cursors.space.isDown){
    this.scene.start(start);
  }
};
