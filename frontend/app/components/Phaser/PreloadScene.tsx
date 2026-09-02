import Phaser from 'phaser';
import { loadSprites } from '../animations/Phaser/player/player';
import { loadLambSprite } from '../animations/Phaser/animes/lamb';
import { loadBuildingImages } from '../animations/Phaser/buildings/buildings';
import { loadGhostSprite } from '../animations/Phaser/animes/ghost';
import { loadBridges } from '../animations/Phaser/bridges/bridges';
import { loadTilemap } from '../animations/Phaser/map/tilemap';
import { loadUI, loadInventory } from '../animations/Phaser/ui/ui';
import { loadGoldSprite } from '../animations/Phaser/minerals/gold';
import { loadAudio } from '../animations/Phaser/audio/audio';
import { loadAdventurerSprite } from '../animations/Phaser/animes/adventurer';
import { loadAdventurerFameleSprite } from '../animations/Phaser/animes/adventurerFamele';

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
    loadAdventurerSprite(this);
    loadSprites(this);
    loadBridges(this);
    loadInventory(this);
    loadGoldSprite(this);
    loadAdventurerFameleSprite(this)
  }

  create() {
    this.scene.launch('UIScene');
    this.scene.launch('InventoryScene');
    this.scene.start('GameScene');
  }
}
