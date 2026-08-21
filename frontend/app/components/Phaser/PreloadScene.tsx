import Phaser from 'phaser';
import { loadSprites } from '../animations/Phaser/player/player';
import { loadLambSprite } from '../animations/Phaser/animes/lamb';
import { loadBuildingImages } from '../animations/Phaser/buildings/buildings';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.tilemapTiledJSON('map', '/phazer/map/Conseguindo.json');
    this.load.image('Tiles_exterior', '/phazer/map/Tiles_exterior.png');
    this.load.image('water', '/phazer/map/water.png');
    this.load.image('estradas', '/phazer/map/PNG_Tiled/Road1_grass.png');

    loadBuildingImages(this);
    loadLambSprite(this);
    loadSprites(this);
  }

  create() {
    this.scene.start('GameScene');
  }
}
