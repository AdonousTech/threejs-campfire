import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { Vector2 } from 'three';


export class PostProcessingHub {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.composer = new EffectComposer(this.renderer);
    this.passes = [];
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);

    this.addBloomPass();
    this.addFilmPass();
    this.addGlitchPass();
  }

  addPass(shader) {
    const pass = new ShaderPass(shader);
    this.passes.push(pass);
    this.composer.addPass(pass);
  }

  addBloomPass() {
    const bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0;
    bloomPass.strength = 1.5;
    bloomPass.radius = 0;
    this.composer.addPass(bloomPass);
  }

  addFilmPass() {
    const filmPass = new FilmPass(0.35, 0.025, 648, false);
    filmPass.renderToScreen = false;
    this.composer.addPass(filmPass);
  }

  addGlitchPass() {
    const glitchPass = new GlitchPass();
    glitchPass.renderToScreen = true;
    this.composer.addPass(glitchPass);
  }


  render() {
    console.log('rendering via effects composer', this);
    this.composer.render();
  }
}