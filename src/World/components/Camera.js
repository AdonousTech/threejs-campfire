import { PerspectiveCamera } from "three";

export class Camera extends PerspectiveCamera {

    constructor() {
        super();
        this.fov = 75;
        this.aspect = window.innerWidth / window.innerHeight;
        this.near = 0.1;
        this.far = 1000;
        this.position.z = 5;
    }

    createCamera() {
        return this;
    }

}