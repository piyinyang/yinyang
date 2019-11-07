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
var slimevelocity;

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
  spike.create(590, 480, "spike");


  // CRIACAO DO JOGADOR 1
  player = this.physics.add.sprite(100, 350, "yin").setScale(1);
  player.setSize(13, 25, true).setOffset(18, 10);
  player.setBounce(0);
  player.setCollideWorldBounds(true);

  // CRIACAO DO SLIME
  slime = this.physics.add.sprite (400, 300, 'slime0');
  slime.setSize(20,20, true).setOffset(5,4);
  slime.setBounce(0);
  slime.setCollideWorldBounds(true);
  slime.setVelocityX(-100);

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
    frames: this.anims.generateFrameNumbers("yin", { start: 38, end: 41 }),
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
    frames: this.anims.generateFrameNumbers("yin", { start: 14, end: 17 }),
    frameRate: 8,
    repeat: 0
  });

  this.anims.create({
    key: "fall",
    frames: this.anims.generateFrameNumbers("yin", { start: 22, end: 23 }),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: "crouch",
    frames: this.anims.generateFrameNumbers("yin", { start: 4, end: 7 }),
    frameRate: 7,
    repeat: -1
  });

  this.anims.create({
    key: "attack1",
    frames: this.anims.generateFrameNumbers("yin", { start: 42, end: 46 }),
    frameRate: 20,
    delay: 100
  });

  this.anims.create({
    key: "attack2",
    frames: this.anims.generateFrameNumbers("yin", { start: 47, end: 52 }),

    frameRate: 20,
    delay: 100
  });

  this.anims.create({
    key: "attack3",
    frames: this.anims.generateFrameNumbers("yin", { start: 53, end: 58 }),
    frameRate: 20,
    delay: 100
  });

  this.anims.create({
    key: "hurt",
    frames: this.anims.generateFrameNumbers("yin", { start: 59, end: 61 }),
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
    frameRate: 15
  });
  this.anims.create({
    key: 'slime-die',
    frames: this.anims.generateFrameNumbers('slimesheet', { start: 17, end: 20 }),
    frameRate: 10
  });


};

// A FUNCAO UPDATE EH A QUE FAZ O JOGO ACONTECER, ELA SE REPETE INFINITAMENTE VÃRIAS VEZES POR SEGUNDO
GameScene.update = function() {

  //console.log(P1jump);  
  //console.log(P1jumpdelay);
  //console.log(slimevelocity);
  
  // as variaveis de posicao do slime (de novo)
  // tive que botar la em cima pra terem escopo global
    slimeX = slime.body.x;
    slimeY = slime.body.y;
    playerX = player.body.x;
    playerY = player.body.y;
    slime_P1 = slimeX - playerX;
    slime_P1_Y = playerY - slimeY;
    slimeguard = slimeX - slimepoint;
    slimevelocity = slime.body.velocity.x;
  
    //          PLAYER 1 ANIMATIONS

    /*if(player.body.blocked.down && cursors.up.isUp){
      player.setVelocityY(0);
      P1jump = false;
      P1jumpdelay = 0;
    }*/

    if (P1jump === true){
      P1jumpdelay ++;
    }
  
    if (player.anims.getCurrentKey("idle")){
      player.setSize(13, 25, true).setOffset(18, 10);
    }

    //          HURT
    if (
    player.anims.getCurrentKey() === "hurt" &&
    player.anims.getProgress("hurt") < 1
  ) {
    player.setTint(0xff0000);
  } else if (
    player.anims.getCurrentKey() === "hurt" &&
    player.anims.getProgress("hurt") === 1
  ) {
    player.clearTint();
    player.anims.play("idle", true);

  


    //      ATTACK 1
  } else if (
    player.anims.getCurrentKey() === "attack1" &&
    player.anims.getProgress("attack1") < 1 &&
    playerPosition === "right"
  ) {
    player.setSize(15, 30, true).setOffset(25, 5);
  } else if (
    player.anims.getCurrentKey() === "attack1" &&
    player.anims.getProgress("attack1") < 1 &&
    playerPosition === "left"
  ) {
    player.setSize(15, 30, true).setOffset(10, 5);
  } else if (
    player.anims.getCurrentKey() === "attack1" &&
    player.anims.getProgress("attack1") === 1
  ) {
    player.anims.play("idle", true);
  }

  //          ATTACK 2
  else if (
    player.anims.getCurrentKey() === "attack2" &&
    player.anims.getProgress("attack2") < 1 &&
    playerPosition === "right"
  ) {
    player.setSize(15, 30, true).setOffset(25, 5);
  } else if (
    player.anims.getCurrentKey() === "attack2" &&
    player.anims.getProgress("attack2") < 1 &&
    playerPosition === "left"
  ) {
    player.setSize(15, 30, true).setOffset(10, 5);
  } else if (
    player.anims.getCurrentKey() === "attack2" &&
    player.anims.getProgress("attack2") === 1
  ) {
    player.anims.play("idle", true);
  }

  //           ATTACK 3
  else if (
    player.anims.getCurrentKey() === "attack3" &&
    player.anims.getProgress("attack3") < 1 &&
    playerPosition === "right"
  ) {
    player.setSize(15, 30, true).setOffset(25, 5);
  } else if (
    player.anims.getCurrentKey() === "attack3" &&
    player.anims.getProgress("attack3") < 1 &&
    playerPosition === "left"
  ) {
    player.setSize(15, 30, true).setOffset(10, 5);
  } else if (
    player.anims.getCurrentKey() === "attack3" &&
    player.anims.getProgress("attack3") === 1
  ) {
    player.anims.play("idle", true);
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
    player.setSize(13, 20, true).setOffset(18, 15);
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
    slime.setSize(20, 20, true).setOffset(0, 4);
    slime.setTint(0xff0000);
  } else if (
    slime.anims.getCurrentKey() === "slime-hurt" &&
    slime.anims.getProgress("slime-hurt") < 1 && slimeposition === "left"
  ) {
    slime.setSize(20, 20, true).setOffset(0, 4);
    slime.setTint(0xff0000);
  } else if (
    slime.anims.getCurrentKey() === "slime-hurt" &&
    slime.anims.getProgress("slime-hurt") === 1
  ) {
    slime.setVelocityX(0);
    slime.setSize(20, 20, true).setOffset(0, 4);
    slime.clearTint();
    slime.anims.play("slime-idle", true);

    
  } else if (slime.anims.getCurrentKey() === 'slime-attack'
  && slime.anims.getProgress('slime-attack') < 1 && slimeposition === 'left'){
      slime.setSize(30,20).setOffset(-8,4);

  } else if (slime.anims.getCurrentKey() === 'slime-attack'
  && slime.anims.getProgress('slime-attack') === 1 && slimeposition==="left"){
      slime.anims.play('slime-idle', true);
      slime.setSize(20,20).setOffset(0,4);
    
  } else if (slime.anims.getCurrentKey() === 'slime-attack'
  && slime.anims.getProgress('slime-attack') < 1 && slimeposition === 'right'){
      slime.setSize(30,20).setOffset(8,4);

  } else if (slime.anims.getCurrentKey() === 'slime-attack'
  && slime.anims.getProgress('slime-attack') === 1 && slimeposition==="right"){
      slime.anims.play('slime-idle', true);
      slime.setSize(20,20).setOffset(0,4);
  
  //      CONDICIONAIS PARA COMPORTAMENTO/ANIMACAO
  
  } else if (slime_P1 < 15 && slime_P1 > 0 && slime_P1_Y > -50){
      slime.setVelocityX(0);
      slime.setFlipX(false);
      slime.anims.play('slime-attack', true);
      slimeposition = 'left';
  } else if (slime_P1 > -20 && slime_P1 < 0 && slime_P1_Y > -50){
      slime.setVelocityX(0);
      slime.setFlipX(true);
      slime.anims.play('slime-attack', true);
      slimeposition = 'right';
  } else if (slime_P1 < 150 && slime_P1 > 0 && slime_P1_Y > -50){
      slime.setVelocityX(-150);
      slime.setSize(20,20, true).setOffset(7,4);
      slime.setFlipX(false);
      slime.anims.play('slime-move', true);
      slimeposition = 'left';
  } else if (slime_P1 > -150 && slime_P1 < 0 && slime_P1_Y > -50){
      slime.setVelocityX(150);
      slime.setSize(20,20, true).setOffset(7,4);
      slime.setFlipX(true);
      slime.anims.play('slime-move', true);
      slimeposition = 'right';
  }

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
  if(player.anims.getCurrentKey() === 'attack1' && (/*slime_P1 > 0 || */playerPosition==="right")){
      slime.setVelocityX(150);
      slime.setVelocityY(-100);
      player.setVelocityX(0);
      slime.anims.play("slime-hurt", true);
  } else if(player.anims.getCurrentKey() === 'attack1' && (/*slime_P1 < 0 || */playerPosition==="left")){
      slime.setVelocityX(-150);
      slime.setVelocityY(-100);
      player.setVelocityX(0);
      slime.anims.play("slime-hurt", true);
  } else if(player.anims.getCurrentKey() === 'attack2' && (/*slime_P1 > 0 || */playerPosition==="right")){
      slime.setVelocityX(150);
      slime.setVelocityY(-100);
      player.setVelocityX(0);
      slime.anims.play("slime-hurt", true);

  } else if(player.anims.getCurrentKey() === 'attack2' && (/*slime_P1 < 0 || */playerPosition==="left")){
      slime.setVelocityX(-150);
      slime.setVelocityY(-100);
      player.setVelocityX(0);
      slime.anims.play("slime-hurt", true);

  } else if(player.anims.getCurrentKey() === 'attack3' && (/*slime_P1 > 0 || */playerPosition==="right")){
      slime.setVelocityX(150);
      slime.setVelocityY(-100);
      player.setVelocityX(0);
      slime.anims.play("slime-hurt", true);

  } else if(player.anims.getCurrentKey() === 'attack3' && (/*slime_P1 < 0 || */playerPosition==="left")){
      slime.setVelocityX(-150);
      slime.setVelocityY(-100);
      player.setVelocityX(0);
      slime.anims.play("slime-hurt", true);

  }
    //se o slime ataca o jogador, o jogador eh empurrado pra tras
    else if(slime.anims.getCurrentKey() === 'slime-attack' && slimeposition === "left" && slime.anims.getProgress('slime-attack') === 1){
      player.setVelocityX(-125);
      player.setVelocityY(-100);
      player.anims.play('hurt', true);
      slimeatk.play();
  } else if(slime.anims.getCurrentKey() === 'slime-attack' && slimeposition === "right" && slime.anims.getProgress('slime-attack') === 1){
      player.setVelocityX(125);
      player.setVelocityY(-100);
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