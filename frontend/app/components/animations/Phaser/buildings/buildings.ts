import Phaser from 'phaser';
const firstGid = 1969;

const buildingHitboxes: Record<number, { w: number, h: number, offsetY?: number }> = {
    0: { w: 140, h: 280 },               // Monastery
    1: { w: 140, h: 70, offsetY: 30 },  // Archery
    2: { w: 140, h: 220 },               // Barracks
    3: { w: 100, h: 220 },               // Tower
    4: { w: 280, h: 220 },               // Castle
    5: { w: 70,  h: 40, offsetY: 30 },  // House1
    6: { w: 90,  h: 50, offsetY: 30 },  // House2
    7: { w: 90,  h: 50, offsetY: 30 },  // House3
};

export const loadBuildingImages = (scene: Phaser.Scene) => {
  scene.load.image('building_0', '/phaser/map/Blue Buildings/Monastery.png');
  scene.load.image('building_1', '/phaser/map/Blue Buildings/Archery.png');
  scene.load.image('building_2', '/phaser/map/Blue Buildings/Barracks.png');
  scene.load.image('building_3', '/phaser/map/Blue Buildings/Tower.png');
  scene.load.image('building_4', '/phaser/map/Blue Buildings/Castle.png');
  scene.load.image('building_5', '/phaser/map/Blue Buildings/House1.png');
  scene.load.image('building_6', '/phaser/map/Blue Buildings/House2.png');
  scene.load.image('building_7', '/phaser/map/Blue Buildings/House3.png');
};

export const createBuildings = (
  scene: Phaser.Scene,
  map: Phaser.Tilemaps.Tilemap
): Phaser.Physics.Arcade.StaticGroup => {
  const group = scene.physics.add.staticGroup();
  const layer = map.getObjectLayer('buildings');
  if (!layer) return group;

  layer.objects.forEach((obj) => {
    if (obj.gid === undefined || obj.x === undefined || obj.y === undefined) return;
    if (obj.width === undefined || obj.height === undefined) return;

    const tileId = obj.gid - firstGid;
    const key = `building_${tileId}`;
    const sprite = scene.physics.add.staticImage(obj.x, obj.y, key);
    sprite.setOrigin(0, 1);

    const scaleX = obj.width / sprite.width;
    const scaleY = obj.height / sprite.height;
    sprite.setScale(scaleX, scaleY);
    sprite.refreshBody();

    const hitbox = buildingHitboxes[tileId];
    if (hitbox) {
      const scaledW = sprite.displayWidth;
      const scaledH = sprite.displayHeight;
      sprite.body.setSize(hitbox.w, hitbox.h);
      sprite.body.setOffset(
        (scaledW - hitbox.w) / 2,
        (scaledH - hitbox.h) / 2 + (hitbox.offsetY ?? 0)
      );
    }

    group.add(sprite);
  });

  return group;
};
