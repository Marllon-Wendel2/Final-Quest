import Phaser from 'phaser';
import PreloadScene from '../components/Phaser/PreloadScene';
import GameScene from '../components/Phaser/GameScene';

export function createGameConfig(parent: string): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    width: 608,
    height: 432,
    parent,
    backgroundColor: '#0d1a0d',
    scene: [PreloadScene, GameScene],
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        gravity: { x: 0, y: 0 },
      },
    },
  };
}
