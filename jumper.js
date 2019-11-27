import { topLayer, player, player2 } from "./GameScene.js";
export {Jumper};

export default class Jumper {
    constructor(scene, x, y, height){
        this.scene = scene;
        const anims = scene.anims;
        this.velocidade = height;
        
        anims.create({
            key: "descendo",
            frames: anims.generateFrameNumbers("jumper", { start: 0, end: 17 }),
            frameRate: 10
          });
        anims.create({
            key: "subindo",
            frames: anims.generateFrameNumbers("jumper", { start: 18, end: 21 }),
            frameRate: 5
          });
        anims.create({
            key: "recarga2",
            frames: anims.generateFrameNumbers("jumper", { start: 22, end: 27 }),
            frameRate: 5
          });

        // CRIA O JUMPER
        this.sprite = scene.physics.add.sprite( x, y, "jumper").setScale(0.64, 0.45);
        

        //CRIA COLISAO ENTRE PLAYERS E JUMPER
        scene.physics.add.collider(this.sprite, topLayer);


        scene.physics.add.collider(player, this.sprite, this.SuperJump, null, this);
        scene.physics.add.collider(player2, this.sprite, this.SuperJump2, null, this);



    // FIM DO CONSTRUCTOR
    }

    update(){
        console.log(this.sprite.anims.getCurrentKey());
        
        if(player.body.touching.down && this.sprite.body.touching.up){
            if(this.sprite.anims.getCurrentKey() === "subindo" && this.sprite.anims.getProgress("subindo") === 1){
                player.setVelocityY(this.velocidade);
                this.sprite.anims.play("recarga2");
            }
            else if(this.sprite.anims.getCurrentKey() === "subindo" && this.sprite.anims.getProgress("subindo") < 1){ 
            }

            else if(this.sprite.anims.getCurrentKey() === "descendo" && this.sprite.anims.getProgress("descendo") === 1){
            this.sprite.anims.play("subindo");
            }
            else if(this.sprite.anims.getCurrentKey() === "descendo" && this.sprite.anims.getProgress("descendo") < 1){
            }

            else {
                this.sprite.anims.play("descendo");
            } 
        }
    }

    SuperJump(player){
        
        
    }

    SuperJump2(player2){
        
    }

// FIM DA CLASSE
}
