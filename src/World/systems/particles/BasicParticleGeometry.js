import { BufferAttribute, BufferGeometry, Color, DynamicDrawUsage, Points, PointsMaterial } from "three";

export class BasicParticleGeometry extends Points {

    particleCount;
    particleGeometry;
    particleMaterial;
    particlePositions;
    particleSizes;
    particleVelocities;
    particleColors; // new array to hold particle colors

    constructor() {
        super();

        this.particleCount = 200;
        this.particlePositions = new Float32Array( this.particleCount * 3 );
        this.particleSizes = new Float32Array( this.particleCount );
        this.particleVelocities = new Float32Array( this.particleCount );
        this.particleColors = []; // initialize particle colors array

        for ( let i = 0; i < this.particleCount; i ++ ) {
            this.particlePositions[ i * 3 ] = Math.random() * 50 - 25;
            this.particlePositions[ i * 3 + 1 ] = Math.random() * 50 - 25;
            this.particlePositions[ i * 3 + 2 ] = Math.random() * 50 - 25;
            this.particleSizes[ i ] = Math.random() * 0.8 + 0.01;
            this.particleVelocities[ i ] = Math.random() * 0.05 + 0.01;
            this.particleColors.push( new Color( Math.random() * 0xffffff ) ); // add a random color to the colors array
        }

        this.particleGeometry = new BufferGeometry();
        this.particleGeometry.setAttribute( 'position', new BufferAttribute( this.particlePositions, 3 ).setUsage( DynamicDrawUsage ) );
        this.particleGeometry.setAttribute( 'size', new BufferAttribute( this.particleSizes, 1 ) );
        this.particleGeometry.setAttribute( 'color', new BufferAttribute( new Float32Array( this.particleColors.length * 3 ), 3 ) ); // add a color attribute to the geometry

        // set particle colors
        this.particleColors.forEach( ( color, i ) => {
            this.particleGeometry.attributes.color.setXYZ( i, color.r, color.g, color.b );
        });

        this.particleMaterial = new PointsMaterial({
            size: .8,
            vertexColors: true // enable vertex colors
        });

        // set
        this.material = this.particleMaterial;
        this.geometry = this.particleGeometry;
    }

    createParticles() {
        return this;
    }
}