import { Mesh, MeshStandardMaterial, PlaneGeometry } from "three";

export class Ground extends Mesh {
    constructor() {
        super();

        this.geometry = new PlaneGeometry( 1000, 1000, 32, 32 );
        this.material = new MeshStandardMaterial({ color: 0x9acd32 });
        this.receiveShadow = true;
        this.rotation.x = -Math.PI / 2;

    }

    createGround() {
        return this;
    }
}