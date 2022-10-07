import {
    Mesh,
    SphereGeometry,
    MeshStandardMaterial
} from 'three';

import { COLORS } from '../../constants/Colors';

export class Star extends Mesh {
    constructor() {
        super();

        this.geometry = new SphereGeometry(0.1, 24, 24);
        this.material = new MeshStandardMaterial({
            color: COLORS.star
        });
    }

    update(x, y, z) {
        this.position.set(x, y, z);
    }
}