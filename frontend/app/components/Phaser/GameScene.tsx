import Phaser from 'phaser';
import { createPlayer } from '../animations/Phaser/player/player';
import { configControls, createControls } from '../animations/Phaser/player/controls';
import { createLamb } from '../animations/Phaser/animes/lamb';
import { createBuildings } from '../animations/Phaser/buildings/buildings';
import { createDoors, Door } from '../animations/Phaser/doors/door'; 

import UIScene from './ui/UIScene';

export default class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private controls!: Phaser.Types.Input.Keyboard.CursorKeys;
  private water!: Phaser.Tilemaps.TilemapLayer;
  private grass!: Phaser.Tilemaps.TilemapLayer;
  private houses!: Phaser.Physics.Arcade.StaticGroup;

  private doors: Door[] = [];
  private activeDoor: Door | null = null;
  private interactKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super('GameScene');
  }

  create() {
    this.cameras.main.setViewport(0, 0, 720, 620);

    const map = this.make.tilemap({ key: 'map' });

    const tilesExt = map.addTilesetImage('Tiles_exterior', 'Tiles_exterior');
    const tileWater = map.addTilesetImage('water', 'water');
    const tileRoad = map.addTilesetImage('estradas', 'estradas');


    
    const grassLayer = map.createLayer('Grama', tilesExt!, 0, 0);
    const waterLayer = map.createLayer('agua', tileWater!, 0, 0);
    map.createLayer('estradas', tileRoad!, 0, 0);

    if(!waterLayer) throw new Error('Water layer not found');

    const ui = this.scene.get('UIScene') as UIScene;

    this.water = waterLayer as Phaser.Tilemaps.TilemapLayer;
    this.grass = grassLayer as Phaser.Tilemaps.TilemapLayer;
    this.water.setCollisionByProperty({ collider: true });
    this.grass.setCollisionByProperty({ collider: true });
  
    this.player = createPlayer(this, 150, 360, 'right');

    this.physics.add.collider(this.player, this.water);
    this.physics.add.collider(this.player, this.grass);

    this.houses = createBuildings(this, map);

    createLamb(this, 60.67, 198);

    this.doors = createDoors(this, map);


    this.physics.add.collider(this.player, this.houses);
    this.physics.collide(this.player, this.water);
    this.controls = createControls(this);

    if (this.input.keyboard) {
      this.interactKey = this.input.keyboard.addKey('A');
    }
    
    this.doors.forEach((door) => {
      this.physics.add.overlap(this.player, door.zone, () => {
        // Callback chamado ENQUANTO o jogador esta sobre a zona
        this.activeDoor = door;
      });
    });
    this.time.delayedCall(100, () => {
      ui.playScript([
        { type: 'text', text: 'Bem-vindo, Ocultista!' },
        { type: 'text', text: 'Vá para o culto na próxima cidade!' },
      ]);
    });
  }

  update() {
    configControls(this.player, this.controls, this)

       // 1. Verifica se Z foi pressionado NESTE FRAME (nao segurado)
    if (this.activeDoor && Phaser.Input.Keyboard.JustDown(this.interactKey)) {
      const door = this.activeDoor;
      // 2. Verifica se a porta esta fechada
      if (!door.data.isOpen) {
        // --- EFEITOS (explicados no Proximo Passo) ---
        this.sound.play('door_locked');
        this.tweens.add({
          targets: door.zone,
          x: door.zone.x + 3,
          duration: 80,
          yoyo: true,
          repeat: 2,
          onComplete: () => {
            door.zone.x = door.data.x;
          },
        });
        const ui = this.scene.get('UIScene') as UIScene;
        ui.playScript([{ type: 'text', text: 'A porta esta trancada' }]);
      }
    }
    // 3. Limpa activeDoor quando o jogador sai da zona
    const isOverlapping = this.doors.some((door) => {
      const bounds = door.zone.getBounds();
      return Phaser.Geom.Intersects.RectangleToRectangle(
        this.player.getBounds(),
        bounds
      );
    });
    if (!isOverlapping) {
      this.activeDoor = null;
    }
  }
}
