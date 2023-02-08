import { ShaderMaterial } from "three";

export class RainbowMaterial {

    static uniforms = {
        time: { value: 0.0 }
    };

    static fragmentShader = document.getElementById('rainbowShader').textContent;

    createMaterial() {
        return new ShaderMaterial({
            uniforms: RainbowMaterial.uniforms,
            fragmentShader: RainbowMaterial.fragmentShader
        });
    }

}