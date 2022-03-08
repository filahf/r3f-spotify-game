#define PI 3.14159265358979

vec3 getDistortion(float progress,vec2 uFreq,vec2 uAmp,float uTime){
  float camProgress = 0.0125;
  return vec3( 
    sin(progress * PI * uFreq.x +uTime * 0.5) * uAmp.x - sin(camProgress * PI * uFreq.x+uTime * 0.5 ) * uAmp.x,
    sin(progress * PI * uFreq.y +uTime * 0.5) * uAmp.y - sin(camProgress * PI * uFreq.y+uTime * 0.5 ) * uAmp.y,
    0.
  );
}
#pragma glslify: export(getDistortion);
