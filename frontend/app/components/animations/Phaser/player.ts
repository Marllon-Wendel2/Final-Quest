import Phaser from 'phaser'
export const loadSprites = (scene: Phaser.Scene) => {
    scene.load.spritesheet("cultist_idle", '/phazer/Personagens/Cultist/Cultist1_Idle.png', {
        frameWidth: 32,
        frameHeight: 32,
        spacing:0
    })
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
}

export const createPlayer = (scene: Phaser.Scene) => {
    const player = scene.physics.add.sprite(100, 100, 'cultist_idle');
    createAnimations(scene);
    player.play('cultist-idle-down');
    return player;
}