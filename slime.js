import { topLayer, topLayer2, topLayer3, player, spike} from "./GameScene.js";

export default class Slime {
    // Cria a classe do slime
    
    constructor(scene, x, y, slimepoint){
        this.scene = scene;
        const anims = scene.anims;

        //          ANIMACOES DO SLIME

  anims.create({
    key: 'slime-idle',
    frames: this.anims.generateFrameNumbers('slimesheet', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: 'slime-move',
    frames: this.anims.generateFrameNumbers('slimesheet', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: 'slime-attack',
    frames: this.anims.generateFrameNumbers('slimesheet', { start: 8, end: 12 }),
    frameRate: 10,
  });
  anims.create({
    key: 'slime-hurt',
    frames: this.anims.generateFrameNumbers('slimesheet', { start: 13, end: 16 }),
    frameRate: 15
  });
  anims.create({
    key: 'slime-die',
    frames: this.anims.generateFrameNumbers('slimesheet', { start: 17, end: 20 }),
    frameRate: 10
  });

  this.sprite = scene.physics.add.sprite( x, y, "slime");
  this.sprite.setSize(20,20, true).setOffset(5,4);
  this.sprite.setBounce(0);
  this.sprite.setCollideWorldBounds(true);
  this.sprite.setVelocityX(-100);
    }
  
  update() {
    // VARIAVEIS 
        this.slimepoint;
        this.slimeposition;
        this.slimeX = this.body.position.x;
        this.slimeY = this.body.position.y;
        this.slimeguard = this.slimeX - this.slimepoint;
        this.playerX = this.GameScene.player.body.x;
        this.playerY = this.GameScene.player.body.y;
        this.player2X = this.GameScene.player2.body.x;
        this.player2Y = this.GameScene.player2.body.y;
        this.slime_P1 = this.slimeX - this.playerX;
        this.slime_P1_Y = this.playerY - this.slimeY;
        this.slime_P2 = this.slimeX - this.player2X;
        this.slime_P2_Y = this.player2Y - this.slimeY;

        if (
          this.sprite.anims.getCurrentKey() === "slime-hurt" &&
          this.sprite.anims.getProgress("slime-hurt") < 1 && this.slimeposition === "right"
        ) {
          this.sprite.setSize(20, 20, true).setOffset(0, 4);
          this.sprite.setTint(0xff0000);
        } else if (
          this.sprite.anims.getCurrentKey() === "slime-hurt" &&
          this.sprite.anims.getProgress("slime-hurt") < 1 && this.slimeposition === "left"
        ) {
          this.sprite.setSize(20, 20, true).setOffset(0, 4);
          this.sprite.setTint(0xff0000);
        } else if (
          this.sprite.anims.getCurrentKey() === "slime-hurt" &&
          this.sprite.anims.getProgress("slime-hurt") === 1
        ) {
          this.sprite.setVelocityX(0);
          this.sprite.setSize(20, 20, true).setOffset(0, 4);
          this.sprite.clearTint();
          this.sprite.anims.play("slime-idle", true);
      
          
        } else if (this.sprite.anims.getCurrentKey() === 'slime-attack'
        && this.sprite.anims.getProgress('slime-attack') < 1 && this.slimeposition === 'left'){
            this.sprite.setSize(30,20).setOffset(-8,4);
      
        } else if (this.sprite.anims.getCurrentKey() === 'slime-attack'
        && this.sprite.anims.getProgress('slime-attack') === 1 && this.slimeposition==="left"){
            this.sprite.anims.play('slime-idle', true);
            this.sprite.setSize(20,20).setOffset(0,4);
          
        } else if (this.sprite.anims.getCurrentKey() === 'slime-attack'
        && this.sprite.anims.getProgress('slime-attack') < 1 && this.slimeposition === 'right'){
            this.sprite.setSize(30,20).setOffset(8,4);
      
        } else if (this.sprite.anims.getCurrentKey() === 'slime-attack'
        && this.sprite.anims.getProgress('slime-attack') === 1 && this.slimeposition==="right"){
            this.sprite.anims.play('slime-idle', true);
            this.sprite.setSize(20,20).setOffset(0,4);
        
        //      CONDICIONAIS PARA COMPORTAMENTO/ANIMACAO P/ PLAYER 1
        
        } else if (this.slime_P1 < 15 && this.slime_P1 > 0 && this.slime_P1_Y > -50){
            this.sprite.setVelocityX(0);
            this.sprite.setFlipX(false);
            this.sprite.anims.play('slime-attack', true);
            this.slimeposition = 'left';
        } else if (this.slime_P1 > -20 && this.slime_P1 < 0 && this.slime_P1_Y > -50){
            this.sprite.setVelocityX(0);
            this.sprite.setFlipX(true);
            this.sprite.anims.play('slime-attack', true);
            this.slimeposition = 'right';
        } else if (this.slime_P1 < 150 && this.slime_P1 > 0 && this.slime_P1_Y > -50){
            this.sprite.setVelocityX(-150);
            this.sprite.setSize(20,20, true).setOffset(7,4);
            this.sprite.setFlipX(false);
            this.sprite.anims.play('slime-move', true);
            this.slimeposition = 'left';
        } else if (this.slime_P1 > -150 && this.slime_P1 < 0 && this.slime_P1_Y > -50){
            this.sprite.setVelocityX(150);
            this.sprite.setSize(20,20, true).setOffset(7,4);
            this.sprite.setFlipX(true);
            this.sprite.anims.play('slime-move', true);
            this.slimeposition = 'right';
        }
      
        //      CONDICIONAIS PARA COMPORTAMENTO/ANIMACAO P/ PLAYER 2
        
      else if (this.slime_P2 < 15 && this.slime_P2 > 0 && this.slime_P2_Y > -50){
        this.sprite.setVelocityX(0);
        this.sprite.setFlipX(false);
        this.sprite.anims.play('slime-attack', true);
        this.slimeposition = 'left';
      } else if (this.slime_P2 > -20 && this.slime_P2 < 0 && this.slime_P2_Y > -50){
        this.sprite.setVelocityX(0);
        this.sprite.setFlipX(true);
        this.sprite.anims.play('slime-attack', true);
        this.slimeposition = 'right';
      } else if (this.slime_P2 < 150 && this.slime_P2 > 0 && this.slime_P2_Y > -50){
        this.sprite.setVelocityX(-150);
        this.sprite.setSize(20,20, true).setOffset(7,4);
        this.sprite.setFlipX(false);
        this.sprite.anims.play('slime-move', true);
        this.slimeposition = 'left';
      } else if (this.slime_P2 > -150 && this.slime_P2 < 0 && this.slime_P2_Y > -50){
        this.sprite.setVelocityX(150);
        this.sprite.setSize(20,20, true).setOffset(7,4);
        this.sprite.setFlipX(true);
        this.sprite.anims.play('slime-move', true);
        this.slimeposition = 'right';
      }
      
        else if (slimeguard > 75){
            this.sprite.setVelocityX(-100);
            this.sprite.setFlipX(false);
            this.sprite.anims.play('slime-move', true);
        }
        else if (slimeguard < -75){
            this.sprite.setVelocityX(100);
            this.sprite.setFlipX(true);
            this.sprite.anims.play('slime-move', true);
        }
  }


}