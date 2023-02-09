import { Color, ShaderMaterial } from "three";

export class FireGlowMaterial {

    static uniforms = {
        time: { value: 0.0 },
        color: { value: new Color(0xff0000) }
    };

    static fragmentShader = document.getElementById('fireGlowShader').textContent;

    createMaterial() {
        return new ShaderMaterial({
            uniforms: FireGlowMaterial.uniforms,
            fragmentShader: FireGlowMaterial.fragmentShader
        });
    }

}