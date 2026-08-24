import Phaser from 'phaser';

export const loadGhostSprite = (scene: Phaser.Scene) => {
    scene.load.spritesheet('ghost-flight', 'phaser/Personagens/Onre/Flight.png', {
        frameWidth: 128,
        frameHeight: 128,
    });
    scene.load.spritesheet('ghost-idle', 'phaser/Personagens/Onre/Idle.png', {
        frameWidth: 128,
        frameHeight: 128,
    });
    scene.load.spritesheet('ghost-dead', 'phaser/Personagens/Onre/Dead.png', {
        frameWidth: 128,
        frameHeight: 128,
    });
};

const COLLIDER_SIZE = 20;
const OVERLAP_SIZE = 30;

export const createGhost = (scene: Phaser.Scene, x: number, y: number) => {
    scene.anims.create({
        key: 'ghost-appear',
        frames: scene.anims.generateFrameNumbers('ghost-flight', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 0,
    });

    scene.anims.create({
        key: 'ghost-idle',
        frames: scene.anims.generateFrameNumbers('ghost-idle', { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1,
    });

    scene.anims.create({
        key: 'ghost-death',
        frames: scene.anims.generateFrameNumbers('ghost-dead', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 0,
    });

    const ghost = scene.add.sprite(x, y - 25, 'ghost-flight');
    ghost.setVisible(false);
    ghost.setDepth(1);
    ghost.setScale(0.7);
    ghost.setFlipX(true);

    const collider = scene.add.zone(x, y, COLLIDER_SIZE * 2, COLLIDER_SIZE * 2);
    scene.physics.add.existing(collider, true);

    const overlap = scene.add.zone(x, y, OVERLAP_SIZE * 2, OVERLAP_SIZE * 2);
    scene.physics.add.existing(overlap, true);

    let isAlive = false;
    let isDying = false;

    const show = () => {
        if (isAlive || isDying) return;

        isAlive = true;
        ghost.setVisible(true);
        ghost.play('ghost-appear');

        ghost.once('animationcomplete-ghost-appear', () => {
            if (isAlive) {
                ghost.play('ghost-idle');
                scene.tweens.add({
                    targets: ghost,
                    y: ghost.y - 20,
                    duration: 800,
                    ease: 'Sine.easeInOut',
                    yoyo: true,
                    repeat: -1,
                });
            }
        });
    };

    const hide = () => {
        if (!isAlive || isDying) return;

        isDying = true;
        ghost.stop();
        ghost.play('ghost-death');

        ghost.once('animationcomplete-ghost-death', () => {
            ghost.setVisible(false);
            isAlive = false;
            isDying = false;
        });
    }

    return { ghost, collider, overlap, show, hide, stop };
};
