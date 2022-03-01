import { OrbitControls, PerspectiveCamera, Plane } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

import RoadShaderMaterial, { RoadShaderMaterialImpl } from './shader'

extend({ RoadShaderMaterial })

const Road = () => {
  const ref = useRef<RoadShaderMaterialImpl>()
  const cameraRef = useRef<THREE.Camera>()

  const lookAtAmp = new THREE.Vector3(1, 1, 0)
  const lookAtOffset = new THREE.Vector3(0, 0, -5)

  const lookAtTemp = new THREE.Vector3(0, 0, 0)
  const lookAt = new THREE.Vector3()

  useFrame(({ clock }) => {
    if (ref.current && cameraRef.current) {
      const uFreq = ref.current.uFreq
      const uAmp = ref.current.uAmp

      const progress = 0.025
      const camProgress = 0.0125
      const time = clock.getElapsedTime() * 0.5

      ref.current.uTime = time
      lookAtTemp.x =
        Math.sin(progress * Math.PI * uFreq.x + time) * uAmp.x -
        Math.sin(camProgress * Math.PI * uFreq.x + time) * uAmp.x

      lookAtTemp.y =
        Math.sin(progress * Math.PI * uFreq.y + time) * uAmp.y -
        Math.sin(camProgress * Math.PI * uFreq.y + time) * uAmp.y

      lookAt.x =
        cameraRef.current.position.x +
        lookAtTemp.multiply(lookAtAmp).add(lookAtOffset).x
      lookAt.y =
        cameraRef.current.position.y +
        lookAtTemp.multiply(lookAtAmp).add(lookAtOffset).y
      lookAt.z =
        cameraRef.current.position.z +
        lookAtTemp.multiply(lookAtAmp).add(lookAtOffset).z

      cameraRef.current.lookAt(lookAt)
    }
  })

  return (
    <>
      <pointLight position={[10, 10, 10]} />
      <ambientLight />
      <PerspectiveCamera
        fov={90}
        near={0.1}
        far={10000}
        ref={cameraRef}
        position={[0, 8, -5]}
        makeDefault
      />

      <Plane
        args={[30, 400, 20, 100]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, -200]}
      >
        <roadShaderMaterial
          ref={ref}
          // attach='material'
          side={THREE.DoubleSide}
        />
      </Plane>
    </>
  )
}

export default Road
