import Phaser from 'phaser'
export const loadSprites = (scene: Phaser.Scene) => {
    scene.load.spritesheet("cultist_idle", '/phazer/Personagens/Cultist/Cultist1_Idle.png', {
        frameWidth: 32,
        frameHeight: 32,
        spacing:0
    });

    scene.load.spritesheet("cultist_walk", '/phazer/Personagens/Cultist/Cultist1_Walk.png', {
        frameWidth: 32,
        frameHeight: 32,
        spacing:0
    });

    scene.load.spritesheet("cultist_pray", '/phazer/Personagens/Cultist/Cultist1_Pray.png', {
        frameWidth: 32,
        frameHeight: 32,
        spacing:0
    });
}

export const createAnimations = (scene: Phaser.Scene) => {
    scene.anims.create({
        key: 'cultist-idle-down',
        frames: scene.anims.generateFrameNumbers('cultist_idle', { start: 0, end: 11 }),
        frameRate: 10,
        repeat: -1,
        yoyo: true
    });

    scene.anims.create({
        key: 'cultist-idle-left',
        frames: scene.anims.generateFrameNumbers('cultist_idle', { start: 12, end: 23 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'cultist-idle-right',
        frames: scene.anims.generateFrameNumbers('cultist_idle', { start: 24, end: 35 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
    key: 'cultist-idle-up',
        frames: scene.anims.generateFrameNumbers('cultist_idle', { start: 36, end: 41 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'cultist-walk-down',
        frames: scene.anims.generateFrameNumbers('cultist_walk', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'cultist-walk-left',
        frames: scene.anims.generateFrameNumbers('cultist_walk', { start: 6, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'cultist-walk-right',
        frames: scene.anims.generateFrameNumbers('cultist_walk', { start: 12, end: 17 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'cultist-walk-up',
        frames: scene.anims.generateFrameNumbers('cultist_walk', { start: 18, end: 23 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'cultist-pray-down',
        frames: scene.anims.generateFrameNumbers('cultist_pray', { start: 0, end: 11 }),
        frameRate: 8,
        repeat: -1
    });
}

export const createPlayer = (scene: Phaser.Scene, x: number = 100, y: number = 100, direction: string = 'down') => {
    const player = scene.physics.add.sprite(x, y, 'cultist_idle');
    createAnimations(scene);
    player.setData('direction', direction);
    player.play(`cultist-idle-${direction}`);
    return player;
}