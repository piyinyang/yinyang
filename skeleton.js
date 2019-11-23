import { topLayer, topLayer2, topLayer3, player, player2, slimeatk, playerPosition, player2Position} from "./GameScene.js";
export { Skeleton };

export default class Skeleton {
    // Cria a classe do skeleton
    
    constructor(scene, x, y, point){
        this.scene = scene;
        const anims = scene.anims;
        this.skeletonpoint = point;
        this.skeletonposition = "right";

        anims.create({
            key: 'skeleton-idle',
            frames: anims.generateFrameNumbers('skeleton-idle', { start: 0, end: 10 }),
            frameRate: 10,
            repeat: -1
          });

        anims.create({
            key: 'skeleton-walk',
            frames: anims.generateFrameNumbers('skeleton-walk', { start: 0, end: 12 }),
            frameRate: 10,
            repeat: -1
          });
        anims.create({
            key: 'skeleton-hurt',
            frames: anims.generateFrameNumbers('skeleton-hurt', { start: 0, end: 7 }),
            frameRate: 10,
          });
        anims.create({
            key: 'skeleton-attack',
            frames: anims.generateFrameNumbers('skeleton-attack', { start: 0, end: 10 }),
            frameRate: 10,
          });
        anims.create({
            key: 'skeleton-die',
            frames: anims.generateFrameNumbers('skeleton-die', { start: 0, end: 14 }),
            frameRate: 10,
            repeat: -1
          });
        
          this.sprite = scene.physics.add.sprite( x, y, "skeleton-idle");
          this.sprite.setSize(32,32, true).setOffset(5,0);
          this.sprite.setBounce(0);
          this.sprite.setCollideWorldBounds(true);
          this.sprite.setVelocityX(-100);
          //this.sprite.setOrigin(0.5);

          scene.physics.add.collider(this.sprite, topLayer);
          scene.physics.add.collider(this.sprite, topLayer2);
          scene.physics.add.collider(this.sprite, topLayer3);
          
          //FIM DO CONSTRUCTOR
    }

    update(){

        // VARIAVEIS 
  
        this.skeletonX = this.sprite.body.position.x;
        this.skeletonY = this.sprite.body.position.y;
        this.skeletonguard = this.skeletonX - this.skeletonpoint;
        this.playerX = player.body.position.x;
        this.playerY = player.body.position.y;
        this.player2X = player2.body.position.x;
        this.player2Y = player2.body.position.y;
        this.skeleton_P1 = this.skeletonX - this.playerX;
        this.skeleton_P1_Y = this.playerY - this.skeletonY;
        this.skeleton_P2 = this.skeletonX - this.player2X;
        this.skeleton_P2_Y = this.player2Y - this.skeletonY;

        if (
          this.sprite.anims.getCurrentKey() === "skeleton-hurt" &&
          this.sprite.anims.getProgress("skeleton-hurt") < 1 && this.skeletonposition === "right"
        ) {
          //this.sprite.setSize(20, 32, true).setOffset(0, 0);
          this.sprite.setTint(0xff0000);
        } else if (
          this.sprite.anims.getCurrentKey() === "skeleton-hurt" &&
          this.sprite.anims.getProgress("skeleton-hurt") < 1 && this.skeletonposition === "left"
        ) {
          //this.sprite.setSize(20, 32, true).setOffset(0, 0);
          this.sprite.setTint(0xff0000);
        } else if (
          this.sprite.anims.getCurrentKey() === "skeleton-hurt" &&
          this.sprite.anims.getProgress("skeleton-hurt") === 1
        ) {
          this.sprite.setVelocityX(0);
          //this.sprite.setSize(20, 32, true).setOffset(0, 0);
          this.sprite.clearTint();
          this.sprite.anims.play("skeleton-idle", true);
      
          
        } else if (this.sprite.anims.getCurrentKey() === 'skeleton-attack'
        && this.sprite.anims.getProgress('skeleton-attack') < 1 && this.skeletonposition === 'left'){
            this.sprite.setSize(30,37).setOffset(-8,0);
      
        } else if (this.sprite.anims.getCurrentKey() === 'skeleton-attack'
        && this.sprite.anims.getProgress('skeleton-attack') === 1 && this.skeletonposition==="left"){
            this.sprite.anims.play('skeleton-idle', true);
            this.sprite.setSize(20,37).setOffset(0,0);
          
        } else if (this.sprite.anims.getCurrentKey() === 'skeleton-attack'
        && this.sprite.anims.getProgress('skeleton-attack') < 1 && this.skeletonposition === 'right'){
            this.sprite.setSize(30,37).setOffset(8,0);
      
        } else if (this.sprite.anims.getCurrentKey() === 'skeleton-attack'
        && this.sprite.anims.getProgress('skeleton-attack') === 1 && this.skeletonposition==="right"){
            this.sprite.anims.play('skeleton-idle', true);
            this.sprite.setSize(20,32).setOffset(0,0);
        
        //      CONDICIONAIS PARA COMPORTAMENTO/ANIMACAO P/ PLAYER 1
        
        } else if (this.skeleton_P1 < 15 && this.skeleton_P1 > 0 && this.skeleton_P1_Y > -50){
            this.sprite.setVelocityX(0);
            this.sprite.setFlipX(true);
            this.sprite.anims.play('skeleton-attack', true);
            this.skeletonposition = 'left';
        } else if (this.skeleton_P1 > -20 && this.skeleton_P1 < 0 && this.skeleton_P1_Y > -50){
            this.sprite.setVelocityX(0);
            this.sprite.setFlipX(false);
            this.sprite.anims.play('skeleton-attack', true);
            this.skeletonposition = 'right';
        } else if (this.skeleton_P1 < 150 && this.skeleton_P1 > 0 && this.skeleton_P1_Y > -50){
            this.sprite.setVelocityX(-150);
            //this.sprite.setSize(20,32, true).setOffset(7,0);
            this.sprite.setFlipX(true);
            this.sprite.anims.play('skeleton-walk', true);
            this.skeletonposition = 'left';
        } else if (this.skeleton_P1 > -150 && this.skeleton_P1 < 0 && this.skeleton_P1_Y > -50){
            this.sprite.setVelocityX(150);
            //this.sprite.setSize(20,32, true).setOffset(7,0);
            this.sprite.setFlipX(false);
            this.sprite.anims.play('skeleton-walk', true);
            this.skeletonposition = 'right';
        }
      
        //      CONDICIONAIS PARA COMPORTAMENTO/ANIMACAO P/ PLAYER 2
        
      else if (this.skeleton_P2 < 15 && this.skeleton_P2 > 0 && this.skeleton_P2_Y > -50){
        this.sprite.setVelocityX(0);
        this.sprite.setFlipX(true);
        this.sprite.anims.play('skeleton-attack', true);
        this.skeletonposition = 'left';
      } else if (this.skeleton_P2 > -20 && this.skeleton_P2 < 0 && this.skeleton_P2_Y > -50){
        this.sprite.setVelocityX(0);
        this.sprite.setFlipX(false);
        this.sprite.anims.play('skeleton-attack', true);
        this.skeletonposition = 'right';
      } else if (this.skeleton_P2 < 150 && this.skeleton_P2 > 0 && this.skeleton_P2_Y > -50){
        this.sprite.setVelocityX(-150);
        //this.sprite.setSize(20,32, true).setOffset(7,0);
        this.sprite.setFlipX(true);
        this.sprite.anims.play('skeleton-walk', true);
        this.skeletonposition = 'left';
      } else if (this.skeleton_P2 > -150 && this.skeleton_P2 < 0 && this.skeleton_P2_Y > -50){
        this.sprite.setVelocityX(150);
        //this.sprite.setSize(20,32, true).setOffset(7,0);
        this.sprite.setFlipX(false);
        this.sprite.anims.play('skeleton-walk', true);
        this.skeletonposition = 'right';
      }
      
        else if (this.skeletonguard > 75){
            this.sprite.setVelocityX(-100);
            this.sprite.setFlipX(true);
            this.sprite.anims.play('skeleton-walk', true);
        }
        else if (this.skeletonguard < -75){
            this.sprite.setVelocityX(100);
            this.sprite.setFlipX(false);
            this.sprite.anims.play('skeleton-walk', true);
        }
        
    //FIM DO UPDATE

    }

}
