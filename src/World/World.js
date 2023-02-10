import { Camera } from "./components/Camera";
import { Lights } from "./components/Lights";
import { PlayerCharacter } from "./components/PlayerCharacter";
import { Renderer } from "./systems/Renderer";
import { Resizer } from "./systems/Resizer";
import { WorldScene } from "./components/Scene";
import { Landscape } from "./components/Landscape";
import { Controls } from "./components/Controls";
import { Fireballs } from "./components/FireBalls";
import { SmokeSystem } from "./systems/particles/SmokeParticles";
import { Sound } from "./components/Sound";
import { BasicParticleGeometry } from "./systems/particles/BasicParticleGeometry";
import { PostProcessingHub } from './components/PostProcessingHub';

// Props
import { loadFirelog } from "./models/Firelog";
 
export class World {

    scene;
    camera;
    campfire;
    controls;
    fireball;
    fireCrackleSound; 
    lights;
    particleGeometry;
    postProcessingHub;
    renderer;
    resizer;
    smokeSystem;
    sound;

    constructor(container) {
        this.camera = new Camera().createCamera();
        this.scene = new WorldScene().createScene();
        this.renderer = new Renderer().createRenderer();
        this.postProcessingHub = new PostProcessingHub(this.renderer, this.scene, this.camera);
        
        // Sounds preloaded
        this.fireCrackleSound = new Sound('campfire').createSound();
        
        container.append(this.renderer.domElement);
        container.addEventListener('click', () => {
            console.log('clicked :: ');
            this.fireCrackleSound.audioElement.play();
        });

        // Create components
        
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
        this.campfire = await loadFirelog();
        this.campfire.scale.set( 5, 5, 5 );
        this.scene.add(this.campfire);
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
        this.postProcessingHub.render();
    }
}