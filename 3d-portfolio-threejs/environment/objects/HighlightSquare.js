import {
    Mesh,
    MeshBasicMaterial,
    DoubleSide,
    PlaneGeometry
} from 'three';

import { COLORS } from '../../constants/Colors';

export class HighlightSquare extends Mesh {
    constructor() {
        super();

        this.geometry = new PlaneGeometry(1, 1);
        this.material = new MeshBasicMaterial({
            side: DoubleSide,
            color: COLORS.white,
            transparent: true
        });

        this.rotateX(-Math.PI / 2);
        this.position.set(0.5, 0, 0.5);
    }
}