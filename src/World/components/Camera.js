import { AudioListener, PerspectiveCamera, Vector3 } from "three";

export class Camera extends PerspectiveCamera {


    constructor() {
        super();

        // Create an AudioListener object
        this.listener = new AudioListener();
        this.add(this.listener);

        this.fov = 40;
        this.aspect = window.innerWidth / window.innerHeight;
        this.near = 0.1;
        this.far = 1000;
        this.position.set( 0, 20, 40 );
        this.lookAt(new Vector3(0, 0, 0));
    }

    createCamera() {
        return this;
    }

}