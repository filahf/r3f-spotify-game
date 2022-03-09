import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

import ShipModel from './ShipModel'

const LandingShip = () => {
  const exhaustLeft = useRef<THREE.Mesh>(null)
  const exhaustRight = useRef<THREE.Mesh>(null)

  const mesh = useRef<THREE.Mesh>(null)
  const camera = useRef<THREE.Camera>()

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
      <PerspectiveCamera
        ref={camera}
        makeDefault
        position={[0, 20, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <pointLight intensity={1} position={[-10, 25, -10]} />
      </PerspectiveCamera>

      <ambientLight intensity={0.3} />
      <ShipModel
        meshRef={mesh}
        exhaustLeftRef={exhaustLeft}
        exhaustRightRef={exhaustRight}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 4, -Math.PI / 3, 0]}
      />
    </>
  )
}

export default LandingShip
