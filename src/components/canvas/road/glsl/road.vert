	#define PI 3.14159265358979
  uniform vec2 uFreq;
  uniform vec2 uAmp;
  uniform float uTravelLength;
  uniform float uTime;
  varying vec2 vUv; 

    float nsin(float val){
    return sin(val) * 0.5+0.5;
    }
  vec3 getDistortion(float progress){
      float camProgress = 0.0125;
      return vec3( 
        sin(progress * PI * uFreq.x +uTime) * uAmp.x - sin(camProgress * PI * uFreq.x+uTime ) * uAmp.x,
        sin(progress * PI * uFreq.y +uTime) * uAmp.y - sin(camProgress * PI * uFreq.y+uTime ) * uAmp.y,
        0.
      );
    }
  
  void main(){
  vec3 transformed = position.xyz;
  vec3 distortion  = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength);
  transformed.x += distortion.x;
  transformed.z += distortion.y;
  transformed.y += -1.*distortion.z;  
  
  vec4 mvPosition = modelViewMatrix * vec4(transformed,1.);
  gl_Position = projectionMatrix * mvPosition;
  vUv = uv;
	}
