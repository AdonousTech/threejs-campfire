import { Camera } from "./components/Camera";
import { Lights } from "./components/Lights";
import { PlayerCharacter } from "./components/PlayerCharacter";
import { Renderer } from "./systems/Renderer";
import { Resizer } from "./systems/Resizer";
import { WorldScene } from "./components/Scene";
import { Landscape } from "./components/Landscape";
import { Controls } from "./components/Controls";
import { Fireballs } from "./components/FireBalls";
import { BasicParticleGeometry } from "./systems/particles/BasicParticleGeometry";
import { SmokeSystem } from "./systems/particles/SmokeParticles";
import { Ground } from "./components/Ground";

// Props
import { loadFirelog } from "./models/Firelog";
 
export class World {

    scene;
    camera;
    controls;
    fireball;
    ground;
    landscape;
    lights;
    particleGeometry;
    renderer;
    resizer;
    smokeSystem;

    constructor(container) {
        this.camera = new Camera().createCamera();
        this.scene = new WorldScene().createScene();
        this.renderer = new Renderer().createRenderer();
        
        container.append(this.renderer.domElement);

        // Create components
        // Update the camera matrix with latest data before constructing PC
        this.camera.updateMatrixWorld();
        
        // Add lights
        this.lights = new Lights()
        this.lights.createLights().forEach(light => {
            this.scene.add(light);
        });

        // Add Camera controls
        this.controls = new Controls(this.camera, this.renderer.domElement).createControls();


        // Fireballs
        this.fireball = new Fireballs().createFireball();
        //console.log('this.fireball :: ', this.fireball);
        this.fireball.getBalls().forEach(fireball => {
            this.scene.add(fireball);
        });


        // Particles
        this.particleGeometry = new BasicParticleGeometry(this.scene).createParticles();
        this.scene.add(this.particleGeometry);

        // Smoke Particles
        this.smokeSystem = new SmokeSystem().createParticles();
        this.addSmokeSystemParticles();
        this.scene.add(this.smokeSystem.group);
        console.log('scene after smoke :: ', this.scene);

        // Activate Resizer
        this.resizer = new Resizer(container, this.camera, this.renderer);
    }

    async init() {
        const firelog1 = await loadFirelog();
        //console.log('returned firelog1 :: ', firelog1);
        //this.controls.target.copy(firelog1.position)
        firelog1.scale.set( 5, 5, 5 );
        this.scene.add(firelog1);
        //console.log('this.scene :: ', this.scene);
    }

    addSmokeSystemParticles() {
        for (let i = 0; i < 200; i++) {
            this.smokeSystem.addParticle();
        }
    }

    getSmokeSystem() {
        return this.smokeSystem;
    }

    getCamera() {
        return this.camera;
    }

    getControls() {
        return this.controls;
    }

    getFireball() {
        return this.fireball;
    }

    getLights() {
        return this.lights;
    }

    getScene() {
        return this.scene;
    }

    getrenderer() {
        return this.renderer;
    }

    getPC() {
        return this.PC;
    }

    getMaterialSphere() {
        return this.materialSphere;
    }

    getParticleGeometry() {
        console.log('this.particleGeometry;', this.particleGeometry)
        return this.particleGeometry;
    }

    render() {
        // draw a single frame
        this.renderer.render(this.scene, this.camera);
    }
}