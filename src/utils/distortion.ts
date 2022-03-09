import * as THREE from 'three'

export const uFreq = new THREE.Vector2(2, 3)
export const uAmp = new THREE.Vector2(5, 5)
export const camProgress = 0.0125

export const getXDistortion = (progress: number, time: number): number =>
  Math.sin(progress * Math.PI * uFreq.x + time * 0.5) * uAmp.x -
  Math.sin(camProgress * Math.PI * uFreq.x + time * 0.5) * uAmp.x

export const getYDistortion = (progress: number, time: number): number =>
  Math.sin(progress * Math.PI * uFreq.y + time * 0.5) * uAmp.y -
  Math.sin(camProgress * Math.PI * uFreq.y + time * 0.5) * uAmp.y

export const getDistVector3Tuple = (
  progress: number,
  time: number,
  zPos: number,
  offsetArr: [number, number, number]
): THREE.Vector3Tuple => [
  getXDistortion(progress, time) + offsetArr[0],
  getYDistortion(progress, time) + offsetArr[1],
  zPos + offsetArr[2] || 0,
]
