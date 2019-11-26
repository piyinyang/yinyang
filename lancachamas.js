import { topLayer } from "./GameScene.js";
export default class Lancachamas {

    //cria o lança chamas
    
    constructor(scene, x, y, delay) {
        this.scene = scene;

        const anims = scene.anims;
        
        anims.create({
            key: "chamas-baixas-subindo",
            frames: anims.generateFrameNumbers("chamas", { start: 0, end: 5 }),
            frameRate: 5,
          });

        anims.create({
            key: "chamas-altas-subindo",
            frames: anims.generateFrameNumbers("chamas", { start: 6, end: 9 }),
            frameRate: 5,
          });

        anims.create({
            key: "chamas-maximas",
            frames: anims.generateFrameNumbers("chamas", { start: 10, end: 18 }),
            frameRate: 5,
            repeat: -1
          });

        anims.create({
            key: "chamas-altas-descendo",
            frames: anims.generateFrameNumbers("chamas", { start: 19, end: 23 }),
            frameRate: 5,
          });

        anims.create({
            key: "chamas-baixas-descendo",
            frames: anims.generateFrameNumbers("chamas", { start: 24, end: 30 }),
            frameRate: 5,
          });

        anims.create({
            key: "recarga",
            frames: anims.generateFrameNumbers("chamas", { start: 31, end: 49 }),
            frameRate: 5,
          });

        this.sprite = scene.physics.add.sprite( x, y, "chamas").setScale(0.9,1);
        this.sprite.setSize(16,100).setOffset(1,-20);
        //cria um delay entre os lança chamas

        scene.time.addEvent({
            delay: delay,
            callback: () => {
                this.sprite.anims.play('chamas-baixas-subindo');
            }
        });
        //criando colisão entre lança chamas e o chao
        scene.physics.add.collider(this.sprite, topLayer);
        
        // FIM DO CONSTRUCTOR
    }

    update(){

        
        if(this.sprite.anims.getCurrentKey("chamas-baixas-subindo") && this.sprite.anims.getProgress() === 1){
            this.sprite.anims.play("chamas-altas-subindo");
            this.sprite.setSize(16,70).setOffset(1,-20);
        }
        else if(this.sprite.anims.getCurrentKey("chamas-altas-subindo") && this.sprite.anims.getProgress() === 1 === 1){
            this.sprite.anims.play("chamas-maximas");
            this.sprite.setSize(16,100).setOffset(1,-20);
        }
        else if(this.sprite.anims.getCurrentKey("chamas-maximas") && this.sprite.anims.getProgress() === 1 === 1){
            this.sprite.anims.play("chamas-altas-descendo");
            this.sprite.setSize(16,70).setOffset(1,-20);
        }
        else if(this.sprite.anims.getCurrentKey("chamas-altas-descendo") && this.sprite.anims.getProgress() === 1 === 1){
            this.sprite.anims.play("chamas-baixas-descendo");
            this.sprite.setSize(16,30).setOffset(1,-20);

        }  
        else if(this.sprite.anims.getCurrentKey("chamas-baixas-descendo") && this.sprite.anims.getProgress() === 1 === 1){
            this.sprite.anims.play("recarga");
            this.sprite.setSize(16,16).setOffset(1,-20);
        }
        else if(this.sprite.anims.getCurrentKey("recarga") && this.sprite.anims.getProgress() === 1 === 1){
            this.sprite.anims.play("chamas-baixas-subindo");
            this.sprite.setSize(16,30).setOffset(1,-20);
        }
    }


}