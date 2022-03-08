import { useControls } from '@/hooks/useControls'
import useStore from '@/shared/store'
import { getXDistortion, getYDistortion } from '@/utils/distortion'
import { useSpring } from '@react-spring/three'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

import { ShipModel } from '.'

const GameShip = () => {
  const controls = useControls()
  const exhaustLeft = useRef<THREE.Mesh>(null)
  const exhaustRight = useRef<THREE.Mesh>(null)

  const mesh = useStore((s) => s.ship)
  const start = useStore((s) => s.startGame)

  const [{ x, rotationZ }, api] = useSpring(() => ({
    x: 0,
    rotationZ: 0,
    config: { duration: 200 },
  }))

  // Controls
  useFrame(() => {
    if (start) {
      if (mesh.current && controls.current) {
        if (controls.current.left) {
          api({ x: -10, rotationZ: -Math.PI / 8 })
        }

        if (controls.current.center) {
          api({ x: 0, rotationZ: 0 })
        }

        if (controls.current.right) {
          api({ x: 10, rotationZ: Math.PI / 8 })
        }
      }
    }
  })

  useFrame(({ clock }) => {
    if (mesh.current && exhaustLeft.current && exhaustRight.current) {
      const time = clock.getElapsedTime() * 0.5

      mesh.current.position.x = getXDistortion(-15 / -400, time) + x.get()
      mesh.current.position.y = getYDistortion(-15 / -400, time) + 2
      mesh.current.rotation.z = rotationZ.get()

      exhaustLeft.current.scale.x = 0.1 + Math.sin(time * 400) * 0.5
      exhaustLeft.current.scale.y = 0.1 + Math.sin(time * 400) * 0.5
      exhaustRight.current.scale.x = 0.1 + Math.sin(time * 400) * 0.5
      exhaustRight.current.scale.y = 0.1 + Math.sin(time * 400) * 0.5
    }
  })

  return (
    <>
      <ShipModel
        meshRef={mesh}
        exhaustLeftRef={exhaustLeft}
        exhaustRightRef={exhaustRight}
        position={[
          getXDistortion(15 / 400, 0),
          getYDistortion(15 / 400, 0) + 5,
          -15,
        ]}
      />
    </>
  )
}

export default GameShip
