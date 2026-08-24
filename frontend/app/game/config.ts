import Phaser from 'phaser';
import PreloadScene from '../components/Phaser/PreloadScene';
import GameScene from '../components/Phaser/GameScene';
import UIScene from '../components/Phaser/ui/UIScene';
import InventoryScene from '../components/Phaser/invetory/InventoryScene';

export function createGameConfig(parent: string): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    width: 900,
    height: 680,
    parent,
    pixelArt: true,
    backgroundColor: '#0d1a0d',
    scene: [PreloadScene, GameScene, UIScene, InventoryScene],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: { x: 0, y: 0 },
      },
    },
  };
}
