import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.tilemapTiledJSON('map', '/phazer/map/Conseguindo.json');
    this.load.image('Tiles_exterior', '/phazer/map/Tiles_exterior.png');
    this.load.image('water', '/phazer/map/water.png');
  }

  create() {
    this.scene.start('GameScene');
  }
}
