import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

import ShipModel from './ShipModel'

const LandingShip = () => {
  const exhaustLeft = useRef<THREE.Mesh>(null)
  const exhaustRight = useRef<THREE.Mesh>(null)

  const mesh = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (mesh.current && exhaustLeft.current && exhaustRight.current) {
      const time = clock.getElapsedTime()
      exhaustLeft.current.scale.x = 0.2 + Math.sin(time * 300) * 0.01
      exhaustLeft.current.scale.z = 1 + Math.sin(time * 400) * 0.5
      exhaustRight.current.scale.x = 0.2 + Math.sin(time * 300) * 0.01
      exhaustRight.current.scale.z = 1 + Math.sin(time * 400) * 0.5
    }
  })

  return (
    <>
      <ShipModel
        meshRef={mesh}
        exhaustLeftRef={exhaustLeft}
        exhaustRightRef={exhaustRight}
        rotation={[-Math.PI / 4, -Math.PI / 3, 0]}
      />
    </>
  )
}

export default LandingShip
