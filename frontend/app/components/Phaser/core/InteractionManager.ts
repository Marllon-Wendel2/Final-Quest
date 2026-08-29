import Phaser from 'phaser';
import { eventBus } from './EventBus';
import UIScene from '../ui/UIScene';
import { Door } from '../../animations/Phaser/doors/door';
import { createGhost } from '../../animations/Phaser/animes/ghost';
import { createAdventurer } from '../../animations/Phaser/animes/adventurer';
import { DialogueStep } from '../ui/dialogue-types';
import { countItems, getGameState, sendGameAction } from '@/api/game-api';

export class InteractionManager {
        
    private scene: Phaser.Scene;
    private activeDoor: Door | null = null;
    private activeGhost: ReturnType<typeof createGhost> | null = null;
    private interactKey: Phaser.Input.Keyboard.Key | null = null;
    private ghostColliding = false;
    private hasSeenGhost =  false;

    private activeAdventurer: ReturnType<typeof createAdventurer> | null = null;
    private adventurerColliding = false;
    private hasTalkedToAdventurer = false;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        if (scene.input.keyboard) {
        this.interactKey = scene.input.keyboard.addKey('Z');
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

        eventBus.on('ghost:talk', async () => {
            const gameState = await getGameState();
            const teamSize = gameState?.team?.length ?? 1;
            const ui = this.scene.scene.get('UIScene') as UIScene;

            if (teamSize >= 3) {
                ui.playScript([{
                    type: 'text',
                    text: 'Agora vocês são suficientes! Podem passar.',
                    speaker: 'Fantasma',
                    speakerColor: 'font_gold'
                }]);
            }
            if(teamSize > 1) {
                ui.playScript([{
                    type: 'text',
                    text: 'Vocês ainda não são suficiente!',
                    speaker: 'Fantasma',
                    speakerColor: 'font_gold'
                }]);
            }

            if (teamSize === 1) {
                ui.playScript([{
                    type: 'text',
                    text: 'Sozinho... você jamais passará!',
                    speaker: 'Fantasma',
                    speakerColor: 'font_gold'
                }])
            }
        });
    }

    /**
     * Chamado pelo collider player x ghost.zone
     */
    onGhostCollide(ghost: ReturnType<typeof createGhost>): void {
        this.ghostColliding = true;
        if (!this.activeGhost) {
            this.hasSeenGhost = true;
            this.activeGhost = ghost;
            eventBus.emit('ghost:enter');
            eventBus.emit('ghost:talk');

            sendGameAction('GHOST_ENCOUNTERED', {}).catch((err) => {
                console.warn('[InteractionManager] Failed to send GHOST_ENCOUNTERED:', err)
            });
        }
    }

    setupAdventurerInteraction(): void {}

    onAdventurerCollide(adventurer: ReturnType<typeof createAdventurer>): void {
        this.adventurerColliding = true;
        if (!this.activeAdventurer) {
            this.activeAdventurer = adventurer;
        }
    }

    private async startAdventurerDialogue(): Promise<void> {
        const ui = this.scene.scene.get('UIScene') as UIScene;
        const gameState = await getGameState();

        const flags = gameState?.flags || {};
        const inventory = gameState?.inventory || [];
        const missions = gameState?.missions || [];

        const backendHasSeenGhost = flags.hasSeenGhost || this.hasSeenGhost;
        const pedrasCount = countItems(inventory, 'item_gold');
        const hasDeliveryMission = missions.some(
            (m) => m.type === 'DELIVERY' && m.target === 'aventureiro' && !m.completed
        );


        // Helper local para evitar repetição de objeto
        const speak = (text: string): DialogueStep => ({
            type: 'text',
            text,
            speaker: 'Aventureiro',
            speakerColor: 'font_gold',
        });

        // CASO 1: Não viu o fantasma (Diálogo Inicial)
        if (!backendHasSeenGhost) {
            await sendGameAction('ADVENTURER_TALKED', {});
            return ui.playScript([
            speak('Olá, viajante! Não esperava encontrar ninguém por aqui.'),
            speak('Estou procurando minerais aqui na região.'),
            ]);
        }


        const deliveryCompleted = missions.some(
            (m) => m.id === 'mission-adventurer-delivery' && m.completed
        );

        if (deliveryCompleted) {
            return ui.playScript([speak('Estou com você! Vamos seguir nossa jornada.')]);
        };

        // CASO 2: Viu o fantasma (Diálogo Principal)
        const steps: DialogueStep[] = [];

        if (this.hasTalkedToAdventurer) {
            steps.push(speak('Ah, você de novo! Precisa de ajuda?'));
        }

        this.hasTalkedToAdventurer = true;

        // SUB-CASO 2A: Tem pedras suficientes -> Entrega
        if (pedrasCount >= 3) {
            steps.push(speak(`Vejo que você tem ${pedrasCount} pedras de ouro! Perfeito, entrega para mim!`));
            await sendGameAction('ITEM_USED', { itemKey: 'item_gold', quantity: 3 });
            const result = await sendGameAction('MISSION_COMPLETED', { missionId: 'mission-adventurer-delivery' });
            if (result.accepted) {
                steps.push(speak('Excelente! Agora posso seguir minha jornada. Obrigado!'));
                eventBus.emit('delivery:completed');
            } else {
                steps.push(speak('Algo deu errado... Tente novamente.'));
            }
            return ui.playScript(steps);
        }

        // SUB-CASO 2B: Já tem a missão -> Lembrete
        if (hasDeliveryMission) {
            steps.push(speak(`Você ainda precisa de ${3 - pedrasCount} pedras de ouro. Volte quando tiver 3.`));
            return ui.playScript(steps);
        }

        // SUB-CASO 2C: Não tem a missão -> Inicia Missão
        steps.push(speak('Se você quer que eu vá com você, traga 3 pedras de ouro!'));
        await sendGameAction('MISSION_STARTED', {
            missionId: 'mission-adventurer-delivery',
            missionType: 'DELIVERY',
            label: 'Contratando o aventureiro',
            target: 'aventureiro',
            required: 3,
        });

        ui.playScript(steps);
    }

    /**
     * Atualiza a cada frame (chamado pelo GameScene)
     */
    update(
        player: Phaser.Physics.Arcade.Sprite,
        doors: Door[],
        ghost: ReturnType<typeof createGhost>,
        isInteractPressed: boolean,
        dialoguePlaying: boolean
    ): void {
        // 1. Processar interações de tecla (Input)
        if (isInteractPressed && !dialoguePlaying) {
            if (this.activeDoor) {
            eventBus.emit('door:interact', { door: this.activeDoor });
            } else if (this.activeAdventurer) {
            this.startAdventurerDialogue();
            }
        }

        // 2. Limpar portas fora de alcance
        const isOverlappingDoor = doors.some((door) =>
            Phaser.Geom.Intersects.RectangleToRectangle(
            player.getBounds(),
            door.zone.getBounds()
            )
        );

        if (!isOverlappingDoor) {
            this.activeDoor = null;
        }

        // 3. Resetar estados de colisão (Ghost e Adventurer)
        if (this.activeGhost && !this.ghostColliding) {
            this.activeGhost = null;
            eventBus.emit('ghost:leave');
        }
        this.ghostColliding = false;

        if (this.activeAdventurer && !this.adventurerColliding) {
            this.activeAdventurer = null;
        }
        this.adventurerColliding = false;
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