import Phaser from 'phaser';
import { createPlayer } from '../animations/Phaser/player/player';
import { configControls, createControls } from '../animations/Phaser/player/controls';

export default class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private controls!: Phaser.Types.Input.Keyboard.CursorKeys;
  private water!: Phaser.Tilemaps.TilemapLayer;
  private grass!: Phaser.Tilemaps.TilemapLayer;

  constructor() {
    super('GameScene');
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });

    const tilesExt = map.addTilesetImage('Tiles_exterior', 'Tiles_exterior');
    const tileWater = map.addTilesetImage('water', 'water');
    const tileRoad = map.addTilesetImage('estradas', 'estradas');


    
    const grassLayer = map.createLayer('Grama', tilesExt!, 0, 0);
    const waterLayer = map.createLayer('agua', tileWater!, 0, 0);
    const roadLayer = map.createLayer('estradas', tileRoad!, 0, 0);

    if(!waterLayer) throw new Error('Water layer not found');


    this.water = waterLayer as Phaser.Tilemaps.TilemapLayer;
    this.grass = grassLayer as Phaser.Tilemaps.TilemapLayer;
    this.water.setCollisionByProperty({ collider: true });
    this.grass.setCollisionByProperty({ collider: true });
        this.player = createPlayer(this, 150, 360, 'right');

    this.physics.add.collider(this.player, this.water);
    this.physics.add.collider(this.player, this.grass);

    const firstGid = 1969;
    const buildingsLayer = map.getObjectLayer('buildings');
    if (buildingsLayer) {
      buildingsLayer.objects.forEach((obj) => {
        const tileId = obj.gid - firstGid;
        const key = `building_${tileId}`;
        const sprite = this.physics.add.sprite(obj.x, obj.y, key);
        sprite.setOrigin(0, 1);
        sprite.setImmovable(true);
        
        // Aplicar escala baseada no tamanho definido no Tiled
        const scaleX = obj.width / sprite.width;
        const scaleY = obj.height / sprite.height;
        sprite.setScale(scaleX, scaleY);
      });
    }

    //cabras
    this.anims.create({
      key: 'lamb-walk-left',
      frames: this.anims.generateFrameNumbers('lamb', { start: 12, end: 17 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'lamb-walk-right',
      frames: this.anims.generateFrameNumbers('lamb', { start: 18, end: 23 }),
      frameRate: 8,
      repeat: -1,
    });

    // Sprite no ponto de inÃ­cio
    const lamb = this.add.sprite(60.67, 198, 'lamb');
    lamb.play('lamb-walk-right');

    // Patrulha em loop: direita â esquerda â direita â ...
    this.tweens.chain({
      targets: lamb,
      loop: -1,
      tweens: [
        { x: 375.33, duration: 4000, onStart: () => lamb.play('lamb-walk-right') },
        { x: 60.67,  duration: 4000, onStart: () => lamb.play('lamb-walk-left') },
      ],
    });


    this.physics.collide(this.player, this.water)
    this.controls = createControls(this)
  }

  update() {
      configControls(this.player, this.controls, this)
  }
}
