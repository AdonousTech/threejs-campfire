import { CylinderGeometry, Mesh, MeshPhongMaterial, MeshStandardMaterial } from "three";
import { RainbowMaterial } from "../systems/materials/RainbowMaterial";

export class Landscape {


    createGreyBoxLandscape(scene) {
        const geometry = new CylinderGeometry( 0, 10, 30, 4, 1 );
        //const material = new MeshStandardMaterial( { color: 0xffffff, flatShading: true } );
        const material = new RainbowMaterial().createMaterial();

        for ( let i = 0; i < 500; i ++ ) {
            const mesh = new Mesh( geometry, material );
            mesh.position.x = Math.random() * 1600 - 800;
            mesh.position.y = 0;
            mesh.position.z = Math.random() * 1600 - 800;
            mesh.updateMatrix();
            mesh.matrixAutoUpdate = false;
            scene.add( mesh );
          }
    }

}