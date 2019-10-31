import { gameover } from "./gameover.js";
export { GameScene };

//VARIAVEIS DO PLAYER 1
var player;
var P1jump = false;
var P1jumpdelay = 0;
var playerPosition = "right"; // se o player ta virado pra esquerda ou direita
var attackcombo = 0; //define qual dos 3 ataques o jogador vai usar, possibilitando um oombo

var slime;
var slimepoint = 400; //ponto que o slime vai ficar andando ao redor (X)
var slimeposition = "left"; // se o slime tÃ¡ virado pra esquerda ou direita

//varias variaveis sobre a posicao do slime, so pra facilitar a programacao
    var slimeX; // posicao x do slime
    var slimeY; // posicao y do slime
    var playerX; // posicao x do player
    var playerY; // posicao y do player
    var slime_P1;// x do slime menos o x do player1
    var slime_P1_Y; // y do slime menos o y do player1
    var slimeguard;// distancia do slime ate o slimepoint

var platforms; //variavel das plataformas
var cursors; //variavel das setas do teclado
var spike; //variavel dos espinhos
//var pointer;
//var touchX;
//var touchY;
//var scoreText;
var graphics; //nem me pergunte
var gameOver = false;
var button;

//VARIAVEIS DE SONS
var song; // musica da floresta
var swordwoosh; // som da espada
var slimeatk; // som do slime atacando
var jumping; // som do player pulando
var landing; // som do player caindo no chao

var GameScene = new Phaser.Scene("gamescene");


// A FUNCAO PRELOAD FAZ O PRECARREGAMENTO DE IMAGENS E SONS DO JOGO
GameScene.preload = function() {
  
  //Assets do ambiente e dos objetos
  
  this.load.image("caverna","assets/ambiente/tilesets/cavernaSemfundo.png");
  this.load.image("superficie","assets/ambiente/tilesets/superficie.png");
  this.load.image("fundoCaverna","assets/ambiente/tilesets/background1.png");
  this.load.image("background","assets/ambiente/tilesets/background.png");
  this.load.tilemapTiledJSON("fase1", "assets/ambiente/Fase1.2.json");
  
  
  this.load.image("spike", "assets/ambiente/spikes_1.png");


  //Assets do Jogador Yin

  //Carregando o spritesheet de corrida 
  this.load.spritesheet("yinrun", "assets/player/YinRun.png", {
    frameWidth: 50,
    frameHeight: 37
  });
  //Carregando as demais animações em um único spritesheet
  this.load.spritesheet("yin", "assets/player/YinSpriteSheet.png", {
    frameWidth: 50,
    frameHeight: 37
  });


  this.load.image("idle0", "assets/player/idle0.png");
  this.load.image("idle1", "assets/player/idle1.png");
  this.load.image("idle2", "assets/player/idle2.png");
  this.load.image("idle3", "assets/player/idle3.png");

  this.load.image("jump0", "assets/player/jump0.png");
  this.load.image("jump1", "assets/player/jump1.png");
  this.load.image("jump2", "assets/player/jump2.png");
  this.load.image("jump3", "assets/player/jump3.png");
  this.load.image("fall0", "assets/player/fall0.png");
  this.load.image("fall1", "assets/player/fall1.png");

  this.load.image("crouch0", "assets/player/crouch0.png");
  this.load.image("crouch1", "assets/player/crouch1.png");
  this.load.image("crouch2", "assets/player/crouch2.png");
  this.load.image("crouch3", "assets/player/crouch3.png");

  this.load.image("attack1-0", "assets/player/attack1-0.png");
  this.load.image("attack1-1", "assets/player/attack1-1.png");
  this.load.image("attack1-2", "assets/player/attack1-2.png");
  this.load.image("attack1-3", "assets/player/attack1-3.png");
  this.load.image("attack1-4", "assets/player/attack1-4.png");

  this.load.image("attack2-0", "assets/player/attack2-0.png");
  this.load.image("attack2-1", "assets/player/attack2-1.png");
  this.load.image("attack2-2", "assets/player/attack2-2.png");
  this.load.image("attack2-3", "assets/player/attack2-3.png");
  this.load.image("attack2-4", "assets/player/attack2-4.png");
  this.load.image("attack2-5", "assets/player/attack2-5.png");

  this.load.image("attack3-0", "assets/player/attack3-0.png");
  this.load.image("attack3-1", "assets/player/attack3-1.png");
  this.load.image("attack3-2", "assets/player/attack3-2.png");
  this.load.image("attack3-3", "assets/player/attack3-3.png");
  this.load.image("attack3-4", "assets/player/attack3-4.png");
  this.load.image("attack3-5", "assets/player/attack3-5.png");

  this.load.image("hurt0", "assets/player/hurt0.png");
  this.load.image("hurt1", "assets/player/hurt1.png");
  this.load.image("hurt2", "assets/player/hurt2.png");

  //SPRITESHEET DO SLIME
  this.load.spritesheet('slimesheet', 'assets/slime/slime-Sheet.png', { frameWidth: 32, frameHeight: 25 });
  this.load.image('slime0', 'assets/slime/slime0.png');

  
  //PRELOAD DE AUDIOS
  this.load.audio("song", "assets/sounds/bgm/Techno-Caper.mp3");
  this.load.audio("swordwoosh", "assets/sounds/sfx/battle/swordwoosh.mp3");
  this.load.audio("slimeatk", "assets/sounds/sfx/battle/slime-attack.mp3");
  this.load.audio("jumping", "assets/sounds/sfx/movement/jump1.mp3");
  this.load.audio("landing", "assets/sounds/sfx/movement/landing1.mp3");




  //ICONE DE FULLSCREEN
  this.load.spritesheet("fullscreen", "assets/fullscreen.png", {
    frameWidth: 64,
    frameHeight: 64
  });
  
};

// A FUNCAO CREATE CRIA AS COISAS DENTRO DO JOGO
GameScene.create = function() {
  
  // CRIACAO DOS SONS
  song = this.sound.add("song");
  swordwoosh = this.sound.add("swordwoosh");
  slimeatk = this.sound.add("slimeatk");
  jumping = this.sound.add("jumping");
  landing = this.sound.add("landing");

  //toca musica em loop
  song.play({
    loop: true
  });


  // CRIACAO DO CENARIO E DO BACKGROUND
  
  this.add.image(500, 500, "fundoCaverna").setScale(100, 100);

  var map = this.add.tilemap("fase1");
  var terrain = map.addTilesetImage("cavernaSemfundo", "caverna");
  var terrain2 = map.addTilesetImage("superficie", "superficie");
  var terrain3 = map.addTilesetImage("background", "background");

  //criando os niveis do mapa
  var topLayer3 = map.createStaticLayer("topLayer3", [terrain3], 0, 0);
  var topLayer = map.createStaticLayer("topLayer", [terrain], 0, 0);
  var topLayer2 = map.createStaticLayer("topLayer2", [terrain2], 0, 0);  

  // CRIACAO DOS ESPINHOS
  spike = this.physics.add.staticGroup();
  spike.create(300, 300, "spike");


  // CRIACAO DO JOGADOR 1
  player = this.physics.add.sprite(100, 350, "idle0").setScale(1);
  player.setSize(20, 25, true).setOffset(14, 10);
  player.setBounce(0);
  player.setCollideWorldBounds(true);

  // CRIACAO DO SLIME
  slime = this.physics.add.sprite (400, 100, 'slime0');
  slime.setSize(35,27, true);
  slime.setBounce(0);
  slime.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();
  //pointer = this.input.addPointer(1);

  // ADICIONANDO COLISAO AO JOGO
  this.physics.add.collider(player, topLayer);
  this.physics.add.collider(player, topLayer2);

  this.physics.add.collider(slime, topLayer);
  this.physics.add.collider(slime, topLayer2);

  topLayer.setCollisionByProperty({ collides: true });
  topLayer2.setCollisionByProperty({ collides: true });

  this.physics.add.overlap(player,slime,hitSlime, null, this);
  this.physics.add.overlap(player, spike, hitSpike, null, this);



  
  // SISTEMA DE CAMERAS
  
  this.cameras.main.setBounds(0, 0, 4096, 4096); //limites da camera
  this.physics.world.setBounds(0, 0, 4096, 4096); //limites do mundo

  this.cameras.main.startFollow(player, true, 0.5, 0.5);
  this.cameras.main.setZoom(1.5);

  if (this.cameras.main.deadzone) {
    graphics = this.add.graphics().setScrollFactor(0);
    graphics.strokeRect(
      200,
      200,
      this.cameras.main.deadzone.width,
      this.cameras.main.deadzone.height
    );
  }
  
  // CODIGO PARA IMPLEMENTAR FULLSCREEN
  
  button = this.add
    .image()
    .setOrigin(1, 0)
    .setInteractive();

  button.on(
    "pointerup",
    function() {
      if (this.scale.isFullscreen) {
        button.setFrame(0);

        this.scale.stopFullscreen();
      } else {
        button.setFrame(1);

        this.scale.startFullscreen();
      }
    },
    this
  );

  var FKey = this.input.keyboard.addKey("F");

  FKey.on(
    "down",
    function() {
      if (this.scale.isFullscreen) {
        button.setFrame(0);
        this.scale.stopFullscreen();
      } else {
        button.setFrame(1);
        this.scale.startFullscreen();
      }
    },
    this
  );

  // ANIMACOES DO PLAYER
  this.anims.create({
    key: "idle",
    frames: [
      { key: "idle0" },
      { key: "idle1" },
      { key: "idle2" },
      { key: "idle3" }
    ],
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: "run",
    frames: this.anims.generateFrameNumbers("yinrun", { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "jump",
    frames: [
      { key: "jump0" },
      { key: "jump1" },
      { key: "jump2" },
      { key: "jump3", duration: 10000 }
    ],
    frameRate: 10
  });

  this.anims.create({
    key: "fall",
    frames: [{ key: "fall0" }, { key: "fall1" }],
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: "crouch",
    frames: [
      { key: "crouch0" },
      { key: "crouch1" },
      { key: "crouch2" },
      { key: "crouch3" }
    ],
    frameRate: 7,
    repeat: -1
  });

  this.anims.create({
    key: "attack1",
    frames: [
      { key: "attack1-0" },
      { key: "attack1-1" },
      { key: "attack1-2" },
      { key: "attack1-3" },
      { key: "attack1-4" }
    ],
    frameRate: 20,
    delay: 100
  });

  this.anims.create({
    key: "attack2",
    frames: [
      { key: "attack2-0" },
      { key: "attack2-1" },
      { key: "attack2-2" },
      { key: "attack2-3" },
      { key: "attack2-4" },
      { key: "attack2-5" }
    ],
    frameRate: 20,
    delay: 100
  });

  this.anims.create({
    key: "attack3",
    frames: [
      { key: "attack3-0" },
      { key: "attack3-1" },
      { key: "attack3-2" },
      { key: "attack3-3" },
      { key: "attack3-4" },
      { key: "attack3-5" }
    ],
    frameRate: 20,
    delay: 100
  });

  this.anims.create({
    key: "hurt",
    frames: [{ key: "hurt0" }, { key: "hurt1" }, { key: "hurt2" }],
    frameRate: 9,
    repeat: -1
  });


  //          ANIMACOES DO SLIME

  this.anims.create({
    key: 'slime-idle',
    frames: this.anims.generateFrameNumbers('slimesheet', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'slime-move',
    frames: this.anims.generateFrameNumbers('slimesheet', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'slime-attack',
    frames: this.anims.generateFrameNumbers('slimesheet', { start: 8, end: 12 }),
    frameRate: 10,
  });
  this.anims.create({
    key: 'slime-hurt',
    frames: this.anims.generateFrameNumbers('slimesheet', { start: 13, end: 16 }),
    frameRate: 10
  });
  this.anims.create({
    key: 'slime-die',
    frames: this.anims.generateFrameNumbers('slimesheet', { start: 17, end: 20 }),
    frameRate: 10
  });


};

// A FUNCAO UPDATE EH A QUE FAZ O JOGO ACONTECER, ELA SE REPETE INFINITAMENTE VÃRIAS VEZES POR SEGUNDO
GameScene.update = function() {

  console.log(P1jump);  
  console.log(P1jumpdelay);
  
  // as variaveis de posicao do slime (de novo)
  // tive que botar la em cima pra terem escopo global
    slimeX = slime.body.x;
    slimeY = slime.body.y;
    playerX = player.body.x;
    playerY = player.body.y;
    slime_P1 = slimeX - playerX;
    slime_P1_Y = playerY - slimeY;
    slimeguard = slimeX - slimepoint;
  
    //          PLAYER 1 ANIMATIONS

    if(player.body.blocked.down && cursors.up.isUp){
      player.setVelocityY(0);
      P1jump = false;
      P1jumpdelay = 0;
    }

    if (P1jump === true){
      P1jumpdelay ++;
    }
  
    //          HURT
    if (
    player.anims.getCurrentKey() === "hurt" &&
    player.anims.getProgress("hurt") < 1
  ) {
    //player.setSize(20, 25, true).setOffset(5, 10);
    player.setTint(0xff0000);
  } else if (
    player.anims.getCurrentKey() === "hurt" &&
    player.anims.getProgress("hurt") === 1
  ) {
    //player.setSize(20, 25, true).setOffset(20, 10);
    player.clearTint();
    player.anims.play("idle", true);
    player.setSize(20, 25, true).setOffset(14, 10);

  


    //      ATTACK 1
  } else if (
    player.anims.getCurrentKey() === "attack1" &&
    player.anims.getProgress("attack1") < 1 &&
    playerPosition === "right"
  ) {
    player.setSize(25, 35, true).setOffset(20, 0);
  } else if (
    player.anims.getCurrentKey() === "attack1" &&
    player.anims.getProgress("attack1") < 1 &&
    playerPosition === "left"
  ) {
    player.setSize(25, 35, true).setOffset(5, 0);
  } else if (
    player.anims.getCurrentKey() === "attack1" &&
    player.anims.getProgress("attack1") === 1
  ) {
    player.anims.play("idle", true);
    player.setSize(20, 25, true).setOffset(14, 10);
  }

  //          ATTACK 2
  else if (
    player.anims.getCurrentKey() === "attack2" &&
    player.anims.getProgress("attack2") < 1 &&
    playerPosition === "right"
  ) {
    player.setSize(25, 35, true).setOffset(20, 0);
  } else if (
    player.anims.getCurrentKey() === "attack2" &&
    player.anims.getProgress("attack2") < 1 &&
    playerPosition === "left"
  ) {
    player.setSize(25, 35, true).setOffset(5, 0);
  } else if (
    player.anims.getCurrentKey() === "attack2" &&
    player.anims.getProgress("attack2") === 1
  ) {
    player.anims.play("idle", true);
    player.setSize(20, 25, true).setOffset(14, 10);
  }

  //           ATTACK 3
  else if (
    player.anims.getCurrentKey() === "attack3" &&
    player.anims.getProgress("attack3") < 1 &&
    playerPosition === "right"
  ) {
    player.setSize(25, 35, true).setOffset(20, 0);
  } else if (
    player.anims.getCurrentKey() === "attack3" &&
    player.anims.getProgress("attack3") < 1 &&
    playerPosition === "left"
  ) {
    player.setSize(25, 35, true).setOffset(5, 0);
  } else if (
    player.anims.getCurrentKey() === "attack3" &&
    player.anims.getProgress("attack3") === 1
  ) {
    player.anims.play("idle", true);
    player.setSize(20, 25, true).setOffset(14, 10);
  }


  //          CONDICOES PARA EXECUTAR ACOES

   else if (cursors.up.isDown && player.body.blocked.down) {
    player.setVelocityY(-350);
    jumping.play({
      volume:0.3
    });
    P1jump = true;
  /*} else if (!player.body.wasTouching.down && player.body.touching.down){
    landing.play({
      volume: 0.3
    });*/
  } else if (!player.body.blocked.down && cursors.up.isDown && P1jump && P1jumpdelay >= 20){
    player.setVelocityY(-350);
    jumping.play({
      volume:0.3
    });
    P1jump = false;
    P1jumpdelay = 0;

  } else if (
    cursors.space.isDown &&
    cursors.down.isUp &&
    player.body.blocked.down &&
    playerPosition === "left" &&
    attackcombo === 0
  ) {
    player.setFlipX(true);
    player.setVelocityX(0);
    player.anims.play("attack1", true);
    swordwoosh.play();
    attackcombo = 1;
  } else if (
    cursors.space.isDown &&
    cursors.down.isUp &&
    player.body.blocked.down &&
    playerPosition === "right" &&
    attackcombo === 0
  ) {
    player.setFlipX(false);
    player.setVelocityX(0);
    player.anims.play("attack1", true);
    swordwoosh.play();
    attackcombo = 1;
  } else if (
    cursors.space.isDown &&
    cursors.down.isUp &&
    player.body.blocked.down &&
    playerPosition === "left" &&
    attackcombo === 1
  ) {
    player.setFlipX(true);
    player.setVelocityX(0);
    player.anims.play("attack2", true);
    swordwoosh.play();
    attackcombo = 2;
  } else if (
    cursors.space.isDown &&
    cursors.down.isUp &&
    player.body.blocked.down &&
    playerPosition === "right" &&
    attackcombo === 1
  ) {
    player.setFlipX(false);
    player.setVelocityX(0);
    player.anims.play("attack2", true);
    swordwoosh.play();
    attackcombo = 2;
  } else if (
    cursors.space.isDown &&
    cursors.down.isUp &&
    player.body.blocked.down &&
    playerPosition === "left" &&
    attackcombo === 2
  ) {
    player.setFlipX(true);
    player.setVelocityX(0);
    player.anims.play("attack3", true);
    swordwoosh.play();
    attackcombo = 0;
  } else if (
    cursors.space.isDown &&
    cursors.down.isUp &&
    player.body.blocked.down &&
    playerPosition === "right" &&
    attackcombo === 2
  ) {
    player.setFlipX(false);
    player.setVelocityX(0);
    player.anims.play("attack3", true);
    swordwoosh.play();
    attackcombo = 0;
  } else if (
    player.body.velocity.y < 0 &&
    cursors.left.isUp &&
    cursors.right.isUp &&
    playerPosition === "left"
  ) {
    player.setFlipX(true);
    player.setVelocityX(0);
    player.anims.play("jump", true);
    attackcombo = 0;
  } else if (
    player.body.velocity.y < 0 &&
    cursors.left.isUp &&
    cursors.right.isUp &&
    playerPosition === "right"
  ) {
    player.setFlipX(false);
    player.setVelocityX(0);
    player.anims.play("jump", true);
    attackcombo = 0;
  } else if (player.body.velocity.y < 0 && cursors.left.isDown) {
    player.setFlipX(true);
    player.setVelocityX(-300);
    player.anims.play("jump", true);
    playerPosition = "left";
    attackcombo = 0;
  } else if (player.body.velocity.y < 0 && cursors.right.isDown) {
    player.setFlipX(false);
    player.setVelocityX(300);
    player.anims.play("jump", true);
    playerPosition = "right";
    attackcombo = 0;
  } else if (
    !player.body.blocked.down &&
    player.body.velocity.y > 0 &&
    cursors.left.isUp &&
    cursors.right.isUp &&
    playerPosition === "left"
  ) {
    player.setFlipX(true);
    player.setVelocityX(0);
    player.anims.play("fall", true);
    attackcombo = 0;
  } else if (
    !player.body.blocked.down &&
    player.body.velocity.y > 0 &&
    cursors.left.isUp &&
    cursors.right.isUp &&
    playerPosition === "right"
  ) {
    player.setFlipX(false);
    player.setVelocityX(0);
    player.anims.play("fall", true);
    attackcombo = 0;
  } else if (!player.body.blocked.down && player.body.velocity.y > 0 && cursors.left.isDown) {
    player.setFlipX(true);
    player.setVelocityX(-300);
    player.anims.play("fall", true);
    playerPosition = "left";
    attackcombo = 0;
  } else if (!player.body.blocked.down && player.body.velocity.y > 0 && cursors.right.isDown) {
    player.setFlipX(false);
    player.setVelocityX(300);
    player.anims.play("fall", true);
    playerPosition = "right";
    attackcombo = 0;
  } else if (cursors.left.isDown && player.body.blocked.down) {
    player.setFlipX(true);
    player.setVelocityX(-300);
    player.anims.play("run", true);
    playerPosition = "left";
    attackcombo = 0;
  } else if (cursors.right.isDown && player.body.blocked.down) {
    player.setFlipX(false);
    player.setVelocityX(300);
    player.anims.play("run", true);
    playerPosition = "right";
    attackcombo = 0;
  } else if (
    cursors.down.isDown &&
    player.body.blocked.down &&
    cursors.space.isUp &&
    playerPosition === "left"
  ) {
    player.setFlipX(true);
    player.setVelocityX(0);
    player.anims.play("crouch", true);
    attackcombo = 0;
  } else if (
    cursors.down.isDown &&
    player.body.blocked.down &&
    cursors.space.isUp &&
    playerPosition === "right"
  ) {
    player.setFlipX(false);
    player.setVelocityX(0);
    player.anims.play("crouch", true);
    attackcombo = 0;
  } else if (
    player.body.blocked.down &&
    cursors.right.isUp &&
    cursors.left.isUp &&
    cursors.space.isUp &&
    cursors.down.isUp &&
    playerPosition === "left"
  ) {
    player.setFlipX(true);
    player.setVelocityX(0);
    player.anims.play("idle", true);
  } else if (
    player.body.blocked.down &&
    cursors.right.isUp &&
    cursors.left.isUp &&
    cursors.space.isUp &&
    cursors.down.isUp &&
    playerPosition === "right"
  ) {
    player.setFlipX(false);
    player.setVelocityX(0);
    player.anims.play("idle", true);
  }

  //          COMPORTAMENTO DO SLIME
    
  
  
  //      MUDANCA DE HITBOX DURANTE ANIMACAO     
  if (
    slime.anims.getCurrentKey() === "slime-hurt" &&
    slime.anims.getProgress("slime-hurt") < 1 && slimeposition === "right"
  ) {
    slime.setVelocityX(0);
    slime.setSize(32, 25, true).setOffset(-10, 0);
    slime.setTint(0xff0000);
  } else if (
    slime.anims.getCurrentKey() === "slime-hurt" &&
    slime.anims.getProgress("slime-hurt") < 1 && slimeposition === "left"
  ) {
    slime.setVelocityX(0);
    slime.setSize(32, 25, true).setOffset(10, 0);
    slime.setTint(0xff0000);
  } else if (
    slime.anims.getCurrentKey() === "slime-hurt" &&
    slime.anims.getProgress("slime-hurt") === 1
  ) {
    slime.setSize(32, 25, true).setOffset(0, 0);
    slime.clearTint();
    slime.anims.play("slime-idle", true);

    
  } else if (slime.anims.getCurrentKey() === 'slime-attack'
  && slime.anims.getProgress('slime-attack') < 1 && slimeposition === 'left'){
      slime.setSize(40,25).setOffset(-3,0);

  } else if (slime.anims.getCurrentKey() === 'slime-attack'
  && slime.anims.getProgress('slime-attack') === 1 && slimeposition==="left"){
      slime.anims.play('slime-idle', true);
      slime.setSize(32,25).setOffset(0,0);
    
  } else if (slime.anims.getCurrentKey() === 'slime-attack'
  && slime.anims.getProgress('slime-attack') < 1 && slimeposition === 'right'){
      slime.setSize(40,25).setOffset(0,0);

  } else if (slime.anims.getCurrentKey() === 'slime-attack'
  && slime.anims.getProgress('slime-attack') === 1 && slimeposition==="right"){
      slime.anims.play('slime-idle', true);
      slime.setSize(32,25).setOffset(0,0);
  
  //      CONDICIONAIS PARA COMPORTAMENTO/ANIMACAO
  
  } else if (slime_P1 < 35 && slime_P1 > 0 && slime_P1_Y > -50){
      slime.setVelocityX(0);
      slime.setFlipX(false);
      slime.anims.play('slime-attack', true);
      slimeposition = 'left';
  } else if (slime_P1 > -35 && slime_P1 < 0 && slime_P1_Y > -50){
      slime.setVelocityX(0);
      slime.setFlipX(true);
      slime.anims.play('slime-attack', true);
      slimeposition = 'right';
  } else if (slime_P1 < 150 && slime_P1 > 0 && slime_P1_Y > -50){
      slime.setVelocityX(-150);
      slime.setSize(35,27, true).setOffset(0,-2);
      slime.setFlipX(false);
      slime.anims.play('slime-move', true);
      slimeposition = 'left';
  } else if (slime_P1 > -150 && slime_P1 < 0 && slime_P1_Y > -50){
      slime.setVelocityX(150);
      slime.setSize(35,27, true).setOffset(0,-2);
      slime.setFlipX(true);
      slime.anims.play('slime-move', true);
      slimeposition = 'right';
  }
  /*else if (slime_P2 < 35 && slime_P2 > 0 && slime_P2_Y > -50){
      slime.setVelocityX(0);
      slime.setFlipX(false);
      slime.anims.play('slime-attack', true);
  }
  else if (slime_P2 > -35 && slime_P2 < 0 && slime_P2_Y > -50){
      slime.setVelocityX(0);
      slime.setFlipX(true);
      slime.anims.play('slime-attack', true);
  }
  else if (slime_P2 < 150 && slime_P2 > 0 && slime_P2_Y > -50){
      slime.setVelocityX(-150);
      slime.setFlipX(false);
      slime.anims.play('slime-move', true);
  }
  else if (slime_P2 > -150 && slime_P2 < 0 && slime_P2_Y > -50){
      slime.setVelocityX(150);
      slime.setFlipX(true);
      slime.anims.play('slime-move', true);
  }*/
  else if (slimeguard > 75){
      slime.setVelocityX(-100);
      slime.setFlipX(false);
      slime.anims.play('slime-move', true);
  }
  else if (slimeguard < -75){
      slime.setVelocityX(100);
      slime.setFlipX(true);
      slime.anims.play('slime-move', true);
  }
};

// A FUNCAO QUE DEFINE O QUE ACONTECE QUANDO HÃ COLISAO ENTRE PLAYER E SLIME
function hitSlime (player, slime){
  
  //se o jogador ataca o slime, o slime eh jogado um pouco pra tras. 
  if(player.anims.getCurrentKey() === 'attack1' && slime_P1 > 0){
      slime.setPosition(slimeX+50,slimeY+10);
      player.setVelocityX(0);
      slime.anims.play("slime-hurt", true);
  } else if(player.anims.getCurrentKey() === 'attack1' && slime_P1 < 0){
      slime.setPosition(slimeX-50, slimeY+10);
      player.setVelocityX(0);
      slime.anims.play("slime-hurt", true);
  } else if(player.anims.getCurrentKey() === 'attack2' && slime_P1 > 0){
      slime.setPosition(slimeX+50,slimeY+10);
      player.setVelocityX(0);
      slime.anims.play("slime-hurt", true);

  } else if(player.anims.getCurrentKey() === 'attack2' && slime_P1 < 0){
      slime.setPosition(slimeX-50, slimeY+10);
      player.setVelocityX(0);
      slime.anims.play("slime-hurt", true);

  } else if(player.anims.getCurrentKey() === 'attack3' && slime_P1 > 0){
      slime.setPosition(slimeX+50,slimeY+10);
      player.setVelocityX(0);
      slime.anims.play("slime-hurt", true);

  } else if(player.anims.getCurrentKey() === 'attack3' && slime_P1 < 0){
      slime.setPosition(slimeX-50, slimeY+10);
      player.setVelocityX(0);
      slime.anims.play("slime-hurt", true);

  }
    //se o slime ataca o jogador, o jogador eh empurrado pra tras
    else if(slime.anims.getCurrentKey() === 'slime-attack' && slimeposition === "left" && slime.anims.getProgress('slime-attack') === 1){
      player.setVelocityX(-125);
      slime.setVelocityX(200);
      player.anims.play('hurt', true);
      slimeatk.play();
  } else if(slime.anims.getCurrentKey() === 'slime-attack' && slimeposition === "right" && slime.anims.getProgress('slime-attack') === 1){
      player.setVelocityX(125);
      slime.setVelocityX(-200);
      player.anims.play('hurt', true);
      slimeatk.play();
  }
};

function hitSpike(player, spike) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play("idle");

  gameOver = true;
  if (gameOver === true) {
    song.stop();
    this.scene.start(gameover);
  }
};