import {
    Mesh,
    SphereGeometry,
    MeshStandardMaterial
} from 'three';

import { COLORS } from '../../constants/Colors';

export class Sphere extends Mesh {
    constructor() {
        super();

        this.geometry = new SphereGeometry(10, 30, 15);
        this.material = new MeshStandardMaterial({ color: COLORS.sphere });
    }
}