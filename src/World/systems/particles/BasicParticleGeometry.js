import { BufferAttribute, BufferGeometry, DynamicDrawUsage, Points, PointsMaterial } from "three";

export class BasicParticleGeometry extends Points {

    particleCount;
    particleGeometry;
    particleMaterial;
    particlePositions;
    particleSizes;
    particleVelocities;

    constructor() {
        super();

        this.particleCount = 200;
        this.particlePositions = new Float32Array( this.particleCount * 3 );
        this.particleSizes = new Float32Array( this.particleCount );
        this.particleVelocities = new Float32Array( this.particleCount );

        for ( let i = 0; i < this.particleCount; i ++ ) {
/*             this.particlePositions[ i * 3 ] = Math.random() * 10 - 5;
            this.particlePositions[ i * 3 + 1 ] = Math.random() * 10 - 5;
            this.particlePositions[ i * 3 + 2 ] = Math.random() * 10 - 5; */

            this.particlePositions[ i * 3 ] = Math.random() * 50 - 25; // adjust the initial x position
            this.particlePositions[ i * 3 + 1 ] = Math.random() * 50 - 25; // adjust the initial y position
            this.particlePositions[ i * 3 + 2 ] = Math.random() * 50 - 25; // adjust the initial z position
            this.particleSizes[ i ] = Math.random() * 0.05 + 0.01;
            this.particleVelocities[ i ] = Math.random() * 0.05 + 0.01; // add random velocity to each particle


            this.particleSizes[ i ] = Math.random() * 0.8 + 0.01;
        }

        this.particleGeometry = new BufferGeometry();
        this.particleGeometry.setAttribute( 'position', new BufferAttribute( this.particlePositions, 3 ).setUsage( DynamicDrawUsage ) );
        this.particleGeometry.setAttribute( 'size', new BufferAttribute( this.particleSizes, 1 ) );
        this.particleMaterial = new PointsMaterial({
            size: .8,
            color: 0xff0000
        });

        // set
        this.material = this.particleMaterial;
        this.geometry = this.particleGeometry;
    }

    createParticles() {
        return this;
    }
}