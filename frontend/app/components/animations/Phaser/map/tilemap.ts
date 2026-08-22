import Phaser from 'phaser';

export const loadTilemap = (scene: Phaser.Scene) => {
    scene.load.tilemapTiledJSON('map', '/phaser/map/Conseguindo.json');
    scene.load.image('Tiles_exterior', '/phaser/map/Tiles_exterior.png');
    scene.load.image('water', '/phaser/map/water.png');
    scene.load.image('estradas', '/phaser/map/PNG_Tiled/Road1_grass.png');
};
