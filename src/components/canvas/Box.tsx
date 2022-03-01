import { useControls } from '@/hooks/useControls'
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

  // Movement
  useFrame((state) => {
    if (mesh.current && start) {
      mesh.current.position.z = state.clock.getElapsedTime() * 100
      state.camera.position.z = mesh.current.position.z - 50
    }
  })
  // Controls
  useFrame(() => {
    if (start) {
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

  return (
    <Suspense fallback={null}>
      <animated.mesh ref={mesh} position-x={x} position-z={-30} position-y={10}>
        <boxBufferGeometry args={[3, 3, 3]} />
        <meshPhysicalMaterial color={'#1DB954'} />
      </animated.mesh>
      <directionalLight position={[5, 5, 5]} />
      <ambientLight />
    </Suspense>
  )
}
export default BoxComponent
