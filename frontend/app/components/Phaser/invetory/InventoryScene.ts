import Phaser from 'phaser';
import { InventoryPanel } from './InventoryPanel';
import { eventBus } from '../core/EventBus';

export default class InventoryScene extends Phaser.Scene {
    private inventoryPanel!: InventoryPanel;
    private isOpen: boolean = false;
    private iKey!: Phaser.Input.Keyboard.Key;

    constructor() {
        super('InventoryScene');
    }

    create() {
        this.cameras.main.setViewport(0, 0, 900, 680);

        this.inventoryPanel = new InventoryPanel(this, {
            x: 730,  // Lado direito (canvas agora tem 900px)
            y: 140,  // Topo
            rows: 6,
            cols: 4,
        });

        if (this.input.keyboard) {
            this.iKey = this.input.keyboard.addKey('I');
            this.input.keyboard.on('keydown-I', this.onIPressed, this);
        }

        eventBus.on('inventory:toggle', this.onToggleEvent);
        eventBus.on('inventory:close', this.onCloseEvent);

        this.events.on('destroy', () => {
            eventBus.off('inventory:toggle', this.onToggleEvent);
            eventBus.off('inventory:close', this.onCloseEvent);
        });
    }

    private onIPressed = (): void => {
        this.toggleInventory();
    };

    private onToggleEvent = (): void => {
        this.toggleInventory();
    };

    private onCloseEvent = (): void => {
        this.inventoryPanel.close();
        this.isOpen = false;
    };

    private toggleInventory(): void {
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            this.inventoryPanel.open();
        } else {
            this.inventoryPanel.close();
        }
    }

    /**
     * Retorna se o inventário está aberto.
     * Útil para GameScene saber se deve bloquear movimento.
     */
    isInventoryOpen(): boolean {
        return this.inventoryPanel?.isInventoryOpen() ?? false;
    }
}