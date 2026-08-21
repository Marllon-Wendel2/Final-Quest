import Phaser from 'phaser';
import { loadSprites } from '../animations/Phaser/player/player';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.tilemapTiledJSON('map', '/phazer/map/Conseguindo.json');
    this.load.image('Tiles_exterior', '/phazer/map/Tiles_exterior.png');
    this.load.image('water', '/phazer/map/water.png');
    this.load.image('estradas', '/phazer/map/PNG_Tiled/Road1_grass.png');

    this.load.image('building_0', '/phazer/map/Blue Buildings/Monastery.png');
    this.load.image('building_1', '/phazer/map/Blue Buildings/Archery.png');
    this.load.image('building_2', '/phazer/map/Blue Buildings/Barracks.png');
    this.load.image('building_3', '/phazer/map/Blue Buildings/Tower.png');
    this.load.image('building_4', '/phazer/map/Blue Buildings/Castle.png');
    this.load.image('building_5', '/phazer/map/Blue Buildings/House1.png');
    this.load.image('building_6', '/phazer/map/Blue Buildings/House2.png');
    this.load.image('building_7', '/phazer/map/Blue Buildings/House3.png');

    this.load.spritesheet('lamb', 'phazer/map/Lamb_animation_with_shadow.png', {
      frameWidth: 32,
      frameHeight: 32,
    })

    loadSprites(this);
  }

  create() {
    this.scene.start('GameScene');
  }
}
