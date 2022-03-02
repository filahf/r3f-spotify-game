import * as THREE from 'three'

export const uFreq = new THREE.Vector2(2, 3)
export const uAmp = new THREE.Vector2(35, 5)
export const camProgress = 0.0125

export const getXDistortion = (progress: number, time: number): number =>
  Math.sin(progress * Math.PI * uFreq.x + time) * uAmp.x -
  Math.sin(camProgress * Math.PI * uFreq.x + time) * uAmp.x

export const getYDistortion = (progress: number, time: number): number =>
  Math.sin(progress * Math.PI * uFreq.y + time) * uAmp.y -
  Math.sin(camProgress * Math.PI * uFreq.y + time) * uAmp.y
