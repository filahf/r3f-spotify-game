import { ROAD_LENGTH } from '@/shared/constants'
import { getXDistortion, getYDistortion } from '@/utils/distortion'
import { PerspectiveCamera, Plane } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import RoadShaderMaterial, { RoadShaderMaterialImpl } from './shader'

extend({ RoadShaderMaterial })

const Road = () => {
  const ref = useRef<RoadShaderMaterialImpl>()

  const cameraRef = useRef<THREE.Camera>()

  // https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls#tips-and-tricks
  const lookAtAmp = useMemo(() => new THREE.Vector3(1, 1, 0), [])
  const lookAtOffset = useMemo(() => new THREE.Vector3(0, 0, -5), [])

  const lookAtTemp = useMemo(() => new THREE.Vector3(0, 0, 0), [])
  const lookAt = useMemo(() => new THREE.Vector3(), [])

  useFrame(({ clock }) => {
    if (ref.current && cameraRef.current) {
      const progress = 0.025
      const time = clock.getElapsedTime()

      ref.current.uTime = time
      lookAtTemp.x = getXDistortion(progress, time)

      lookAtTemp.y = getYDistortion(progress, time)

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
        fov={100}
        near={0.5}
        far={ROAD_LENGTH}
        ref={cameraRef}
        position={[0, 8, -5]}
        makeDefault
      />
      <Plane
        args={[30, ROAD_LENGTH, 20, 100]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, -ROAD_LENGTH / 2]}
        receiveShadow
      >
        <roadShaderMaterial ref={ref} side={THREE.DoubleSide} />
      </Plane>
    </>
  )
}

export default Road
