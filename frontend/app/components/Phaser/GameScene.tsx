
import Phaser from 'phaser';
import { configControls, createControls } from '../animations/Phaser/player/controls';
import { MapManager } from './core/MapManager';
import { EntityManager } from './core/EntityManager';
import { InteractionManager } from './core/InteractionManager';
import { Door } from '../animations/Phaser/doors/door';
import UIScene from './ui/UIScene';
import { createGhost } from '../animations/Phaser/animes/ghost';
import { eventBus } from './core/EventBus';
import InventoryScene from './invetory/InventoryScene';

export default class GameScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private controls!: Phaser.Types.Input.Keyboard.CursorKeys;
    private mapManager!: MapManager;
    private entityManager!: EntityManager;
    private interactionManager!: InteractionManager;
    private doors: Door[] = [];
    private ghost!: ReturnType<typeof createGhost>;

    constructor() {
      super('GameScene');
    }

    create() {
      this.cameras.main.setViewport(0, 0, 720, 620);
      // 1. Setup do mapa
      this.mapManager = new MapManager(this);
      const { map, grassLayer, waterLayer, roadsLayer, treesLayer } = this.mapManager.create();
      // 2. Criacao de entidades
      this.entityManager = new EntityManager(this);
      this.player = this.entityManager.createPlayer(150, 360, 'right');
      const buildings = this.entityManager.createBuildings(map);
      this.entityManager.createLamb(60.67, 198);
      this.doors = this.entityManager.createDoors(map);
      // Criar minerais
      this.entityManager.createMinerals(map);
      // 3. Criar ghost (precisa de logica especial para NPC layer)
      const npcLayer = map.getObjectLayer('NPC');
      if (npcLayer) {
        npcLayer.objects.forEach((obj) => {
          if (obj.name === 'Fantasma' && obj.x !== undefined && obj.y !== undefined) {
            this.ghost = this.entityManager.createGhost(obj.x, obj.y);
          }
        });
      }
      // 4. Configurar colisoes
      this.physics.add.collider(this.player, waterLayer);
      this.physics.add.collider(this.player, grassLayer);
      this.physics.add.collider(this.player, roadsLayer);
      if (treesLayer) this.physics.add.collider(this.player, treesLayer);
      this.physics.add.collider(this.player, buildings);
      
      // 5. Configurar interacoes
      this.interactionManager = new InteractionManager(this);
      this.interactionManager.setupDoorInteraction(this.doors, this.player);
      if (this.ghost) {
        this.interactionManager.setupGhostProximity(this.ghost);
        this.physics.add.collider(this.player, this.ghost.collider);
        this.physics.add.overlap(this.player, this.ghost.overlap, () => {
          this.interactionManager.onGhostCollide(this.ghost);
        });
      }
      // 6. Configurar input
      this.controls = createControls(this);

      eventBus.on('dialogue:start', () => {
        this.player.setVelocity(0, 0);
        this.player.anims.stop();
      });

      // 7. UI
      this.time.delayedCall(100, () => {
        const ui = this.scene.get('UIScene') as UIScene;
        ui.playScript([
          { type: 'text', text: 'Bem-vindo, Ocultista!' },
          { type: 'text', text: 'Va para o culto na proxima cidade!' },
        ]);
      });
    }

    update() {
      // Controle de movimento (travado enquanto dialogo ou ghost ativo)
      const ui = this.scene.get('UIScene') as UIScene;
      const inventory = this.scene.get('InventoryScene') as InventoryScene;

      const dialoguePlaying = ui.getIsPlaying();
      const inventoryOpen = inventory.isInventoryOpen();

      if (!dialoguePlaying && !inventoryOpen) {
        configControls(this.player, this.controls, this);
      } else {
        this.player.setVelocity(0, 0);
      }
      // Atualizar interacoes
      this.interactionManager.update(this.player, this.doors, this.ghost);
    }
}