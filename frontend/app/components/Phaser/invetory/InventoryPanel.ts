import Phaser from 'phaser';
import { InventorySlot } from './InventorySlot';
import { eventBus } from '../core/EventBus';
import { FONT_FAMILY, COLOR_HEX } from '../ui/FontManager';
import { getGameState } from '@/api/game-api';

export interface InventoryPanelConfig {
    x: number;
    y: number;
    rows?: number;          // Linhas da grid (padrão: 6)
    cols?: number;          // Colunas da grid (padrão: 4)
    itemsonStart?: Array<{  // Itens iniciais (opcional)
        slotIndex: number;
        itemKey: string;
    }>;
}

export class InventoryPanel extends Phaser.GameObjects.Container {
    private background: Phaser.GameObjects.Image;
    private closeButton: Phaser.GameObjects.Image;
    private titleText: Phaser.GameObjects.Text;
    private slots: InventorySlot[] = [];
    private isOpen: boolean = false;

    private readonly ROWS: number;
    private readonly COLS: number;
    private readonly SLOT_SIZE = InventorySlot.SLOT_SIZE;
    private readonly SLOT_GAP = 2;
    private readonly PANEL_PADDING = 20;

    constructor(scene: Phaser.Scene, config: InventoryPanelConfig) {
        super(scene, config.x, config.y);

        this.ROWS = config.rows ?? 6;
        this.COLS = config.cols ?? 4;

        this.background = scene.add.image(0, 0, 'inventory_background');
        this.background.setOrigin(0.5, 0.5);

        // Redimensiona o fundo para cobrir a grid + margens de borda
        const gridWidth = this.COLS * (this.SLOT_SIZE + this.SLOT_GAP) - this.SLOT_GAP;
        const gridHeight = this.ROWS * (this.SLOT_SIZE + this.SLOT_GAP) - this.SLOT_GAP;
        this.background.setDisplaySize(gridWidth + 40, gridHeight + 60);

        const bgWidth = this.background.displayWidth;
        const bgHeight = this.background.displayHeight;

        this.add(this.background);

        // Título do inventário
        this.titleText = scene.add.text(0, -bgHeight / 2 + 20, 'INVENTÁRIO', {
            fontFamily: FONT_FAMILY,
            fontSize: '16px',
            color: COLOR_HEX['font_gold'],
        });
        this.titleText.setOrigin(0.5, 0.5);
        this.add(this.titleText);

        this.closeButton = scene.add.image(
            bgWidth / 2 - 15,
            -bgHeight / 2 + 18,
            'icons',
            'icons016.png'
        );
        this.closeButton.setOrigin(0.5, 0.5);
        this.closeButton.setScale(1.5);
        this.closeButton.setInteractive({ useHandCursor: true });

        this.closeButton.on('pointerover', () => {
            this.closeButton.setTint(0xcccccc);
        });
        this.closeButton.on('pointerout', () => {
            this.closeButton.clearTint();
        });

        this.closeButton.on('pointerdown', () => {
            this.close();
        });

        this.add(this.closeButton);

        this.createSlots();

        if (config.itemsonStart) {
            config.itemsonStart.forEach(({ slotIndex, itemKey }) => {
                if (this.slots[slotIndex]) {
                    this.slots[slotIndex].setItem(itemKey);
                }
            });
        }

        this.setVisible(false);
        this.setAlpha(0);

        scene.add.existing(this);
    }

    private createSlots(): void {
        // Calcular dimensões totais da grid
        const gridWidth = this.COLS * (this.SLOT_SIZE + this.SLOT_GAP) - this.SLOT_GAP;
        const gridHeight = this.ROWS * (this.SLOT_SIZE + this.SLOT_GAP) - this.SLOT_GAP;

        // Ponto de origem da grid (canto superior esquerdo, relativo ao Container)
        const startX = -gridWidth / 2;
        const startY = -gridHeight / 2 + 10; // +10 para centralizar no espaço útil

        let slotIndex = 0;

        for (let row = 0; row < this.ROWS; row++) {
            for (let col = 0; col < this.COLS; col++) {
                // Calcular posição do slot
                const slotX = startX + col * (this.SLOT_SIZE + this.SLOT_GAP) + this.SLOT_SIZE / 2;
                const slotY = startY + row * (this.SLOT_SIZE + this.SLOT_GAP) + this.SLOT_SIZE / 2;

                // Criar slot vazio
                const slot = new InventorySlot(this.scene, {
                    x: slotX,
                    y: slotY,
                    type: 'free',
                    slotIndex: slotIndex,
                });

                this.slots.push(slot);
                this.add(slot);

                slotIndex++;
            }
        }
    }

    open(): void {
        if (this.isOpen) return;

        this.isOpen = true;
        this.setVisible(true);

        // Tween: animação de fade in
        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            duration: 200, // 200ms
            ease: 'Power2', // Curva de aceleração suave
            onComplete: () => {
                // Início da animação concluído
            },
        });

        // Notificar outras partes do sistema
        eventBus.emit('inventory:opened');
    }

    close(): void {
        if (!this.isOpen) return;

        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            duration: 200,
            ease: 'Power2',
            onComplete: () => {
                this.setVisible(false);
                this.isOpen = false;
                eventBus.emit('inventory:closed');
            },
        });
    }

    toggle(): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    getSlot(index: number): InventorySlot | undefined {
        return this.slots[index];
    }

    /**
     * Retorna todos os slots.
     */
    getAllSlots(): InventorySlot[] {
        return this.slots;
    }

    /**
     * Verifica se o inventário está aberto.
     */
    isInventoryOpen(): boolean {
        return this.isOpen;
    }

    syncInventoryWithBackend = async (): Promise<void> => {
        const gameState = await getGameState();
        if (!gameState) return;

        gameState.inventory.forEach((item) => {
            this.slots[item.slotIndex]?.setItem(item.itemKey);
        });
    };
}