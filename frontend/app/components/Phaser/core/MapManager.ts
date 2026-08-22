import Phaser from 'phaser';

export interface MapLayers {
  map: Phaser.Tilemaps.Tilemap;
  grassLayer: Phaser.Tilemaps.TilemapLayer;
  waterLayer: Phaser.Tilemaps.TilemapLayer;
}

export class MapManager {
  private scene: Phaser.Scene;
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }
  create(): MapLayers {
    const map = this.scene.make.tilemap({ key: 'map' });
    // Adiciona tilesets
    const tilesExt = map.addTilesetImage('Tiles_exterior', 'Tiles_exterior');
    const tileWater = map.addTilesetImage('water', 'water');
    const tileRoad = map.addTilesetImage('estradas', 'estradas');
    const bridgesTileset = map.addTilesetImage('Bridges', 'Bridges');
    // Cria layers
    const grassLayer = map.createLayer('Grama', tilesExt!, 0, 0);
    const waterLayer = map.createLayer('agua', tileWater!, 0, 0);
    map.createLayer('estradas', [tileRoad!, bridgesTileset!], 0, 0);
    if (!grassLayer) throw new Error('Grass layer not found');
    if (!waterLayer) throw new Error('Water layer not found');
    // Configura colisoes
    const water = waterLayer as Phaser.Tilemaps.TilemapLayer;
    const grass = grassLayer as Phaser.Tilemaps.TilemapLayer;
    water.setCollisionByProperty({ collider: true });
    grass.setCollisionByProperty({ collider: true });
    return { map, grassLayer: grass, waterLayer: water };
  }
}