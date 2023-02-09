import { World } from './World/World.js';
import { RainbowMaterial } from './World/systems/materials/RainbowMaterial.js';
import { FireGlowMaterial } from './World/systems/materials/FireGlowMaterial.js';
import { Fireballs } from './World/components/FireBalls.js';

let camera;
let controls;
let fireballs;
let lights;
let materialSphere;
let particleGeometry;
let PC;
let renderer;
let scene;

//Time
let lastTime = 0;
const time = performance.now();
const delta = (time - lastTime) * 0.001;

async function main() {
  // Get a reference to the container element
  const container = document.querySelector('#scene-container');

  // create a new world
  const world = new World(container);

  // complete async tasks
  await world.init();

  // Cache components
  camera = world.getCamera();
  controls = world.getControls();
  fireballs = world.getFireball();
  lights = world.getLights();
  materialSphere = world.getMaterialSphere();
  particleGeometry = world.getParticleGeometry();
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
    const rainbowUniforms = RainbowMaterial.uniforms;
    const fireglowUniforms = FireGlowMaterial.uniforms;
    const smokeUniforms = FireGlowMaterial.uniforms;

    rainbowUniforms ? rainbowUniforms.time.value += 0.01 : void 0;
    fireglowUniforms ? fireglowUniforms.time.value += 0.03 : void 0;
    smokeUniforms ? smokeUniforms.time.value = time : void 0;

    // lights
    lights.updateLights(time * 0.001);

    // fireballs
    console.log('fireballs :: ', fireballs);
    fireballs.updateMaterials();
    fireballs.updateFireballs(delta);

    // update last time
    lastTime = time;

    // Run particle systems
    runParticleSystem();

  // draw the scene
  renderer.render(scene, camera);

}

function runParticleSystem() {

  for ( let i = 0; i < particleGeometry.particleCount; i ++ ) {
    // Add random velocity
    particleGeometry.particleVelocities[ i * 3 ] += (Math.random() - 0.5) * 0.1;
    particleGeometry.particleVelocities[ i * 3 + 1 ] += (Math.random() - 0.5) * 0.1;
    particleGeometry.particleVelocities[ i * 3 + 2 ] += (Math.random() - 0.5) * 0.1;
    
    // Add damping
    particleGeometry.particleVelocities[ i * 3 ] *= 0.99;
    particleGeometry.particleVelocities[ i * 3 + 1 ] *= 0.99;
    particleGeometry.particleVelocities[ i * 3 + 2 ] *= 0.99;
    
    // Update position
    particleGeometry.particlePositions[ i * 3 ] += particleGeometry.particleVelocities[ i * 3 ];
    particleGeometry.particlePositions[ i * 3 + 1 ] += particleGeometry.particleVelocities[ i * 3 + 1 ];
    particleGeometry.particlePositions[ i * 3 + 2 ] += particleGeometry.particleVelocities[ i * 3 + 2 ];

    particleGeometry.particleSizes[ i ] = Math.random() * 0.09 + 0.01;

  }

  for ( let i = 0; i < particleGeometry.particleCount; i ++ ) {
    particleGeometry.particlePositions[ i * 3 + 0 ] += Math.random() * 0.1 - 0.05;
    particleGeometry.particlePositions[ i * 3 + 1 ] += Math.random() * 0.2 + 0.01;
    particleGeometry.particlePositions[ i * 3 + 2 ] += Math.random() * 0.1 - 0.05;

    if ( particleGeometry.particlePositions[ i * 3 + 1 ] > 5 ) {
      particleGeometry.particlePositions[ i * 3 + 0 ] = Math.random() * 5 - 2.5;
      particleGeometry.particlePositions[ i * 3 + 1 ] = -5;
      particleGeometry.particlePositions[ i * 3 + 2 ] = Math.random() * 5 - 2.5;
    }

    particleGeometry.particleSizes[ i ] = Math.random() * 0.09 + 0.01;
  }
  
  //console.log('particleGeometry :: ', particleGeometry);
  particleGeometry.geometry.attributes.position.needsUpdate = true;
  particleGeometry.geometry.attributes.size.needsUpdate = true;
}

main();