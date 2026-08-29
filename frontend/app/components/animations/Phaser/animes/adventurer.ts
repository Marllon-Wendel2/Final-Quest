import Phaser from 'phaser';

export const loadAdventurerSprite = (scene: Phaser.Scene) => {

    //idle animations
    scene.load.spritesheet(
        'adventurer_idle_down',
        'phaser/Personagens/aventureiro/Sprites/IDLE/idle_down.png',
        { frameWidth: 64, frameHeight: 80, spacing: 128 }
    );

    scene.load.spritesheet(
        'adventurer_idle_left',
        'phaser/Personagens/aventureiro/Sprites/IDLE/idle_left.png',
        { frameWidth: 64, frameHeight: 80, spacing: 128 }
    );

    scene.load.spritesheet(
        'adventurer_idle_right',
        'phaser/Personagens/aventureiro/Sprites/IDLE/idle_right.png',
        { frameWidth: 64, frameHeight: 80, spacing: 128 }
    );

    scene.load.spritesheet(
        'adventurer_idle_up',
        'phaser/Personagens/aventureiro/Sprites/IDLE/idle_up.png',
        { frameWidth: 64, frameHeight: 80, spacing: 128 }
    );

    //idle run
    scene.load.spritesheet('adventurer_run_down',
        'phaser/Personagens/aventureiro/Sprites/RUN/run_down.png',
        { frameWidth: 64, frameHeight: 80, spacing: 128 }
    );

    scene.load.spritesheet('adventurer_run_left',
        'phaser/Personagens/aventureiro/Sprites/RUN/run_left.png',
        { frameWidth: 64, frameHeight: 80, spacing: 128 }
    );

    scene.load.spritesheet('adventurer_run_right',
        'phaser/Personagens/aventureiro/Sprites/RUN/run_right.png',
        { frameWidth: 64, frameHeight: 80, spacing: 128 }
    );

    scene.load.spritesheet('adventurer_run_up',
        'phaser/Personagens/aventureiro/Sprites/RUN/run_up.png',
        { frameWidth: 64, frameHeight: 80, spacing: 128 }
    );
}

const COLLIDER_WIDTH = 20;
const COLLIDER_HEIGHT = 20;

const OVERLAP_SIZE = 60;

export const createAdventurer = (scene: Phaser.Scene, x: number, y: number) => {
    const anims = scene.anims;

    if (!anims.exists('adventurer-idle-down')) {
        anims.create({
            key: 'adventurer-idle-down',
            frames: anims.generateFrameNumbers('adventurer_idle_down', {
                start: 0,
                end: 3,
            }),
            frameRate: 5,
            repeat: -1,
        });
    }

    if (!anims.exists('adventurer-idle-left')) {
        anims.create({
            key: 'adventurer-idle-left',
            frames: anims.generateFrameNumbers('adventurer_idle_left', {
                start: 0,
                end: 3,
            }),
            frameRate: 8,
            repeat: -1,
        });
    }

    if (!anims.exists('adventurer-idle-right')) {
        anims.create({
            key: 'adventurer-idle-right',
            frames: anims.generateFrameNumbers('adventurer_idle_right', {
                start: 0,
                end: 3,
            }),
            frameRate: 8,
            repeat: -1,
        });
    }

    if (!anims.exists('adventurer-idle-up')) {
        anims.create({
            key: 'adventurer-idle-up',
            frames: anims.generateFrameNumbers('adventurer_idle_up', {
                start: 0,
                end: 3,
            }),
            frameRate: 8,
            repeat: -1,
        });
    }

    // create run animations
    if (!anims.exists('adventurer-run-down')) {
        anims.create({
            key: 'adventurer-run-down',
            frames: anims.generateFrameNumbers('adventurer_run_down', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1,
        });
    }
    if (!anims.exists('adventurer-run-left')) {
        anims.create({
            key: 'adventurer-run-left',
            frames: anims.generateFrameNumbers('adventurer_run_left', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1,
        });
    }
    if (!anims.exists('adventurer-run-right')) {
        anims.create({
            key: 'adventurer-run-right',
            frames: anims.generateFrameNumbers('adventurer_run_right', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1,
        });
    }
    if (!anims.exists('adventurer-run-up')) {
        anims.create({
            key: 'adventurer-run-up',
            frames: anims.generateFrameNumbers('adventurer_run_up', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1,
        });
    }

    const offsetX = -20;
    const sprite = scene.add.sprite(x + offsetX, y, 'adventurer_idle_down');
    const collider = scene.add.zone(x, y, COLLIDER_WIDTH * 2, COLLIDER_HEIGHT * 2);
    scene.physics.add.existing(collider, true);

    sprite.setDepth(1);
    sprite.setScale(1);

    sprite.play('adventurer-idle-down');

    const overlap = scene.add.zone(x, y, OVERLAP_SIZE, OVERLAP_SIZE);
    scene.physics.add.existing(overlap, true);

    const lookAt = (direction: 'down' | 'left' | 'right' | 'up') => {
        sprite.play(`adventurer-idle-${direction}`);
    };

    const getDirection = (): string => {
        const currentAnim = sprite.anims.currentAnim;
        if (!currentAnim) return 'down';
        return currentAnim.key.replace('adventurer-idle-', '');
    };

    const playRun = (dir: string) => {
        const key = `adventurer-run-${dir}`;
        if (sprite.anims.currentAnim?.key !== key) {
            sprite.play(key);
        }
    }

    const playIdle = (dir: string) => {
        const key = `adventurer-idle-${dir}`;
        if (sprite.anims.currentAnim?.key !== key) {
            sprite.play(key);
        }
    }

    const setPosition = (x: number, y: number) => {
        sprite.setPosition(x, y);
        if (collider.active) collider.setPosition(x, y);
        if (overlap.active) overlap.setPosition(x, y);
    }


    return {
        sprite,
        collider,
        overlap,
        lookAt,
        getDirection,
        playRun,
        playIdle,
        setPosition
    };
}