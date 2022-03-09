import { ROAD_LENGTH } from '@/shared/constants'
import { uAmp, uFreq } from '@/utils/distortion'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

import fragment from './glsl/road.frag'
import vertex from './glsl/road.vert'

export type RoadShaderMaterialImpl = {
  uTime: number
  uFragmentTime: number
  uLanes: number
  uBrokenLinesColor: THREE.Color
  uShoulderLinesColor: THREE.Color
  uShoulderLinesWidthPercentage: number
  uBrokenLinesLengthPercentage: number
  uBrokenLinesWidthPercentage: number
  uColor: THREE.Color
  uTravelLength: number
  uFreq: THREE.Vector2
  uAmp: THREE.Vector2
} & JSX.IntrinsicElements['shaderMaterial']

const RoadShaderMaterial = shaderMaterial(
  {
    uColor: new THREE.Color('black'),
    uTravelLength: ROAD_LENGTH,
    uTime: 0,
    uFragmentTime: 0,
    uFreq: uFreq,
    uAmp: uAmp,
    uLanes: 3,
    uBrokenLinesColor: new THREE.Color(0x131318),
    uShoulderLinesColor: new THREE.Color(0x48bb78),
    uShoulderLinesWidthPercentage: 0.1,
    uBrokenLinesWidthPercentage: 0.05,
    uBrokenLinesLengthPercentage: 0.3,
  },
  vertex,
  fragment
)

export default RoadShaderMaterial
