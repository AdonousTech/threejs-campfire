import { AdditiveBlending, Group, Mesh, MeshBasicMaterial, MeshStandardMaterial, MultiplyBlending, NormalBlending, PlaneGeometry } from "three";

export class SmokeSystem {

    group;
    particles;
    particleGeometry; 
    particleMaterial;

    constructor() {
        this.group = new Group();
        this.particles = [];
        this.particleGeometry = new PlaneGeometry(.02, .02, 1, 1);
        this.particleMaterial = new MeshStandardMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.01,
          blending: MultiplyBlending
        });
    }

    addParticle() {
        let particle = new Mesh(this.particleGeometry, this.particleMaterial);
        particle.position.set(
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            Math.random() * 20 - 10
          );
        particle.rotation.set(
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI
        );
        particle.scale.set(
            Math.random() + 10,
            Math.random() + 10,
            Math.random() + 10
        );
        this.group.add(particle);
        this.group.position.setY(15)
        this.particles.push(particle);
    }

    createParticles() {
        return this;
    }

    update() {
        for (let particle of this.particles) {
            console.log(this.particles)
            particle.position.y += 0.1;
            particle.rotation.y += 0.01;
            particle.scale.x *= 1.01;
            particle.scale.y *= 1.01;
            particle.scale.z *= 1.01;
            particle.material.opacity *= 0.99;
            if (particle.material.opacity < 0.05) {
                this.group.remove(particle);
                this.particles.splice(this.particles.indexOf(particle), 1);
                this.addParticle();
            }
        }
    }
    
}