
import Phaser from 'phaser';
import { configControls, createControls } from '../animations/Phaser/player/controls';
import { MapManager } from './core/MapManager';
import { EntityManager } from './core/EntityManager';
import { InteractionManager } from './core/InteractionManager';
import { Door } from '../animations/Phaser/doors/door';
import UIScene from './ui/UIScene';
import { createGhost } from '../animations/Phaser/animes/ghost';
import { createAdventurer } from '../animations/Phaser/animes/adventurer';
import { eventBus } from './core/EventBus';
import InventoryScene from './invetory/InventoryScene';
import { getGameState, sendGameAction } from '@/api/game-api';


export default class GameScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private controls!: Phaser.Types.Input.Keyboard.CursorKeys;
    private mapManager!: MapManager;
    private entityManager!: EntityManager;
    private interactionManager!: InteractionManager;
    private doors: Door[] = [];
    private ghost!: ReturnType<typeof createGhost>;
    private adventurerMale!: ReturnType<typeof createAdventurer>;
    private lastSavedPos = { x: 0, y: 0 };
    private saveDebounce = 0;

    constructor() {
      super('GameScene');
    }

    async create() {
      this.cameras.main.setViewport(0, 0, 720, 620);
      // 1. Setup do mapa
      this.mapManager = new MapManager(this);
      const { map, grassLayer, waterLayer, roadsLayer, treesLayer } = this.mapManager.create();
      // 2. Criacao de entidades
      this.entityManager = new EntityManager(this);

      // Carregar posição salva do backend
      const savedState = await getGameState();
      const startX = savedState?.player?.x ?? 150;
      const startY = savedState?.player?.y ?? 360;
      const startDir = savedState?.player?.direction ?? 'right';

      this.player = this.entityManager.createPlayer(startX, startY, startDir);
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

          if (obj.name === 'aventureiro' && obj.x !== undefined && obj.y !== undefined) {
              this.adventurerMale = this.entityManager.createAventurer(obj.x, obj.y);
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

      if (this.adventurerMale) {
        this.physics.add.collider(this.player, this.adventurerMale.collider);
        this.physics.add.overlap(this.player, this.adventurerMale.overlap, () => {
          this.interactionManager.onAdventurerCollide(this.adventurerMale);
        });
      }

      // 6. Configurar input
      this.controls = createControls(this);

      eventBus.on('dialogue:start', () => {
        this.player.setVelocity(0, 0);
        this.player.anims.stop();
      });

      // 7. UI - mensagem de boas-vindas apenas para novos jogadores
      if (!savedState) {
        this.time.delayedCall(100, () => {
          const ui = this.scene.get('UIScene') as UIScene;
          ui.playScript([
            { type: 'text', text: 'Bem-vindo, Ocultista!', speaker: 'Narrador (não confie muito)' },
            { type: 'text', text: 'Va para o culto na proxima cidade!', speaker: 'Narrador (não confie muito)' },
          ]);
        });
      }
    }

    update(time: number) {
      if (!this.player) return;

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

      // Salvar posição periodicamente (a cada 2s se houve movimento)
      const px = Math.round(this.player.x);
      const py = Math.round(this.player.y);
      if (
        time > this.saveDebounce &&
        (px !== this.lastSavedPos.x || py !== this.lastSavedPos.y)
      ) {
        this.saveDebounce = time + 2000;
        this.lastSavedPos = { x: px, y: py };
        const dir = this.player.getData('direction') || 'right';
        sendGameAction('PLAYER_MOVED', { x: px, y: py, direction: dir });
      }
    }
}