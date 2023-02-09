import { Mesh, MeshBasicMaterial, SphereGeometry } from "three";
import { FireGlowMaterial } from "../systems/materials/FireGlowMaterial";

export class Fireballs {

    //Define the number of meshes and the radius of the overall cluster
    clusterRadius = 10;
    geometry;
    numMeshes = 10;
    balls = [];
    material;

    constructor() {
        // Create a sphere geometry for each mesh
        this.geometry = new SphereGeometry(6, 32, 32);
        this.material = new FireGlowMaterial().createMaterial();

        // Loop through the number of meshes
        for (let i = 0; i < this.numMeshes; i++) {
            const angle = (2 * Math.PI / this.numMeshes) * i;
            const xPos = this.clusterRadius * Math.cos(angle);
            const zPos = this.clusterRadius * Math.sin(angle);
          
            const sphere = new Mesh(this.geometry, this.material);
            sphere.position.set(xPos, -7, zPos);
          
            this.balls.push(sphere);
        }
    }

    createFireballs() {
        return this.balls;
    }
}