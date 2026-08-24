import Phaser from 'phaser';

export const loadAudio = (scene: Phaser.Scene) => {
    scene.load.audio('door_locked', '/SoundsEffects/macaneta.wav');
};
