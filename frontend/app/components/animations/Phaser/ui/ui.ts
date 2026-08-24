import Phaser from 'phaser';

export const loadUI = (scene: Phaser.Scene) => {
    scene.load.image('special_paper', '/phaser/UI/SpecialPaper.png');
};

export const loadInventory = (scene: Phaser.Scene) => {
    scene.load.image('inventory_background', '/phaser/Inventory/background.png');
    scene.load.atlas('icons', '/phaser/icon/icons.png','/phaser/icon/icons.json' );
    scene.load.image('inventory_free_slot', '/phaser/Inventory/freeSlot.png');
    scene.load.image('inventory_occupied_slot', '/phaser/Inventory/occupiedSlot.png');
    scene.load.image('item_gold', '/phaser/Inventory/gold.png');
};
