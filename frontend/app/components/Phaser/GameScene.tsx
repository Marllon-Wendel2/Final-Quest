import Phaser from 'phaser';
import { createPlayer } from '../animations/Phaser/player';

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

    const player = createPlayer(this);
    this.cameras.main.startFollow(player);
  }
}
