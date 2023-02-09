import { IcosahedronGeometry, Mesh } from "three";
import { RainbowMaterial } from "./RainbowMaterial";
import { FireGlowMaterial } from "./FireGlowMaterial";

export class MaterialSphere extends Mesh {

    constructor() {
        super();

        this.geometry = new IcosahedronGeometry(7, 5);
        
        // Materials
        const rainbowMaterial = new RainbowMaterial().createMaterial();
        const fireGlowMaterial = new FireGlowMaterial().createMaterial();
        
        
        this.material = fireGlowMaterial;
        this.position.setY(5)
        this.position.setZ(3)

        this.castShadow = true;

    }


    create() {
        return this;
    }

    update() {
        this.rotation.x += 0.01;
        this.rotation.y += 0.01;
    }

}