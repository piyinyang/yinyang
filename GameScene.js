import { gameover } from "./gameover.js";
import Lancachamas from "./lancachamas.js";
import { Slime } from "./slime.js";
import {Skeleton} from "./skeleton.js";
import {Jumper} from "./jumper.js";

export { GameScene, spike, player, player2, slimeatk, playerPosition, player2Position};
export { topLayer, topLayer2, topLayer3 }

/*
  Coordenadas para teleporte:

  Da sala escondida para o easter egg: 1744, 2573
  Do easter egg, dos portais, das chaves e de um dos bosses para a posição default: 1312, 1440
  Dos portais para boss 1: 96, 3616
  Dos portais para boss 2: 4000, 3616
  PRIMEIRO PORTAL NEUTRO: 3770, 1666
  SEGUNDO PORTAL NEUTRO: 2330, 1924
  Do portal neutro para posição default: 1307, 1443
  

*/

//VARIAVEIS DO PLAYER 1
var player;
var P1jump = false;
var P1jumpdelay = 0;
var playerPosition = "right"; // se o player ta virado pra esquerda ou direita
var attackcombo = 0; //define qual dos 3 ataques o jogador vai usar, possibilitando um oombo

var player2;
var P2jump = false;
var P2jumpdelay = 0;
var player2Position = "right";
var attackcombo2 = 0;

var slime = {p1: null, p2: null, p3: null, p4: null, p5: null, p6: null, p7: null};
var skeleton = {p1: null, p2: null, p3: null, p4: null, p5: null, p6: null, p7: null};

var platforms; //variavel das plataformas
var cursors; //variavel das setas do teclado
var keyW;
var keyA;
var keyS;
var keyD;
var keyP;
var keyENTER;


// Variavel dos objetos do mapa

var spike; //variavel dos espinhos
var portal1;
var portal2;
var barreira1;
var barreira1open = false;
var barreira2;
var barreira2open = false;

var ChaveAmarela;
var possuiChaveAmarela = false;

var ChaveAzul;
var possuiChaveAzul = false;


var graphics; //nem me pergunte
var gameOver = false;
var button;

//VARIAVEIS DE SONS
var song; // musica da floresta
var swordwoosh; // som da espada
var slimeatk; // som do slime atacando
var jumping; // som do player pulando
var landing; // som do player caindo no chao
var portalsound;

//Variavel do lança-chamas
var chamas = {p1: null, p2: null, p3: null, p4: null, p5: null, p6: null, p7: null, p8: null, p9: null, p10: null, p11: null, p12: null, p13: null, p14: null, p15: null, p16: null, p17: null, p18: null, p19: null};

//Variavel do jumper
var jumper = {p1: null, p2: null, p3: null, p4: null, p5: null, p6: null, p7: null, p8: null, p9: null, p10: null, p11: null};


var topLayer;
var topLayer2;
var topLayer3;
var topLayer4;
var topLayer5;
var topLayer6;
var topLayer7;
var topLayer8;
var topLayer9;


var GameScene = new Phaser.Scene("gamescene");


// A FUNCAO PRELOAD FAZ O PRECARREGAMENTO DE IMAGENS E SONS DO JOGO
GameScene.preload = function() {
  
  //Assets do ambiente e dos objetos
  
  this.load.image("caverna","assets/ambiente/tilesets/cavernaSemfundo.png");
  this.load.image("cavernaFundo","assets/ambiente/tilesets/cavernaFundo.png");
  this.load.image("superficie","assets/ambiente/tilesets/superficie.png");
  this.load.image("background","assets/ambiente/tilesets/background.png");
  this.load.image("background2","assets/ambiente/tilesets/background2.png");
  this.load.image("environment","assets/ambiente/tilesets/environment.png");
  this.load.image("ground","assets/ambiente/tilesets/ground.png");
  this.load.image("madeiras","assets/ambiente/tilesets/madeiras.png");
  this.load.image("Easter Egg", "assets/ambiente/tilesets/Easter Egg.png");
  this.load.tilemapTiledJSON("fase1", "assets/ambiente/Fase1.2.json");
  
  

  // ASSETS DO LANÇA-CHAMAS
  this.load.spritesheet("chamas", "assets/ambiente/Lança-chamas.png", {frameWidth: 17, frameHeight: 80});
  
  // ESPINHOS  
  this.load.image("spike", "assets/ambiente/spikes_1.png");

  //ASSETS DO JUMPER
  this.load.spritesheet("jumper", "assets/ambiente/jumper.png", {frameWidth: 48, frameHeight: 32});  

  // ASSETS DOS PORTAIS
  this.load.spritesheet("portal1", "assets/ambiente/Portal 1.png", {frameWidth: 33, frameHeight: 33});
  this.load.spritesheet("portal2", "assets/ambiente/Portal 2.png", {frameWidth: 33, frameHeight: 33});


  // ASSETS DA BARREIRA 1
  this.load.spritesheet("barreira1open", "assets/ambiente/OpeningBarrier1.png", {frameWidth: 32, frameHeight: 32});
  this.load.spritesheet("barreira1idle", "assets/ambiente/IdleBarrier1.png", {frameWidth: 32, frameHeight: 32});
  // ASSETS DA CHAVE AMARELA
  this.load.spritesheet("chaveamarela", "assets/ambiente/chaveamarela.png", {frameWidth: 32, frameHeight: 32});

  // ASSETS DA BARREIRA 2
  this.load.spritesheet("barreira2open", "assets/ambiente/OpeningBarrier2.png", {frameWidth: 32, frameHeight: 32});
  this.load.spritesheet("barreira2idle", "assets/ambiente/IdleBarrier2.png", {frameWidth: 32, frameHeight: 32});
  // ASSETS DA CHAVE AZUL
  this.load.spritesheet("chaveazu", "assets/ambiente/chaveazul.png", {frameWidth: 32, frameHeight: 32});



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

  //Assets do jogador Yang
  this.load.spritesheet("yangrun", "assets/player/YangRun.png", {
    frameWidth: 50,
    frameHeight: 37
  });
  //Carregando as demais animações em um único spritesheet
  this.load.spritesheet("yang", "assets/player/YangSpriteSheet.png", {
    frameWidth: 50,
    frameHeight: 37
  });

  //SPRITESHEET DO SLIME
  this.load.spritesheet('slimesheet', 'assets/slime/slime-Sheet.png', { frameWidth: 32, frameHeight: 25 });
  this.load.image('slime0', 'assets/slime/slime0.png');

  //ASSETS DO SKELETON
  this.load.spritesheet('skeleton-attack', 'assets/skeleton/skeleton-attack.png', {frameWidth: 43, frameHeight: 37});
  this.load.spritesheet('skeleton-die', 'assets/skeleton/skeleton-die.png', {frameWidth: 33, frameHeight: 32});
  this.load.spritesheet('skeleton-hurt', 'assets/skeleton/skeleton-hurt.png', {frameWidth: 30, frameHeight: 32});
  this.load.spritesheet('skeleton-idle', 'assets/skeleton/skeleton-idle.png', {frameWidth: 24, frameHeight: 32});
  this.load.spritesheet('skeleton-walk', 'assets/skeleton/skeleton-walk.png', {frameWidth: 22, frameHeight: 33});


  //PRELOAD DE AUDIOS
  this.load.audio("song", "assets/sounds/bgm/Techno-Caper.mp3");
  this.load.audio("swordwoosh", "assets/sounds/sfx/battle/swordwoosh.mp3");
  this.load.audio("slimeatk", "assets/sounds/sfx/battle/slime-attack.mp3");
  this.load.audio("jumping", "assets/sounds/sfx/movement/jump1.mp3");
  this.load.audio("landing", "assets/sounds/sfx/movement/landing1.mp3");
  this.load.audio("portalsound", "assets/sounds/sfx/SFX_Portal.mp3");




  //ICONE DE FULLSCREEN
  this.load.spritesheet("fullscreen", "assets/fullscreen.png", {
    frameWidth: 64,
    frameHeight: 64
  });

// FIM DO PRELOAD
};

// A FUNCAO CREATE CRIA AS COISAS DENTRO DO JOGO
GameScene.create = function() {
  
  // CRIACAO DOS SONS
  song = this.sound.add("song");
  swordwoosh = this.sound.add("swordwoosh");
  slimeatk = this.sound.add("slimeatk");
  jumping = this.sound.add("jumping");
  landing = this.sound.add("landing");
  portalsound = this.sound.add("portalsound");

  //toca musica em loop
  song.play({
    loop: true
  });


  // CRIACAO DO CENARIO E DO BACKGROUND
  
  var map = this.add.tilemap("fase1");

  
  var terrain = map.addTilesetImage("cavernaSemfundo", "caverna");
  var terrain2 = map.addTilesetImage("superficie", "superficie");
  var terrain3 = map.addTilesetImage("background", "background");
  var terrain4 = map.addTilesetImage("background2", "background2");
  var terrain5 = map.addTilesetImage("madeiras", "madeiras");
  var terrain6 = map.addTilesetImage("ground", "ground");
  var terrain7 = map.addTilesetImage("environment", "environment");
  var terrain8 = map.addTilesetImage("cavernaFundo", "cavernaFundo");
  var terrain9 = map.addTilesetImage("Easter Egg", "Easter Egg");


  //criando os niveis do mapa

    topLayer3 = map.createStaticLayer("topLayer3", [terrain3], 0, 0);
    topLayer4 = map.createStaticLayer("topLayer4", [terrain4], 0, 0);

    // CRIACAO DOS ESPINHOS
    spike = this.physics.add.staticGroup();
    spike.create(590, 490, "spike");
    spike.create(992, 410, "spike").setScale(1.3).setSize(150,20);
    spike.create(2188, 1670, "spike").setScale(1.3).setSize(115,20).setOffset(-6,-1);
    spike.create(2314, 1670, "spike").setScale(1.3).setSize(115,20).setOffset(-6,-1);
    spike.create(2440, 1670, "spike").setScale(1.3).setSize(115,20).setOffset(-6,-1);
    spike.create(2566, 1670, "spike").setScale(1.3).setSize(115,20).setOffset(-6,-1);
    spike.create(3710, 890, "spike").setScale(1.3).setSize(115,20).setOffset(-6,-1);
    spike.create(3836, 890, "spike").setScale(1.3).setSize(115,20).setOffset(-6,-1);
    spike.create(3962, 890, "spike").setScale(1.3).setSize(115,18).setOffset(-6,2);
    spike.create(1820, 2263, "spike").setScale(1.3).setSize(115,20).setOffset(-6,-1);
    spike.create(1946, 2263, "spike").setScale(1.3).setSize(115,20).setOffset(-6,-1);
    spike.create(2072, 2263, "spike").setScale(1.3).setSize(115,20).setOffset(-6,-1);
    spike.create(2198, 2263, "spike").setScale(1.3).setSize(115,20).setOffset(-6,-1);
    spike.create(2326, 2263, "spike").setScale(1.3).setSize(115,20).setOffset(-6,-1);
    spike.create(2452, 2263, "spike").setScale(1.3).setSize(115,20).setOffset(-6,-1);
    spike.create(3456, 1880, "spike");
    

    //FIM DA CRIAÇAO DE ESPINHOS

    topLayer = map.createStaticLayer("topLayer", [terrain], 0, 0);
    topLayer2 = map.createStaticLayer("topLayer2", [terrain2], 0, 0);
    topLayer5 = map.createStaticLayer("topLayerCastle1", [terrain5]);
    topLayer6 = map.createStaticLayer("topLayerCastle2", [terrain6]);
    topLayer7 = map.createStaticLayer("topLayerCastle3", [terrain7]);
    topLayer8 = map.createStaticLayer("LayerSecreto", [terrain8]);
    topLayer9 = map.createStaticLayer("EasterEgg", [terrain9]);

    // CRIACAO DO PORTAL 1
    portal1 = this.physics.add.sprite(2825, 1927 , "portal1");
    portal1.setSize(15, 30);
    portal1.setBounce(0);
    portal1.setCollideWorldBounds(true);

    // CRIACAO DO PORTAL 1
    portal2 = this.physics.add.sprite(2825, 2100 , "portal2");
    portal2.setSize(15, 30);
    portal2.setBounce(0);
    portal2.setCollideWorldBounds(true);

    // CRIACAO DA BARREIRA 1
    barreira1 = this.physics.add.sprite(2735, 1895, "barreira1idle").setScale(1.5, 2);
    barreira1.setSize(20, 32).setOffset(6, 0);
    barreira1.setBounce(0);
    barreira1.setCollideWorldBounds(true);
    barreira1.setImmovable(true);

    // CRIACAO DA CHAVE AMARELA
    ChaveAmarela = this.physics.add.sprite(100, 100, "chaveamarela");
    ChaveAmarela.setBounce(0);
    ChaveAmarela.setCollideWorldBounds(true);
    ChaveAmarela.setImmovable(true);

    // CRIACAO DA BARREIRA 2
    barreira2 = this.physics.add.sprite(2735, 2100, "barreira2idle").setScale(1.5, 2);
    barreira2.setSize(20, 32).setOffset(6, 0);
    barreira2.setBounce(0);
    barreira2.setCollideWorldBounds(true);
    barreira2.setImmovable(true);

    // CRIACAO DA CHAVE AZUL 
    ChaveAzul = this.physics.add.sprite(200, 200, "chaveazul");
    ChaveAzul.setBounce(0);
    ChaveAzul.setCollideWorldBounds(true);
    ChaveAzul.setImmovable(true);

  // CRIACAO DO JOGADOR 1
  player = this.physics.add.sprite(2800, 2100, "yin");
  player.setSize(13, 25, true).setOffset(18, 10);
  player.setBounce(0);
  player.setCollideWorldBounds(true);

  // CRIACAO DO JOGADOR 2
  player2 = this.physics.add.sprite(150, 350, "yang");
  player2.setSize(13, 25, true).setOffset(18, 10);
  player2.setBounce(0);
  player2.setCollideWorldBounds(true);

  // CRIAÇAO DOS LANÇA-CHAMAS

  chamas.p1 = new Lancachamas(this, 1624, 1120, 0);
  chamas.p2 = new Lancachamas(this, 1608, 1120, 0);
  chamas.p3 = new Lancachamas(this, 1480, 1476, 0);
  chamas.p4 = new Lancachamas(this, 1656, 1476, 5100);
  chamas.p5 = new Lancachamas(this, 1832, 1476, 0);
  chamas.p6 = new Lancachamas(this, 184, 1940, 0);
  chamas.p7 = new Lancachamas(this, 263, 1940, 2550);
  chamas.p8 = new Lancachamas(this, 392, 2167, 0);
  chamas.p9 = new Lancachamas(this, 584, 2167, 5100);
  chamas.p10 = new Lancachamas(this, 776, 2167, 0);
  chamas.p11 = new Lancachamas(this, 968, 2167, 5100);
  chamas.p12 = new Lancachamas(this, 1576, 2245, 0);
  chamas.p13 = new Lancachamas(this, 1624, 2245, 5100);
  chamas.p14 = new Lancachamas(this, 1672, 2245, 5100);
  chamas.p15 = new Lancachamas(this, 1720, 2245, 0);
  chamas.p16 = new Lancachamas(this, 1992, 2071, 5100);
  chamas.p17 = new Lancachamas(this, 2008, 2071, 5100);

  // CRIACAO DOS JUMPERS

  jumper.p1 = new Jumper(this, 496, 1815, -900);
  jumper.p2 = new Jumper(this, 624, 1527, -900);
  jumper.p3 = new Jumper(this, 1136, 2183, -900);
  jumper.p4 = new Jumper(this, 4048, 2487, -900);
  jumper.p5 = new Jumper(this, 3744, 2263, -900);
  jumper.p6 = new Jumper(this, 3936, 1943, -1200);
  jumper.p7 = new Jumper(this, 144, 3159, -1000);
  jumper.p8 = new Jumper(this, 2496, 3334, -1200);
  jumper.p9 = new Jumper(this, 2240, 3655, -1200);
  jumper.p10 = new Jumper(this, 1328, 3335, -1200);
  jumper.p11 = new Jumper(this, 1584, 3655, -1200);


  


  // CRIACAO DOS SLIMES

  slime.p1 = new Slime(this, 400, 350, 400);
  //slime.p2 = new Slime(this, 800, 350, 800);
  //slime.p3 = new Slime(this, 1200, 350, 1200);
  //slime.p4 = new Slime(this, 1600, 350, 1600);

  // CRIACAO DOS SKELETONS

  skeleton.p1 = new Skeleton(this, 350, 1700, 350);


  // ADICAO DO TECLADO

  cursors = this.input.keyboard.createCursorKeys();
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keyA= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
  keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

  //pointer = this.input.addPointer(1);

  // ADICIONANDO COLISAO AO JOGO

  // LAYERS
  topLayer.setCollisionByProperty({ collides: true });
  topLayer2.setCollisionByProperty({ collides: true });
  // PLAYERS
  this.physics.add.collider(player, topLayer);
  this.physics.add.collider(player, topLayer2);
  this.physics.add.collider(player2, topLayer);
  this.physics.add.collider(player2, topLayer2);
  // BARREIRAS
  this.physics.add.collider(barreira1, topLayer);
  this.physics.add.collider(barreira1, topLayer2);
  this.physics.add.collider(barreira2, topLayer);
  this.physics.add.collider(barreira2, topLayer2);
  this.physics.add.collider(player, barreira1, Barreira1OPEN, null, this);
  this.physics.add.collider(player, barreira2, Barreira2OPEN, null, this);
  this.physics.add.collider(player2, barreira1, Barreira1OPEN2, null, this);
  this.physics.add.collider(player2, barreira2, Barreira2OPEN2, null, this);
  // CHAVES
  this.physics.add.collider(ChaveAmarela, topLayer);
  this.physics.add.collider(ChaveAmarela, topLayer2);
  this.physics.add.collider(ChaveAzul, topLayer);
  this.physics.add.collider(ChaveAzul, topLayer2);
  this.physics.add.overlap(player, ChaveAmarela, ColetarChaveAM1, null, this);
  this.physics.add.overlap(player2, ChaveAmarela, ColetarChaveAM2, null, this);
  this.physics.add.overlap(player, ChaveAzul, ColetarChaveAZ1, null, this);
  this.physics.add.overlap(player2, ChaveAzul, ColetarChaveAZ2, null, this);


  // PORTAIS
  this.physics.add.collider(portal1, topLayer);
  this.physics.add.collider(portal1, topLayer2);
  this.physics.add.collider(portal2, topLayer);
  this.physics.add.collider(portal2, topLayer2);
  this.physics.add.overlap(player, portal1, P1Teleport1, null, this);
  this.physics.add.overlap(player2, portal1, P2Teleport1, null, this);
  this.physics.add.overlap(player, portal2, P1Teleport2, null, this);
  this.physics.add.overlap(player2, portal2, P2Teleport2, null, this);
  // ESPINHOS
  this.physics.add.overlap(player, spike, hitSpike, null, this);
  this.physics.add.overlap(player2, spike, hitSpike2, null, this);



  
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
    key: "yin-idle",
    frames: this.anims.generateFrameNumbers("yin", { start: 38, end: 41 }),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: "yin-run",
    frames: this.anims.generateFrameNumbers("yinrun", { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "yin-jump",
    frames: this.anims.generateFrameNumbers("yin", { start: 14, end: 17 }),
    frameRate: 8,
    repeat: 0
  });

  this.anims.create({
    key: "yin-fall",
    frames: this.anims.generateFrameNumbers("yin", { start: 22, end: 23 }),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: "yin-crouch",
    frames: this.anims.generateFrameNumbers("yin", { start: 4, end: 7 }),
    frameRate: 7,
    repeat: -1
  });

  this.anims.create({
    key: "yin-attack1",
    frames: this.anims.generateFrameNumbers("yin", { start: 42, end: 46 }),
    frameRate: 20,
    delay: 100
  });

  this.anims.create({
    key: "yin-attack2",
    frames: this.anims.generateFrameNumbers("yin", { start: 47, end: 52 }),

    frameRate: 20,
    delay: 100
  });

  this.anims.create({
    key: "yin-attack3",
    frames: this.anims.generateFrameNumbers("yin", { start: 53, end: 58 }),
    frameRate: 20,
    delay: 100
  });

  this.anims.create({
    key: "yin-hurt",
    frames: this.anims.generateFrameNumbers("yin", { start: 59, end: 61 }),
    frameRate: 9,
    repeat: -1
  });

  // ANIMACOES DO PLAYER 2
  this.anims.create({
    key: "yang-idle",
    frames: this.anims.generateFrameNumbers("yang", { start: 38, end: 41 }),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: "yang-run",
    frames: this.anims.generateFrameNumbers("yangrun", { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "yang-jump",
    frames: this.anims.generateFrameNumbers("yang", { start: 14, end: 17 }),
    frameRate: 8,
    repeat: 0
  });

  this.anims.create({
    key: "yang-fall",
    frames: this.anims.generateFrameNumbers("yang", { start: 22, end: 23 }),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: "yang-crouch",
    frames: this.anims.generateFrameNumbers("yang", { start: 4, end: 7 }),
    frameRate: 7,
    repeat: -1
  });

  this.anims.create({
    key: "yang-attack1",
    frames: this.anims.generateFrameNumbers("yang", { start: 42, end: 46 }),
    frameRate: 20,
    delay: 100
  });

  this.anims.create({
    key: "yang-attack2",
    frames: this.anims.generateFrameNumbers("yang", { start: 47, end: 52 }),

    frameRate: 20,
    delay: 100
  });

  this.anims.create({
    key: "yang-attack3",
    frames: this.anims.generateFrameNumbers("yang", { start: 53, end: 58 }),
    frameRate: 20,
    delay: 100
  });

  this.anims.create({
    key: "yang-hurt",
    frames: this.anims.generateFrameNumbers("yang", { start: 59, end: 61 }),
    frameRate: 9,
    repeat: -1
  });

  // ANIMACAO DO PORTAL 1
  this.anims.create({
    key: "portal1girando",
    frames: this.anims.generateFrameNumbers("portal1", { start: 0, end: 19 }),
    frameRate: 9,
    repeat: -1
  });
  // ANIMACAO DO PORTAL 2
  this.anims.create({
    key: "portal2girando",
    frames: this.anims.generateFrameNumbers("portal2", { start: 0, end: 19 }),
    frameRate: 9,
    repeat: -1
  });

  //ANIMACOES DA BARREIRA 1
  this.anims.create({
    key: "barreira1idle",
    frames: this.anims.generateFrameNumbers("barreira1idle", { start: 0, end: 11 }),
    frameRate: 9,
    repeat: -1
  });
  
  this.anims.create({
    key: "barreira1open",
    frames: this.anims.generateFrameNumbers("barreira1open", { start: 0, end: 6 }),
    frameRate: 7,
    repeat: 0
  });

    // ANIMACOES DA BARREIRA 2
  this.anims.create({
    key: "barreira2idle",
    frames: this.anims.generateFrameNumbers("barreira2idle", { start: 0, end: 11 }),
    frameRate: 9,
    repeat: -1
  });
  this.anims.create({
    key: "barreira2open",
    frames: this.anims.generateFrameNumbers("barreira2open", { start: 0, end: 6 }),
    frameRate: 7,
    repeat: 0
  });

  // ANIMACOES DAS CHAVES

  this.anims.create({
    key: "ChaveAmarela",
    frames: this.anims.generateFrameNumbers("chaveamarela", { start: 0, end: 6}),
    frameRate: 7,
    repeat: -1
  });
  this.anims.create({
    key: "ChaveAzul",
    frames: this.anims.generateFrameNumbers("chaveazul", { start: 0, end: 9}),
    frameRate: 9,
    repeat: -1
  });

// FIM DO CREATE
};

// A FUNCAO UPDATE EH A QUE FAZ O JOGO ACONTECER, ELA SE REPETE INFINITAMENTE VÃRIAS VEZES POR SEGUNDO
GameScene.update = function() {

  jumper.p1.update();
  jumper.p2.update();
  jumper.p3.update();
  jumper.p4.update();
  jumper.p5.update();
  jumper.p6.update();
  jumper.p7.update();
  jumper.p8.update();
  jumper.p9.update();
  jumper.p10.update();
  jumper.p11.update();
  
  slime.p1.update();
  //slime.p2.update();
  //slime.p3.update();
  //slime.p4.update();

  skeleton.p1.update();

  chamas.p1.update();
  chamas.p2.update();
  chamas.p3.update();
  chamas.p4.update();
  chamas.p5.update();
  chamas.p6.update();
  chamas.p7.update();
  chamas.p8.update();
  chamas.p9.update();
  chamas.p10.update();
  chamas.p11.update();
  chamas.p12.update();
  chamas.p13.update();
  chamas.p14.update();
  chamas.p15.update();
  chamas.p16.update();
  chamas.p17.update();


    // ANIMACAO DO PORTAL 1

    if(portal1.anims.getCurrentKey() != "portal1girando"){
      portal1.anims.play("portal1girando", true);
    }
    // ANIMACAO DO PORTAL 2

    if(portal2.anims.getCurrentKey() != "portal2girando"){
      portal2.anims.play("portal2girando", true);
    }

    // ANIMACAO DA BARREIRA 1

    if(barreira1.anims.getCurrentKey() === "barreira1open" && barreira1.anims.getProgress("barreira1open") === 1){
      barreira1.disableBody(true, true);
    }
    else if(barreira1.anims.getCurrentKey() === "barreira1open" && barreira1.anims.getProgress("barreira1open") < 1){
    }
    else if(barreira1.anims.getCurrentKey() != "barreira1idle" && barreira1.anims.getCurrentKey() != "barreira1open" && barreira1open === false){
      barreira1.anims.play("barreira1idle", true);
    }

    // ANIMACAO DA BARREIRA 2

    if(barreira2.anims.getCurrentKey() === "barreira2open" && barreira2.anims.getProgress("barreira2open") === 1){
      barreira2.disableBody(true, true);
    }
    else if(barreira2.anims.getCurrentKey() === "barreira2open" && barreira2.anims.getProgress("barreira2open") < 1){
    }
    else if(barreira2.anims.getCurrentKey() != "barreira2idle" && barreira2.anims.getCurrentKey() != "barreira2open" && barreira2open === false){
      barreira2.anims.play("barreira2idle", true);
    }

  
    //          PLAYER 1 ANIMATIONS

    if (keyP.isDown) {
      console.log(player.body.position.x, player.body.position.y);
    }

    if (P1jump === true){
      P1jumpdelay ++;
    }
  
    if (player.anims.getCurrentKey() === "yin-idle"){
      player.setSize(13, 25, true).setOffset(18, 10);
    }
    

    //          HURT
    if (
    player.anims.getCurrentKey() === "yin-hurt" &&
    player.anims.getProgress("yin-hurt") < 1
  ) {
    player.setTint(0xff0000);
  } else if (
    player.anims.getCurrentKey() === "yin-hurt" &&
    player.anims.getProgress("yin-hurt") === 1
  ) {
    player.clearTint();
    player.anims.play("yin-idle", true);

  


    //      ATTACK 1
  } else if (
    player.anims.getCurrentKey() === "yin-attack1" &&
    player.anims.getProgress("yin-attack1") < 1 &&
    playerPosition === "right"
  ) {
    player.setSize(15, 30, true).setOffset(25, 5);
  } else if (
    player.anims.getCurrentKey() === "yin-attack1" &&
    player.anims.getProgress("yin-attack1") < 1 &&
    playerPosition === "left"
  ) {
    player.setSize(15, 30, true).setOffset(10, 5);
  } else if (
    player.anims.getCurrentKey() === "yin-attack1" &&
    player.anims.getProgress("yin-attack1") === 1
  ) {
    player.anims.play("yin-idle", true);
  }

  //          ATTACK 2
  else if (
    player.anims.getCurrentKey() === "yin-attack2" &&
    player.anims.getProgress("yin-attack2") < 1 &&
    playerPosition === "right"
  ) {
    player.setSize(15, 30, true).setOffset(25, 5);
  } else if (
    player.anims.getCurrentKey() === "yin-attack2" &&
    player.anims.getProgress("yin-attack2") < 1 &&
    playerPosition === "left"
  ) {
    player.setSize(15, 30, true).setOffset(10, 5);
  } else if (
    player.anims.getCurrentKey() === "yin-attack2" &&
    player.anims.getProgress("yin-attack2") === 1
  ) {
    player.anims.play("yin-idle", true);
  }

  //           ATTACK 3
  else if (
    player.anims.getCurrentKey() === "yin-attack3" &&
    player.anims.getProgress("yin-attack3") < 1 &&
    playerPosition === "right"
  ) {
    player.setSize(15, 30, true).setOffset(25, 5);
  } else if (
    player.anims.getCurrentKey() === "yin-attack3" &&
    player.anims.getProgress("yin-attack3") < 1 &&
    playerPosition === "left"
  ) {
    player.setSize(15, 30, true).setOffset(10, 5);
  } else if (
    player.anims.getCurrentKey() === "yin-attack3" &&
    player.anims.getProgress("yin-attack3") === 1
  ) {
    player.anims.play("yin-idle", true);
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
    keyENTER.isDown &&
    cursors.down.isUp &&
    player.body.blocked.down &&
    playerPosition === "left" &&
    attackcombo === 0
  ) {
    player.setFlipX(true);
    player.setVelocityX(0);
    player.anims.play("yin-attack1", true);
    swordwoosh.play();
    attackcombo = 1;
  } else if (
    keyENTER.isDown &&
    cursors.down.isUp &&
    player.body.blocked.down &&
    playerPosition === "right" &&
    attackcombo === 0
  ) {
    player.setFlipX(false);
    player.setVelocityX(0);
    player.anims.play("yin-attack1", true);
    swordwoosh.play();
    attackcombo = 1;
  } else if (
    keyENTER.isDown &&
    cursors.down.isUp &&
    player.body.blocked.down &&
    playerPosition === "left" &&
    attackcombo === 1
  ) {
    player.setFlipX(true);
    player.setVelocityX(0);
    player.anims.play("yin-attack2", true);
    swordwoosh.play();
    attackcombo = 2;
  } else if (
    keyENTER.isDown &&
    cursors.down.isUp &&
    player.body.blocked.down &&
    playerPosition === "right" &&
    attackcombo === 1
  ) {
    player.setFlipX(false);
    player.setVelocityX(0);
    player.anims.play("yin-attack2", true);
    swordwoosh.play();
    attackcombo = 2;
  } else if (
    keyENTER.isDown &&
    cursors.down.isUp &&
    player.body.blocked.down &&
    playerPosition === "left" &&
    attackcombo === 2
  ) {
    player.setFlipX(true);
    player.setVelocityX(0);
    player.anims.play("yin-attack3", true);
    swordwoosh.play();
    attackcombo = 0;
  } else if (
    keyENTER.isDown &&
    cursors.down.isUp &&
    player.body.blocked.down &&
    playerPosition === "right" &&
    attackcombo === 2
  ) {
    player.setFlipX(false);
    player.setVelocityX(0);
    player.anims.play("yin-attack3", true);
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
    player.anims.play("yin-jump", true);
    attackcombo = 0;
  } else if (
    player.body.velocity.y < 0 &&
    cursors.left.isUp &&
    cursors.right.isUp &&
    playerPosition === "right"
  ) {
    player.setFlipX(false);
    player.setVelocityX(0);
    player.anims.play("yin-jump", true);
    attackcombo = 0;
  } else if (player.body.velocity.y < 0 && cursors.left.isDown) {
    player.setFlipX(true);
    player.setVelocityX(-300);
    player.anims.play("yin-jump", true);
    playerPosition = "left";
    attackcombo = 0;
  } else if (player.body.velocity.y < 0 && cursors.right.isDown) {
    player.setFlipX(false);
    player.setVelocityX(300);
    player.anims.play("yin-jump", true);
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
    player.anims.play("yin-fall", true);
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
    player.anims.play("yin-fall", true);
    attackcombo = 0;
  } else if (!player.body.blocked.down && player.body.velocity.y > 0 && cursors.left.isDown) {
    player.setFlipX(true);
    player.setVelocityX(-300);
    player.anims.play("yin-fall", true);
    playerPosition = "left";
    attackcombo = 0;
  } else if (!player.body.blocked.down && player.body.velocity.y > 0 && cursors.right.isDown) {
    player.setFlipX(false);
    player.setVelocityX(300);
    player.anims.play("yin-fall", true);
    playerPosition = "right";
    attackcombo = 0;
  } else if (cursors.left.isDown && player.body.blocked.down) {
    player.setFlipX(true);
    player.setVelocityX(-300);
    player.anims.play("yin-run", true);
    playerPosition = "left";
    attackcombo = 0;
  } else if (cursors.right.isDown && player.body.blocked.down) {
    player.setFlipX(false);
    player.setVelocityX(300);
    player.anims.play("yin-run", true);
    playerPosition = "right";
    attackcombo = 0;
  } else if (
    cursors.down.isDown &&
    player.body.blocked.down &&
    keyENTER.isUp &&
    playerPosition === "left"
  ) {
    player.setFlipX(true);
    player.setVelocityX(0);
    player.anims.play("yin-crouch", true);
    attackcombo = 0;
  } else if (
    cursors.down.isDown &&
    player.body.blocked.down &&
    keyENTER.isUp &&
    playerPosition === "right"
  ) {
    player.setFlipX(false);
    player.setVelocityX(0);
    player.anims.play("yin-crouch", true);
    player.setSize(13, 20, true).setOffset(18, 15);
    attackcombo = 0;
  } else if (
    player.body.blocked.down &&
    cursors.right.isUp &&
    cursors.left.isUp &&
    keyENTER.isUp &&
    cursors.down.isUp &&
    playerPosition === "left"
  ) {
    player.setFlipX(true);
    player.setVelocityX(0);
    player.anims.play("yin-idle", true);
  } else if (
    player.body.blocked.down &&
    cursors.right.isUp &&
    cursors.left.isUp &&
    keyENTER.isUp &&
    cursors.down.isUp &&
    playerPosition === "right"
  ) {
    player.setFlipX(false);
    player.setVelocityX(0);
    player.anims.play("yin-idle", true);
  }

  // PLAYER 2 ANIMATIONS

  if (P2jump === true){
    P2jumpdelay ++;
  }

  if (player2.anims.getCurrentKey("yang-idle")){
    player2.setSize(13, 25, true).setOffset(18, 10);
  }

  //          HURT
  if (
  player2.anims.getCurrentKey() === "yang-hurt" &&
  player2.anims.getProgress("yang-hurt") < 1
) {
  player2.setTint(0xff0000);
} else if (
  player2.anims.getCurrentKey() === "yang-hurt" &&
  player2.anims.getProgress("yang-hurt") === 1
) {
  player2.clearTint();
  player2.anims.play("yang-idle", true);




  //      ATTACK 1
} else if (
  player2.anims.getCurrentKey() === "yang-attack1" &&
  player2.anims.getProgress("yang-attack1") < 1 &&
  player2Position === "right"
) {
  player2.setSize(15, 30, true).setOffset(25, 5);
} else if (
  player2.anims.getCurrentKey() === "yang-attack1" &&
  player2.anims.getProgress("yang-attack1") < 1 &&
  player2Position === "left"
) {
  player2.setSize(15, 30, true).setOffset(10, 5);
} else if (
  player2.anims.getCurrentKey() === "yang-attack1" &&
  player2.anims.getProgress("yang-attack1") === 1
) {
  player2.anims.play("yang-idle", true);
}

//          ATTACK 2
else if (
  player2.anims.getCurrentKey() === "yang-attack2" &&
  player2.anims.getProgress("yang-attack2") < 1 &&
  player2Position === "right"
) {
  player2.setSize(15, 30, true).setOffset(25, 5);
} else if (
  player2.anims.getCurrentKey() === "yang-attack2" &&
  player2.anims.getProgress("yang-attack2") < 1 &&
  player2Position === "left"
) {
  player2.setSize(15, 30, true).setOffset(10, 5);
} else if (
  player2.anims.getCurrentKey() === "yang-attack2" &&
  player2.anims.getProgress("yang-attack2") === 1
) {
  player2.anims.play("yang-idle", true);
}

//           ATTACK 3
else if (
  player2.anims.getCurrentKey() === "yang-attack3" &&
  player2.anims.getProgress("yang-attack3") < 1 &&
  player2Position === "right"
) {
  player2.setSize(15, 30, true).setOffset(25, 5);
} else if (
  player2.anims.getCurrentKey() === "yang-attack3" &&
  player2.anims.getProgress("yang-attack3") < 1 &&
  player2Position === "left"
) {
  player2.setSize(15, 30, true).setOffset(10, 5);
} else if (
  player2.anims.getCurrentKey() === "yang-attack3" &&
  player2.anims.getProgress("yang-attack3") === 1
) {
  player2.anims.play("yang-idle", true);
}


//          CONDICOES PARA EXECUTAR ACOES

 else if (keyW.isDown && player2.body.blocked.down) {
  player2.setVelocityY(-350);
  jumping.play({
    volume:0.3
  });
  P2jump = true;
/*} else if (!player2.body.wasTouching.down && player2.body.touching.down){
  landing.play({
    volume: 0.3
  });*/
} else if (!player2.body.blocked.down && keyW.isDown && P2jump && P2jumpdelay >= 20){
  player2.setVelocityY(-350);
  jumping.play({
    volume:0.3
  });
  P2jump = false;
  P2jumpdelay = 0;

} else if (
  cursors.space.isDown &&
  keyS.isUp &&
  player2.body.blocked.down &&
  player2Position === "left" &&
  attackcombo2 === 0
) {
  player2.setFlipX(true);
  player2.setVelocityX(0);
  player2.anims.play("yang-attack1", true);
  swordwoosh.play();
  attackcombo2 = 1;
} else if (
  cursors.space.isDown &&
  keyS.isUp &&
  player2.body.blocked.down &&
  player2Position === "right" &&
  attackcombo2 === 0
) {
  player2.setFlipX(false);
  player2.setVelocityX(0);
  player2.anims.play("yang-attack1", true);
  swordwoosh.play();
  attackcombo2 = 1;
} else if (
  cursors.space.isDown &&
  keyS.isUp &&
  player2.body.blocked.down &&
  player2Position === "left" &&
  attackcombo2 === 1
) {
  player2.setFlipX(true);
  player2.setVelocityX(0);
  player2.anims.play("yang-attack2", true);
  swordwoosh.play();
  attackcombo2 = 2;
} else if (
  cursors.space.isDown &&
  keyS.isUp &&
  player2.body.blocked.down &&
  player2Position === "right" &&
  attackcombo2 === 1
) {
  player2.setFlipX(false);
  player2.setVelocityX(0);
  player2.anims.play("yang-attack2", true);
  swordwoosh.play();
  attackcombo2 = 2;
} else if (
  cursors.space.isDown &&
  keyS.isUp &&
  player2.body.blocked.down &&
  player2Position === "left" &&
  attackcombo2 === 2
) {
  player2.setFlipX(true);
  player2.setVelocityX(0);
  player2.anims.play("yang-attack3", true);
  swordwoosh.play();
  attackcombo2 = 0;
} else if (
  cursors.space.isDown &&
  keyS.isUp &&
  player2.body.blocked.down &&
  player2Position === "right" &&
  attackcombo2 === 2
) {
  player2.setFlipX(false);
  player2.setVelocityX(0);
  player2.anims.play("yang-attack3", true);
  swordwoosh.play();
  attackcombo2 = 0;
} else if (
  player2.body.velocity.y < 0 &&
  keyA.isUp &&
  keyD.isUp &&
  player2Position === "left"
) {
  player2.setFlipX(true);
  player2.setVelocityX(0);
  player2.anims.play("yang-jump", true);
  attackcombo2 = 0;
} else if (
  player2.body.velocity.y < 0 &&
  keyA.isUp &&
  keyD.isUp &&
  player2Position === "right"
) {
  player2.setFlipX(false);
  player2.setVelocityX(0);
  player2.anims.play("yang-jump", true);
  attackcombo2 = 0;
} else if (player2.body.velocity.y < 0 && keyA.isDown) {
  player2.setFlipX(true);
  player2.setVelocityX(-300);
  player2.anims.play("yang-jump", true);
  player2Position = "left";
  attackcombo2 = 0;
} else if (player2.body.velocity.y < 0 && keyD.isDown) {
  player2.setFlipX(false);
  player2.setVelocityX(300);
  player2.anims.play("yang-jump", true);
  player2Position = "right";
  attackcombo2 = 0;
} else if (
  !player2.body.blocked.down &&
  player2.body.velocity.y > 0 &&
  keyA.isUp &&
  keyD.isUp &&
  player2Position === "left"
) {
  player2.setFlipX(true);
  player2.setVelocityX(0);
  player2.anims.play("yang-fall", true);
  attackcombo2 = 0;
} else if (
  !player2.body.blocked.down &&
  player2.body.velocity.y > 0 &&
  keyA.isUp &&
  keyD.isUp &&
  player2Position === "right"
) {
  player2.setFlipX(false);
  player2.setVelocityX(0);
  player2.anims.play("yang-fall", true);
  attackcombo2 = 0;
} else if (!player2.body.blocked.down && player2.body.velocity.y > 0 && keyA.isDown) {
  player2.setFlipX(true);
  player2.setVelocityX(-300);
  player2.anims.play("yang-fall", true);
  player2Position = "left";
  attackcombo2 = 0;
} else if (!player2.body.blocked.down && player2.body.velocity.y > 0 && keyD.isDown) {
  player2.setFlipX(false);
  player2.setVelocityX(300);
  player2.anims.play("yang-fall", true);
  player2Position = "right";
  attackcombo2 = 0;
} else if (keyA.isDown && player2.body.blocked.down) {
  player2.setFlipX(true);
  player2.setVelocityX(-300);
  player2.anims.play("yang-run", true);
  player2Position = "left";
  attackcombo2 = 0;
} else if (keyD.isDown && player2.body.blocked.down) {
  player2.setFlipX(false);
  player2.setVelocityX(300);
  player2.anims.play("yang-run", true);
  player2Position = "right";
  attackcombo2 = 0;
} else if (
  keyS.isDown &&
  player2.body.blocked.down &&
  cursors.space.isUp &&
  player2Position === "left"
) {
  player2.setFlipX(true);
  player2.setVelocityX(0);
  player2.anims.play("yang-crouch", true);
  attackcombo2 = 0;
} else if (
  keyS.isDown &&
  player2.body.blocked.down &&
  cursors.space.isUp &&
  player2Position === "right"
) {
  player2.setFlipX(false);
  player2.setVelocityX(0);
  player2.anims.play("yang-crouch", true);
  player2.setSize(13, 20, true).setOffset(18, 15);
  attackcombo2 = 0;
} else if (
  player2.body.blocked.down &&
  keyD.isUp &&
  keyA.isUp &&
  cursors.space.isUp &&
  keyS.isUp &&
  player2Position === "left"
) {
  player2.setFlipX(true);
  player2.setVelocityX(0);
  player2.anims.play("yang-idle", true);
} else if (
  player2.body.blocked.down &&
  keyD.isUp &&
  keyA.isUp &&
  cursors.space.isUp &&
  keyS.isUp &&
  player2Position === "right"
) {
  player2.setFlipX(false);
  player2.setVelocityX(0);
  player2.anims.play("yang-idle", true);
}
// FIM DO UPDATE
};



// FUNCOES DE DANO DOS ESPINHOS

function hitSpike(player, spike) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play("yin-idle");

  gameOver = true;
  if (gameOver === true) {
    song.stop();
    this.scene.start(gameover);
  }
};

function hitSpike2(player2, spike) {
  this.physics.pause();

  player2.setTint(0xff0000);

  player2.anims.play("yang-idle");

  gameOver = true;
  if (gameOver === true) {
    song.stop();
    this.scene.start(gameover);
  }
};

// FUNCOES DE TELEPORTE

function P1Teleport1(player, portal1){
  player.setPosition(96, 3616);
  portalsound.play();
}
function P2Teleport1(player2, portal1){
  player2.setPosition(96, 3616);
  portalsound.play();

}
function P1Teleport2(player, portal2){
  player.setPosition(4000, 3616);
  portalsound.play();

}
function P2Teleport2(player2, portal2){
  player2.setPosition(4000, 3616);
  portalsound.play();

}

function Barreira1OPEN(player, barreira1){
  if(barreira1open === false && possuiChaveAmarela === true){
    barreira1.anims.play("barreira1open");
    possuiChaveAmarela === false;
  }
}

function Barreira2OPEN(player, barreira2){
  if(barreira2open === false && possuiChaveAzul === true){
    barreira2.anims.play("barreira2open");
    possuiChaveAzul === false;
  }
}
function Barreira1OPEN2(player2, barreira1){
  if(barreira1open === false && possuiChaveAmarela === true){
    barreira1.anims.play("barreira1open");
    possuiChaveAmarela === false;
  }
}
function Barreira2OPEN2(player2, barreira2){
  if(barreira2open === false && possuiChaveAzul === true){
    barreira2.anims.play("barreira2open");
    possuiChaveAzul === false;
  }
}

function ColetarChaveAM1(player, ChaveAmarela){
  possuiChaveAmarela = true;
  ChaveAmarela.disableBody(true, true);
}
function ColetarChaveAM2(player2, ChaveAmarela){
  possuiChaveAmarela = true;
  ChaveAmarela.disableBody(true, true);
}
function ColetarChaveAZ1(player, ChaveAzul){
  possuiChaveAzul = true;
  ChaveAzul.disableBody(true, true);
}
function ColetarChaveAZ2(player2, ChaveAzul){
  possuiChaveAzul = true;
  ChaveAzul.disableBody(true, true);
}
