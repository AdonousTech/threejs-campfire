import { Mesh, PlaneGeometry } from "three";
import { SmokeMaterial } from "../systems/materials/SmokeMaterial";

export class Smoke extends Mesh {
    constructor() {
        super();

        this.geometry = new PlaneGeometry(window.innerWidth, window.innerHeight, 100, 100);
        this.material = new SmokeMaterial().createMaterial();
        this.position.set( 0,0,30 );
    }

    createSmoke() {
        return this;
    }
}