import Phaser from 'phaser';

export type SlotType = 'free' | 'occupied';

export interface SlotConfig {
    x: number;
    y: number;
    type: SlotType;
    itemKey?: string;
    slotIndex?: number;
}

export class InventorySlot extends Phaser.GameObjects.Container {
    private slotBackground: Phaser.GameObjects.Image;
    private itemIcon: Phaser.GameObjects.Image | null = null;
    private slotType: SlotType;
    private slotIndex: number;
    private currentitemKey: string | null = null;

    public static readonly SLOT_SIZE = 32;

    constructor(scene: Phaser.Scene, config: SlotConfig) {
        super(scene, config.x, config.y);

        this.slotType = config.type;
        this.slotIndex = config.slotIndex ?? 0;

        const backgroundKey = config.type === 'free'
            ? 'inventory_free_slot'
            : 'inventory_occupied_slot';

        this.slotBackground = scene.add.image(0, 0, backgroundKey);
        this.add(this.slotBackground);

        if (config.itemKey && config.type === 'occupied') {
            this.setItem(config.itemKey);
        }

        this.setSize(InventorySlot.SLOT_SIZE, InventorySlot.SLOT_SIZE);

        this.setInteractive(
            new Phaser.Geom.Rectangle(
                -InventorySlot.SLOT_SIZE / 2,
                -InventorySlot.SLOT_SIZE / 2,
                InventorySlot.SLOT_SIZE,
                InventorySlot.SLOT_SIZE
            ),
            Phaser.Geom.Rectangle.Contains
        );

        scene.add.existing(this);
    }

    setItem(itemKey: string): void {
        // Remover ítem anterior
        this.removeItem();

        // Criar ítem e centralizar
        this.itemIcon = this.scene.add.image(0, 0, itemKey);
        this.add(this.itemIcon);

        // Atualizar tipo e chave
        this.slotType = 'occupied';
        this.currentitemKey = itemKey;

        // Atualizar imagem de fundo para ocupado
        this.slotBackground.setTexture('inventory_occupied_slot');
    }

    removeItem(): void {
        if (this.itemIcon) {
            this.itemIcon.destroy(); // Remove da cena
            this.itemIcon = null;
        }
        this.currentitemKey = null;
        this.slotType = 'free';
        this.slotBackground.setTexture('inventory_free_slot');
    }

    getInfo(): { index: number; type: SlotType; item: string | null } {
        return {
            index: this.slotIndex,
            type: this.slotType,
            item: this.currentitemKey,
        };
    }
}