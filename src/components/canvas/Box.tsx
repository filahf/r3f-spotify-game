import { useControls } from '@/hooks/useControls'
import { getXDistortion, getYDistortion } from '@/utils/distortion'
import useStore from '@/utils/store'
import { animated, useSpring } from '@react-spring/three'
import { useFrame } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

const BoxComponent = () => {
  const mesh = useRef<THREE.Mesh>(null)
  const start = useStore((s) => s.startGame)

  const controls = useControls()
  const [{ x }, api] = useSpring(() => ({
    x: 0,
    config: { duration: 200 },
  }))

  // Controls
  useFrame(() => {
    if (true) {
      if (mesh.current && controls.current) {
        if (controls.current.right) {
          if (mesh.current.position.x > 0) {
            api({ x: 0 })
          } else {
            api({ x: -20 })
          }
        }

        if (controls.current.left) {
          if (mesh.current.position.x < 0) {
            api({ x: 0 })
          } else {
            api({ x: 20 })
          }
        }
      }
    }
  })

  useFrame(({ clock, camera }) => {
    if (mesh.current) {
      const time = clock.getElapsedTime() * 0.5
      mesh.current.position.x = getXDistortion(-15 / -400, time)
      mesh.current.position.y = getYDistortion(-15 / -400, time) + 5
      mesh.current.lookAt(camera.position)
    }
  })

  return (
    <Suspense fallback={null}>
      <animated.mesh ref={mesh} position-x={x} position-z={-15}>
        <boxBufferGeometry args={[3, 2, 3]} />
        <meshPhysicalMaterial color={'#1DB954'} />
      </animated.mesh>
      <directionalLight position={[5, 5, 5]} />
      <ambientLight />
    </Suspense>
  )
}
export default BoxComponent
