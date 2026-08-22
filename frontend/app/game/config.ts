import Phaser from 'phaser';
import PreloadScene from '../components/Phaser/PreloadScene';
import GameScene from '../components/Phaser/GameScene';
import UIScene from '../components/Phaser/ui/UIScene';

export function createGameConfig(parent: string): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    width: 708,
    height: 680,
    parent,
    pixelArt: true,
    backgroundColor: '#0d1a0d',
    scene: [PreloadScene, GameScene, UIScene],
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        gravity: { x: 0, y: 0 },
      },
    },
  };
}
