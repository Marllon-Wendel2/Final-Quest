
import Phaser from 'phaser';
import { createPlayer } from '../../animations/Phaser/player/player';
import { createBuildings } from '../../animations/Phaser/buildings/buildings';
import { createLamb } from '../../animations/Phaser/animes/lamb';
import { createDoors, Door } from '../../animations/Phaser/doors/door';
import { createGhost } from '../../animations/Phaser/animes/ghost';
import { createMinerals, GoldPickup } from '../../animations/Phaser/minerals/gold';
import { createAdventurer } from '../../animations/Phaser/animes/adventurer';

export class EntityManager {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  createPlayer(x: number, y: number, direction: string): Phaser.Physics.Arcade.Sprite {
    return createPlayer(this.scene, x, y, direction);
  }

  createBuildings(map: Phaser.Tilemaps.Tilemap): Phaser.Physics.Arcade.StaticGroup {
    return createBuildings(this.scene, map);
  }

  createLamb(x: number, y: number): void {
    createLamb(this.scene, x, y);
  }

  createDoors(map: Phaser.Tilemaps.Tilemap): Door[] {
    return createDoors(this.scene, map);
  }

  createGhost(x: number, y: number): ReturnType<typeof createGhost> {
    return createGhost(this.scene, x, y);
  }

  createAventurer(x: number, y: number): ReturnType<typeof createAdventurer> {
    return createAdventurer(this.scene, x, y);
  }

  createMinerals(map: Phaser.Tilemaps.Tilemap): GoldPickup[] {
    return createMinerals(this.scene, map);
  }
}