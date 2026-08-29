import Phaser from 'phaser';

export interface GoldPickup {
    sprite: Phaser.GameObjects.Sprite;
    collider: Phaser.GameObjects.Zone;
    overlap: Phaser.GameObjects.Zone;
    id: string;
}

const OVERLAP_SIZE = 30;
const COLLIDER_SIZE = 15;

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

export const createMinerals = (scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap): GoldPickup[] => {
    const golds: GoldPickup[] =[];

    createGoldAnimations(scene);

    const mineralLayer = map.getObjectLayer('minerais');
    if (!mineralLayer) return golds;

    mineralLayer.objects.forEach((obj) => {
        if (obj.name === 'gold' && obj.x !== undefined && obj.y !== undefined) {
            const gold = scene.add.sprite(obj.x, obj.y, 'gold1');
            gold.setScale(0.175)
            gold.play('gold-idle');
            gold.setDepth(0);

            const overlap = scene.add.zone(obj.x, obj.y, OVERLAP_SIZE, OVERLAP_SIZE);
            scene.physics.add.existing(overlap, true);

            const collider = scene.add.zone(obj.x, obj.y, COLLIDER_SIZE, COLLIDER_SIZE);
            scene.physics.add.existing(collider, true);

            const id = `gold_${obj.x}_${obj.y}`;

            golds.push({ sprite: gold, collider, overlap, id });
        }
    });

    return golds;
};
