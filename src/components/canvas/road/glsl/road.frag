  //  uniform vec3 uColor;
      varying vec2 vUv; 
    uniform vec3 uColor;
    uniform float uTime;
	void main(){
    vec2 uv = vUv;
        vec3 color = vec3(uColor);
        gl_FragColor = vec4(uColor,1.);
    }
