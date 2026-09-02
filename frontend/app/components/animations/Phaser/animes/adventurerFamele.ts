import Phaser from 'phaser'

export const loadAdventurerFameleSprite = (scene: Phaser.Scene) => {

    //idl animations
    scene.load.spritesheet(
        'adventurer_famele_idle_right',
        'phaser/Personagens/Aventureira/Idle/idle.png',
        { frameWidth: 48, frameHeight: 64}
    )

    //walk animations
    scene.load.spritesheet(
        'adventurer_famele_walk_down',
        'phaser/Personagens/Aventureira/Walk/walk_down.png',
        { frameWidth: 48, frameHeight: 64 }
    );
    scene.load.spritesheet(
        'adventurer_famele_walk_up',
        'phaser/Personagens/Aventureira/Walk/walk_up.png',
        { frameWidth: 48, frameHeight: 64 }
    );
    scene.load.spritesheet(
        'adventurer_famele_walk_left',
        'phaser/Personagens/Aventureira/Walk/walk_left_down.png',
        { frameWidth: 48, frameHeight: 64 }
    );
    scene.load.spritesheet(
        'adventurer_famele_walk_right',
        'phaser/Personagens/Aventureira/Walk/walk_right_down.png',
        { frameWidth: 48, frameHeight: 64 }
    );
}

export const createAdventurerFamele = (scene: Phaser.Scene, x: number, y:number) => {
    const anims = scene.anims;
    
    if (!anims.exists('adventurer_famele_idle_right')) {
        anims.create({
            key: 'adventurer_famele_idle_right',
            frames: anims.generateFrameNumbers('adventurer_famele_idle_right', {
                start: 40,
                end: 47,
            }),
            frameRate: 8,
            repeat: -1
        })
    }

    if (!anims.exists('adventurer_famele_walk_down')) {
        anims.create({
            key: 'adventurer_famele_walk_down',
            frames: anims.generateFrameNumbers('adventurer_famele_walk_down', {
                start: 0,
                end: 7,
            }),
            frameRate: 8,
            repeat: -1,
        });
    }
    if (!anims.exists('adventurer_famele_walk_up')) {
        anims.create({
            key: 'adventurer_famele_walk_up',
            frames: anims.generateFrameNumbers('adventurer_famele_walk_up', {
                start: 0,
                end: 7,
            }),
            frameRate: 8,
            repeat: -1,
        });
    }
    if (!anims.exists('adventurer_famele_walk_left')) {
        anims.create({
            key: 'adventurer_famele_walk_left',
            frames: anims.generateFrameNumbers('adventurer_famele_walk_left', {
                start: 0,
                end: 7,
            }),
            frameRate: 8,
            repeat: -1,
        });
    }
    if (!anims.exists('adventurer_famele_walk_right')) {
        anims.create({
            key: 'adventurer_famele_walk_right',
            frames: anims.generateFrameNumbers('adventurer_famele_walk_right', {
                start: 0,
                end: 7,
            }),
            frameRate: 8,
            repeat: -1,
        });
    }

    const sprite = scene.physics.add.sprite(x, y, 'adventurer_famele_idle_right')
    sprite.setDepth(1);

    const collider = scene.add.zone(x, y, 20, 40);
    scene.physics.add.existing(collider, true);

    const overlap = scene.add.zone(x, y, 60, 60);
    scene.physics.add.existing(overlap, true);

    sprite.play('adventurer_famele_idle_right');

    const playRun = (dir: string) => {
        const key = `adventurer_famele_walk_${dir}`;
        if (sprite.anims.currentAnim?.key !== key) {
            sprite.play(key);
        }
    };
    const playIdle = (dir: string) => {
        const key = `adventurer_famele_idle_${dir}`;
        if (sprite.anims.currentAnim?.key !== key) {
            sprite.play(key);
        }
    };

    return { sprite, collider, overlap, playRun, playIdle };
}
