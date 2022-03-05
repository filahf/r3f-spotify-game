#define PI 3.14159265358979
uniform vec2 uFreq;
uniform vec2 uAmp;
uniform float uTravelLength;
uniform float uTime;
varying vec2 vUv;


#pragma glslify: getDistortion = require(./dist.glsl);

void main(){
  vec3 transformed = position.xyz;
  vec3 distortion  = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength, uFreq, uAmp, uTime);
  transformed.x += distortion.x;
  transformed.z += distortion.y;
  transformed.y += -1.*distortion.z;  

  vec4 mvPosition = modelViewMatrix * vec4(transformed,1.);
  gl_Position = projectionMatrix * mvPosition;
  vUv = uv;
}
