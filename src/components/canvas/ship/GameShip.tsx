import { useControls } from '@/hooks/useControls'
import { ROAD_LENGTH, SHIP_Z_OFFSET } from '@/shared/constants'
import useStore from '@/shared/store'
import { getXDistortion, getYDistortion } from '@/utils/distortion'
import { useSpring } from '@react-spring/three'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

import { ShipModel } from '.'
import ShipTrails from './ShipTrails'

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
      const time = clock.getElapsedTime()

      mesh.current.position.x =
        getXDistortion(SHIP_Z_OFFSET / ROAD_LENGTH, time) + x.get()
      mesh.current.position.y =
        getYDistortion(SHIP_Z_OFFSET / ROAD_LENGTH, time) + 2
      mesh.current.rotation.z = rotationZ.get()

      exhaustLeft.current.scale.set(0, 0, 0)
      exhaustRight.current.scale.set(0, 0, 0)
    }
  })

  return (
    <>
      {start && (
        <>
          <ShipTrails startPos={exhaustLeft} />
          <ShipTrails startPos={exhaustRight} />
        </>
      )}
      <ShipModel
        meshRef={mesh}
        exhaustLeftRef={exhaustLeft}
        exhaustRightRef={exhaustRight}
        position={[
          getXDistortion(SHIP_Z_OFFSET / ROAD_LENGTH, 0),
          getYDistortion(SHIP_Z_OFFSET / ROAD_LENGTH, 0),
          -SHIP_Z_OFFSET,
        ]}
      />
    </>
  )
}

export default GameShip
