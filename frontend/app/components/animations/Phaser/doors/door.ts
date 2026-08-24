import Phaser from 'phaser';

export interface DoorData {
    id: number;
    name: string;
    isOpen: boolean;
    x: number;
    y: number;
}

export interface Door {
  zone: Phaser.GameObjects.Zone;  // Area de interacao invisivel
  data: DoorData;                  // Metadados do Tiled
}

const INTERACTION_SIZE = 25;

export const createDoors = (
    scene: Phaser.Scene,
    map: Phaser.Tilemaps.Tilemap
): Door[] => {
    const doors: Door[] = [];
    const layer = map.getObjectLayer('buildings');
    if (!layer) return doors;

    layer.objects.forEach((obj) => {
        if (obj.name === undefined || !obj.name.startsWith('Porta')) return;
        if (obj.x === undefined || obj.y === undefined) return;

        const isOpenProp = obj.properties?.find(
            (p: { name: string; value: unknown }) => p.name === 'isOpen'
        );

        const isOpen = isOpenProp ? Boolean(isOpenProp.value) : false;
        const zone = scene.add.zone(obj.x, obj.y, INTERACTION_SIZE, INTERACTION_SIZE);
        scene.physics.add.existing(zone, true);

        doors.push({
            zone,
            data: {
                id: obj.id!,
                name: obj.name,
                isOpen,
                x: obj.x,
                y: obj.y,
            },
        });
    });

    return doors;
};