import { Mesh, MeshLambertMaterial, SphereGeometry } from "three";
import { FireGlowMaterial } from "../systems/materials/FireGlowMaterial";

export class Fireballs {
    clusterRadius = 5;
    geometry;
    numMeshes = 4;
    balls = [];
    material;
    emissiveMaterial;
    useEmissive = false;
    time = 0;

    constructor() {
        this.geometry = new SphereGeometry(6, 32, 32);
        this.material = new FireGlowMaterial().createMaterial();
        this.emissiveMaterial = new MeshLambertMaterial({
            color: 0xffffff,
            emissive: 0xff6600
        });
        
        for (let i = 0; i < this.numMeshes; i++) {
            const angle = (2 * Math.PI / this.numMeshes) * i;
            const xPos = this.clusterRadius * Math.cos(angle);
            const zPos = this.clusterRadius * Math.sin(angle);
          
            const sphere = new Mesh(this.geometry, this.useEmissive ? this.emissiveMaterial : this.material);
            sphere.position.set(xPos, -7, zPos);
          
            this.balls.push(sphere);
        }
    }

    createFireball() {
        return this;
    }

    getBalls() {
        return this.balls;
    }

    updateMaterials() {
        this.useEmissive = !this.useEmissive;
        this.balls.forEach(ball => {
            ball.material = this.useEmissive ? this.emissiveMaterial : this.material;
        });
    }

    updateFireballs(delta) {
        this.time += delta;
        this.balls.forEach((ball, index) => {
            const angle = (2 * Math.PI / this.numMeshes) * index;
            const xPos = this.clusterRadius * Math.cos(angle + this.time * 0.5);
            const zPos = this.clusterRadius * Math.sin(angle + this.time * 0.5);
            ball.position.set(xPos, -7 + Math.sin(this.time + index) * 2, zPos);
        });
    }
}