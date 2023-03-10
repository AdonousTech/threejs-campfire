import { WebGLRenderer } from "three";

export class Renderer extends WebGLRenderer {

    constructor() {
        super({ antialias: true });
        this.antialias = true;
        this.setPixelRatio( window.devicePixelRatio );
        this.setSize( window.innerWidth, window.innerHeight );
        this.physicallyCorrectLights = true;
        this.setClearColor(0x111111);
    }

    createRenderer() {
        return this;
    }

}