import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { setupModel } from "./setupModel ";

async function loadFirelog() {
    const path = "https://d58trmu4r2q50.cloudfront.net/three/models/firelog_scene.gltf";
    const loader = new GLTFLoader();

    const [firelogData] = await Promise.all([
        loader.loadAsync(path)
    ]);

    const firelog = setupModel(firelogData);
    firelog.position.set( 0, -10, 0 );

    return firelog;
}

export { loadFirelog };

