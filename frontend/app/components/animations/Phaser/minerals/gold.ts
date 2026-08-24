import Phaser from 'phaser';

export const loadGoldSprite = (scene: Phaser.Scene) => {
    scene.load.spritesheet('gold1', '/phaser/map/mineral/gold1.png', {
        frameWidth: 128,
        frameHeight: 128,
    });
};

export const createGoldAnimations = (scene: Phaser.Scene) => {
    scene.anims.create({
        key: 'gold-idle',
        frames: scene.anims.generateFrameNumbers('gold1', { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1,
    });
};

export const createMinerals = (scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) => {
    createGoldAnimations(scene);

    const mineralLayer = map.getObjectLayer('minerais');
    if (!mineralLayer) return;

    mineralLayer.objects.forEach((obj) => {
        if (obj.name === 'gold' && obj.x !== undefined && obj.y !== undefined) {
            const gold = scene.add.sprite(obj.x, obj.y, 'gold1');
            gold.setScale(0.175)
            gold.play('gold-idle');
            gold.setDepth(0);
        }
    });
};
