import { topLayer } from "./GameScene.js";
export default class Lancachamas {

    //cria o lança chamas
    
    constructor(scene, x, y, delay) {
        this.scene = scene;

        const anims = scene.anims;
        
        anims.create({
            key: "chamas",
            frames: anims.generateFrameNumbers("chamas", { start: 0, end: 50 }),
            frameRate: 5,
            repeat: -1
          });

        this.sprite = scene.physics.add.sprite( x, y, "chamas").setScale(0.9,1);
        this.sprite.setSize(16,100).setOffset(1,-20);

        //cria um delay entre os lança chamas

        scene.time.addEvent({
            delay: delay,
            callback: () => {
                this.sprite.anims.play('chamas');
            }
        });
        //criando colisão entre lança chamas e o chao
        scene.physics.add.collider(this.sprite, topLayer);
    }
}