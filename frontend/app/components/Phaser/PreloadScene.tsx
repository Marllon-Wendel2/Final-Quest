import Phaser from 'phaser';
import { loadSprites } from '../animations/Phaser/player/player';
import { loadLambSprite } from '../animations/Phaser/animes/lamb';
import { loadBuildingImages } from '../animations/Phaser/buildings/buildings';
import { loadGhostSprite } from '../animations/Phaser/animes/ghost';
import { loadBridges } from '../animations/Phaser/bridges/bridges';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.tilemapTiledJSON('map', '/phaser/map/Conseguindo.json');
    this.load.image('Tiles_exterior', '/phaser/map/Tiles_exterior.png');
    this.load.image('water', '/phaser/map/water.png');
    this.load.image('estradas', '/phaser/map/PNG_Tiled/Road1_grass.png');

    this.load.image('special_paper', '/phaser/UI/SpecialPaper.png');
    this.load.audio('door_locked', '/SoundsEffects/macaneta.wav');


    loadBuildingImages(this);
    loadLambSprite(this);
    loadGhostSprite(this)
    loadSprites(this);
    loadBridges(this)
  }

  create() {
    this.scene.launch('UIScene'); 
    this.scene.start('GameScene');
  }
}
