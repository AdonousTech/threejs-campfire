import { Scene, Color, FogExp2, Fog } from "three";

export class WorldScene extends Scene {

    nearFog;
    farFogExp2;

    constructor() {
        super();
        this.background = new Color( 0xcccccc );

        // Add exponential fog to the scene
        this.farFogExp2 = new FogExp2(0xffffff, 0.005)
        console.log(`Constructed WorldScene ${this}`);

        this.fog = this.farFogExp2
    }

    createScene() {
        return this;
    }

}