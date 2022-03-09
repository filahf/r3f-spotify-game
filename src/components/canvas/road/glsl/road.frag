varying vec2 vUv; 
uniform vec3 uColor;
uniform float uFragmentTime;
uniform float uLanes;
uniform vec3 uBrokenLinesColor;
uniform vec3 uShoulderLinesColor;
uniform float uShoulderLinesWidthPercentage;
uniform float uBrokenLinesWidthPercentage;
uniform float uBrokenLinesLengthPercentage;

void main(){
  vec2 uv = vUv;
  vec3 color = vec3(uColor);
  uv.y = mod(uv.y + uFragmentTime * 0.1,1.);
  float brokenLineWidth = 1. / uLanes * uBrokenLinesWidthPercentage;
  // How much % of the lane's space is empty
  float laneEmptySpace = 1. - uBrokenLinesLengthPercentage;
  // Horizontal * vertical offset
  float brokenLines = step(1.-brokenLineWidth * uLanes,fract(uv.x * uLanes)) * step(laneEmptySpace, fract(uv.y * 100.));
  // Remove right-hand lines on the right-most lane
  brokenLines *= step(uv.x * uLanes,uLanes-1.);
  color = mix(color, uBrokenLinesColor, brokenLines);
  float shoulderLinesWidth = 1. / uLanes * uShoulderLinesWidthPercentage;
  float shoulderLines = step(1.-shoulderLinesWidth, uv.x) + step(uv.x, shoulderLinesWidth);
  color = mix(color, uShoulderLinesColor, shoulderLines);
 
  gl_FragColor = vec4(color,1.);
}
