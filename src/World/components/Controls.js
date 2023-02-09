import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
export class Controls extends OrbitControls {
    constructor(camera, domElement) {
        super(camera, domElement);

        this.listenToKeyEvents( window ); // optional
        this.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.dampingFactor = 0.05;
        this.screenSpacePanning = false;
        this.minDistance = 100;
        this.maxDistance = 500;
        this.enabled = true;

        // Set the minimum and maximum polar angle to restrict rotation to the x-axis
        this.minPolarAngle = Math.PI / 2;
        this.maxPolarAngle = Math.PI / 2;
    }

    createControls() {
        return this;
    }
}