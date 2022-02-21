import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

import fragment from './glsl/road.frag'
import vertex from './glsl/road.vert'

export type RoadShaderMaterialImpl = {
  uTime: number
  uColor: THREE.Color
  uTravelLength: number
  uFreq: THREE.Vector2
  uAmp: THREE.Vector2
} & JSX.IntrinsicElements['shaderMaterial']

const RoadShaderMaterial = shaderMaterial(
  {
    uColor: new THREE.Color(0x101012),
    uTravelLength: 400,
    uTime: 0,
    uFreq: new THREE.Vector2(2, 3),
    uAmp: new THREE.Vector2(35, 10),
  },
  vertex,
  fragment
)

export default RoadShaderMaterial
