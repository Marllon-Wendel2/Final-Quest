import Phaser from 'phaser';
import { loadSprites } from '../animations/Phaser/player/player';
import { loadLambSprite } from '../animations/Phaser/animes/lamb';
import { loadBuildingImages } from '../animations/Phaser/buildings/buildings';
import { loadGhostSprite } from '../animations/Phaser/animes/ghost';
import { loadBridges } from '../animations/Phaser/bridges/bridges';
import { loadTilemap } from '../animations/Phaser/map/tilemap';
import { loadUI, loadInventory } from '../animations/Phaser/ui/ui';
import { loadAudio } from '../animations/Phaser/audio/audio';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    loadTilemap(this);
    loadUI(this);
    loadAudio(this);
    loadBuildingImages(this);
    loadLambSprite(this);
    loadGhostSprite(this);
    loadSprites(this);
    loadBridges(this);
    loadInventory(this);
  }

  create() {
    this.scene.launch('UIScene');
    this.scene.launch('InventoryScene');
    this.scene.start('GameScene');
  }
}
