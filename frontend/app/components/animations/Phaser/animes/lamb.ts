import Phaser from 'phaser';

export const loadLambSprite = (scene: Phaser.Scene) => {
    scene.load.spritesheet('lamb', 'phazer/map/Lamb_animation_with_shadow.png', {
        frameWidth: 32,
        frameHeight: 32,
    });
};

export const createLambAnimations = (scene: Phaser.Scene) => {
    scene.anims.create({
        key: 'lamb-walk-left',
        frames: scene.anims.generateFrameNumbers('lamb', { start: 12, end: 17 }),
        frameRate: 8,
        repeat: -1,
    });

    scene.anims.create({
        key: 'lamb-walk-right',
        frames: scene.anims.generateFrameNumbers('lamb', { start: 18, end: 23 }),
        frameRate: 8,
        repeat: -1,
    }); 
};

export const createLamb = (scene: Phaser.Scene, x: number, y: number) => {
    createLambAnimations(scene);

    const lamb =  scene.add.sprite(x, y, 'lamb');
    lamb.play('lamb-walk-right');

    scene.tweens.chain({
        targets: lamb,
        loop: -1,
        tweens: [
        { x: 375.33, duration: 4000, onStart: () => lamb.play('lamb-walk-right') },
        { x: 60.67,  duration: 4000, onStart: () => lamb.play('lamb-walk-left') },
        ],
    });

    return lamb;
}