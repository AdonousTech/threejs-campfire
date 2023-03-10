import { World } from './World/World.js';
import { FireGlowMaterial } from './World/systems/materials/FireGlowMaterial.js';

let camera;
let controls;
let fireballs;
let lights;
let particleGeometry;
let smokeSystem;
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
  particleGeometry = world.getParticleGeometry();
  PC = world.getPC();
  renderer = world.getrenderer();
  scene = world.getScene();
  smokeSystem = world.getSmokeSystem();


  // draw the scene
  world.render();

  animate();
}

function animate() {

  requestAnimationFrame( animate );
  
  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
  
    // material uniforms
    const fireglowUniforms = FireGlowMaterial.uniforms;
    fireglowUniforms ? fireglowUniforms.time.value += 0.03 : void 0;

    // lights
    lights.updateLights(time * 0.001);

    // fireballs
    fireballs.updateMaterials();
    fireballs.updateFireballs(delta);

    // smoke system
    smokeSystem.update();

    // update last time
    lastTime = time;

    // Run particle systems
    runParticleSystem();

  // draw the scene
  renderer.clearDepth();
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
  
  particleGeometry.geometry.attributes.position.needsUpdate = true;
  particleGeometry.geometry.attributes.size.needsUpdate = true;
}

main();