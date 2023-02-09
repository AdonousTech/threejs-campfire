import { MeshStandardMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { setupModel } from "./setupModel ";

async function loadFirelog() {
    const path = "https://d58trmu4r2q50.cloudfront.net/three/models/firelog_scene.gltf";
    const loader = new GLTFLoader();

    const [firelogData] = await Promise.all([
        loader.loadAsync(path)
    ]);

    console.log('firelog data :: ', firelogData);

    const firelog = setupModel(firelogData);
    console.log('the firelog :: ', firelog);
    firelog.position.set( 0, -10, 0 );

    //firelog.children[1].material.emissive = '0xff6600'
    //firelog.children[1].emissiveIntensity = 1;

    return firelog;
}

export { loadFirelog };

