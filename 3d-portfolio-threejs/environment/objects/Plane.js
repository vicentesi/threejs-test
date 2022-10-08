import {
    Mesh,
    PlaneGeometry,
    MeshStandardMaterial,
    MeshBasicMaterial,
    DoubleSide
} from 'three';

import { COLORS } from '../../constants/Colors';

export class Plane extends Mesh {
    constructor(width, height) {
        super();

        this.name = 'ground';
        this.geometry = new PlaneGeometry(width, height);
        this.material = new MeshBasicMaterial({
            side: DoubleSide,
            color: COLORS.platform,
            visible: false // but present in scene
        });
        this.rotateX(-Math.PI / 2);
    }
}