import {
    Mesh,
    TorusGeometry,
    MeshStandardMaterial
} from 'three';

import { COLORS } from '../../constants/Colors';

export class Torus extends Mesh {
    constructor() {
        super();

        this.geometry = new TorusGeometry(5, 1, 15, 30);
        this.material = new MeshStandardMaterial({ color: COLORS.torus });

        this.position.set(0,10,0);
    }

    update() {
        this.rotation.x += 0.01;
        this.rotation.y += 0.001;
        this.rotation.z += 0.01;
    }
}