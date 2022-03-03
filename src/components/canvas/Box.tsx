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

  const lookAtAmp = new THREE.Vector3(0.9, 0, 0)

  const lookAtOffset = new THREE.Vector3(0, 0, -5)

  const lookAtTemp = new THREE.Vector3(0, 0, 0)
  const lookAt = new THREE.Vector3()

  // Controls
  useFrame(() => {
    if (start) {
      if (mesh.current && controls.current) {
        if (controls.current.left) {
          api({ x: -10 })
        }

        if (controls.current.center) {
          api({ x: 0 })
        }

        if (controls.current.right) {
          api({ x: 10 })
        }
      }
    }
  })

  useFrame(({ clock }) => {
    if (mesh.current && start) {
      const time = clock.getElapsedTime() * 0.5

      mesh.current.position.x = getXDistortion(-15 / -400, time) + x.get()
      mesh.current.position.y = getYDistortion(-15 / -400, time) + 5

      lookAtTemp.x = getXDistortion(15 / 400, time)

      lookAtTemp.y = getYDistortion(15 / 400, time)

      lookAt.x =
        mesh.current.position.x +
        lookAtTemp.multiply(lookAtAmp).add(lookAtOffset).x
      lookAt.y =
        mesh.current.position.y +
        lookAtTemp.multiply(lookAtAmp).add(lookAtOffset).y
      lookAt.z =
        mesh.current.position.z +
        lookAtTemp.multiply(lookAtAmp).add(lookAtOffset).z

      mesh.current.lookAt(lookAt)
    }
  })

  return (
    <Suspense fallback={null}>
      <animated.mesh
        ref={mesh}
        position-x={getXDistortion(15 / 400, 0)}
        position-y={getYDistortion(15 / 400, 0)}
        position-z={-15}
      >
        <boxBufferGeometry args={[3, 2, 3]} />
        <meshPhysicalMaterial color={'#1DB954'} />
      </animated.mesh>
      <directionalLight position={[5, 5, 5]} />
      <ambientLight />
    </Suspense>
  )
}
export default BoxComponent
