import { MathUtils } from 'three';
import { World } from './World/World.js';
import { RainbowMaterial } from './World/systems/materials/RainbowMaterial.js';
import { MaterialSphere } from './World/systems/materials/MaterialSpehere.js';

let camera;
let controls;
let materialSphere;
let PC;
let renderer;
let scene;

function main() {
  // Get a reference to the container element
  const container = document.querySelector('#scene-container');

  // create a new world
  const world = new World(container);

  // Cache components
  camera = world.getCamera();
  controls = world.getControls();
  materialSphere = world.getMaterialSphere();
  PC = world.getPC();
  renderer = world.getrenderer();
  scene = world.getScene();


  // draw the scene
  world.render();

  animate();
}

function animate() {

  requestAnimationFrame( animate );
  
  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true


    // material uniforms
    const uniforms = RainbowMaterial.uniforms;
    //console.log('uniforms :: ', uniforms);
    if (uniforms) {
      uniforms.time.value += 0.01;
  }

  // Update the position of the material sphere
  materialSphere.update();

  // draw the scene
  renderer.render(scene, camera);

}

main();