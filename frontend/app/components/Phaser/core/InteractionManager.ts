import Phaser from 'phaser';
import { eventBus } from './EventBus';
import UIScene from '../ui/UIScene';
import { Door } from '../../animations/Phaser/doors/door';
import { createGhost } from '../../animations/Phaser/animes/ghost';
import { createAdventurer } from '../../animations/Phaser/animes/adventurer';

export class InteractionManager {
        
    private scene: Phaser.Scene;
    private activeDoor: Door | null = null;
    private activeGhost: ReturnType<typeof createGhost> | null = null;
    private interactKey: Phaser.Input.Keyboard.Key | null = null;
    private ghostColliding = false;

    private activeAdventurer: ReturnType<typeof createAdventurer> | null = null;
    private adventurerColliding = false;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        if (scene.input.keyboard) {
        this.interactKey = scene.input.keyboard.addKey('A');
        }
    }

  /**
   * Configura a interacao com portas
   */
    setupDoorInteraction(doors: Door[], player: Phaser.Physics.Arcade.Sprite): void {
        // Registra overlap para cada porta
        doors.forEach((door) => {
        this.scene.physics.add.overlap(player, door.zone, () => {
            this.activeDoor = door;
        });
        });
        // Escuta evento de interacao com porta
        eventBus.on('door:interact', (data: { door: Door }) => {
        this.handleDoorInteract(data.door);
        });
    }

    /**
     * Configura a deteccao de proximidade do ghost
     */
    setupGhostProximity(
        ghost: ReturnType<typeof createGhost>
    ): void {
        // Escuta eventos do ghost
        eventBus.on('ghost:enter', () => {
            ghost.show();
        });
        
        eventBus.on('ghost:leave', () => {
            ghost.hide();
        });

        eventBus.on('ghost:talk', () => {
            const ui = this.scene.scene.get('UIScene') as UIScene;
            ui.playScript([{type: 'text', text: 'Sozinho você não pode passar!', speaker: 'Fantasma',
                speakerColor: 'font_gold'}])
        });
    }

    /**
     * Chamado pelo collider player x ghost.zone
     */
    onGhostCollide(ghost: ReturnType<typeof createGhost>): void {
        this.ghostColliding = true;
        if (!this.activeGhost) {
            this.activeGhost = ghost;
            eventBus.emit('ghost:enter');
            eventBus.emit('ghost:talk');
        }
    }

    setupAdventurerInteraction(): void {}

    onAdventurerCollide(adventurer: ReturnType<typeof createAdventurer>): void {
        this.adventurerColliding = true;
        if (!this.activeAdventurer) {
            this.activeAdventurer = adventurer;
        }
    }

    private startAdventurerDialogue(): void {
        const ui = this.scene.scene.get('UIScene') as UIScene;

        ui.playScript([
            {
                type: 'text',
                text: 'Olá, viajante! Não esperava encontrar ninguém por aqui.',
                speaker: 'Aventureiro',
                speakerColor: 'font_gold',
            },
            {
                type: 'text',
                text: 'Estou procurando minerais aqui na região.',
                speaker: 'Aventureiro',
                speakerColor: 'font_gold',
            },
            {
                type: 'text',
                text: 'Você está precisando de ajuda? Consiga ouro para mim e irei com você até o fim!',
                speaker: 'Aventureiro',
                speakerColor: 'font_gold',
            }
        ]);
    }

    /**
     * Atualiza a cada frame (chamado pelo GameScene)
     */
    update(player: Phaser.Physics.Arcade.Sprite, doors: Door[], _ghost?: ReturnType<typeof createGhost>): void {
        // Verifica interacao com porta (tecla A)
        if (this.activeDoor && this.interactKey && Phaser.Input.Keyboard.JustDown(this.interactKey)) {
            eventBus.emit('door:interact', { door: this.activeDoor });
        }

        // Verifica saida da zona da porta
        const isOverlappingDoor = doors.some((door) => {
        const bounds = door.zone.getBounds();
        return Phaser.Geom.Intersects.RectangleToRectangle(
            player.getBounds(),
            bounds
        );
        });

        if (!isOverlappingDoor) {
        this.activeDoor = null;
        }

        // Saida do ghost: se nao colidiu neste frame, jogador saiu da zona
        if (this.activeGhost && !this.ghostColliding) {
            this.activeGhost = null;
            eventBus.emit('ghost:leave');
        }
        this.ghostColliding = false;

        if (this.activeAdventurer && !this.adventurerColliding) {
            this.activeAdventurer = null;
        }
        this.adventurerColliding = false;

        // Se está perto E pressionou A → inicia diálogo
        if (
            this.activeAdventurer &&
            this.interactKey &&
            Phaser.Input.Keyboard.JustDown(this.interactKey)
        ) {
            this.startAdventurerDialogue();
        }
    }


    /**
     * Lida com a interacao com porta trancada
     */
    private handleDoorInteract(door: Door): void {
        if (!door.data.isOpen) {
        // Toca som
        this.scene.sound.play('door_locked');
        // Tween de shake
        this.scene.tweens.add({
            targets: door.zone,
            x: door.zone.x + 3,
            duration: 80,
            yoyo: true,
            repeat: 2,
            onComplete: () => {
            door.zone.x = door.data.x;
            },
        });
        // Mostra mensagem
        const ui = this.scene.scene.get('UIScene') as UIScene;
        ui.playScript([{ type: 'text', text: 'A porta esta trancada' }]);
        }
    }

    /**
     * Remove todos os listeners (cleanup)
     */
    destroy(): void {
        eventBus.off('door:interact', this.handleDoorInteract);
        // Outros cleanups se necessario
    }
}