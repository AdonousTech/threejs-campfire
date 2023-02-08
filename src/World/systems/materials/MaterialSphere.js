import { IcosahedronGeometry, Mesh, MeshBasicMaterial } from "three";
import { RainbowMaterial } from "./RainbowMaterial";

export class MaterialSphere extends Mesh {

    constructor() {
        super();

        this.geometry = new IcosahedronGeometry(30, 2);
        
        // Materials
        const rainbowMaterial = new RainbowMaterial().createMaterial();
        
        
        this.material = rainbowMaterial;

    }


    create() {
        return this;
    }

    update() {
        this.rotation.x += 0.01;
        this.rotation.y += 0.01;
    }

}