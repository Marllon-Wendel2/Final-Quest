import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });

    const tilesExt = map.addTilesetImage('Tiles_exterior', 'Tiles_exterior');
    const water = map.addTilesetImage('water', 'water');

    map.createLayer('Grama', tilesExt!, 0, 0);
    map.createLayer('agua', water!, 0, 0);
  }
}
