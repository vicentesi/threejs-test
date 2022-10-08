import {
    Mesh,
    SphereGeometry,
    MeshBasicMaterial
} from 'three';

import { COLORS } from '../../constants/Colors';

export class CellItem extends Mesh {
    constructor() {
        super();

        this.geometry = new SphereGeometry(0.4, 4, 2);
        this.material = new MeshBasicMaterial({
            wireframe: true,
            color: COLORS.torus
        });
    }
}