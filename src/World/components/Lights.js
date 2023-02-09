import { AmbientLight, DirectionalLight, PointLight } from 'three';

export class Lights {

    lights;

    constructor() {
        this.lights = [];

        const dirLight1 = new DirectionalLight( 0xffee88, 3 );
        dirLight1.position.set( 15, 10, 5 );
        this.lights.push(dirLight1);

        const dirLight2 = new DirectionalLight( 0x002288, 2 );
        dirLight2.position.set( -1, -1, -1 );
        this.lights.push(dirLight2);

        const ambientLight = new AmbientLight( 0x222222 );
        this.lights.push(ambientLight);

        this.fire = new PointLight( 0xff6600, 10, 1 );
        this.fire.position.set( 0, 0, 0 );
        this.lights.push(this.fire);
    }

    createLights() {
        return this.lights;
    }

    updateLights(time) {
        this.fire.intensity = Math.sin(time) + 1.5;
        this.fire.color.setHSL( Math.sin(time), 0.5, 0.5 );
    }

}