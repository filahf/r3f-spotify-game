import { ROAD_LENGTH } from '@/shared/constants'
import useStore from '@/shared/store'
import { Plane } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

import RoadShaderMaterial, { RoadShaderMaterialImpl } from './shader'

extend({ RoadShaderMaterial })

const Road = () => {
  const ref = useRef<RoadShaderMaterialImpl>()
  const start = useStore((s) => s.startGame)

  useFrame(({ clock }) => {
    if (ref.current) {
      const time = clock.getElapsedTime()

      ref.current.uTime = time
      if (start) {
        ref.current.uFragmentTime = time
      }
    }
  })

  return (
    <>
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
