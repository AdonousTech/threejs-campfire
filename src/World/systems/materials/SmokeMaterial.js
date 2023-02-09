import { Color, ShaderMaterial } from "three";

export class SmokeMaterial {

    static uniforms = {
        time: { value: 0.0 },
        color: { value: new Color(0xffff00) }
    };

    static fragmentShader = document.getElementById('smokeFragmentShader').textContent;

    createMaterial() {
        return new ShaderMaterial({
            uniforms: SmokeMaterial.uniforms,
            fragmentShader: SmokeMaterial.fragmentShader,
            transparent: true
        });
    }

}