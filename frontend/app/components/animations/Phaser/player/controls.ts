import Phaser from 'phaser';

const defaultVelocity = 100;


export const createControls = (scene: Phaser.Scene): Phaser.Types.Input.Keyboard.CursorKeys => {
    if (!scene.input.keyboard) {
        throw new Error('Keyboard plugin is not enabled in this scene.');
    }
    return scene.input.keyboard.createCursorKeys();
}

export const configControls = (
    player,
    controls: Phaser.Types.Input.Keyboard.CursorKeys,
    scene: Phaser.Scene
) => {

    player.setVelocityY(0);
    player.setVelocityX(0);
    if(controls.right.isDown) {
        moveRight(player);
        return;
    }

    if(controls.left.isDown) {
        moveLeft(player);
        return;
    }

    if(controls.down.isDown) {
        moveDown(player);
        return;
    }

    if(controls.up.isDown) {
        moveUp(player);
        return
    }

    const lastDirection = player.getData('direction') || 'down';
    player.anims.play(`cultist-idle-${lastDirection}`, true);
}

const moveRight = (player): void => {
    player.setData('direction', 'right');
    player.anims.play('cultist-walk-right', true);
    player.setVelocityX(defaultVelocity)
}
const moveLeft = (player): void => {
    player.setData('direction', 'left');
    player.anims.play('cultist-walk-left', true);
    player.setVelocityX(-defaultVelocity)
} 

const moveUp = (player) => {
    player.setData('direction', 'up');
    player.anims.play('cultist-walk-up', true);
    player.setVelocityY(-defaultVelocity);
}

const moveDown = (player) => {
    player.setData('direction', 'down');
    player.anims.play('cultist-walk-down', true);
    player.setVelocityY(defaultVelocity);
}