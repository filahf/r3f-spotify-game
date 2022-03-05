import { useControls } from '@/hooks/useControls'
import useStore from '@/shared/store'
import { getXDistortion, getYDistortion } from '@/utils/distortion'
import { useSpring } from '@react-spring/three'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    RocketShip_mesh: THREE.Mesh
  }
  materials: {
    RocketShip_mat: THREE.MeshStandardMaterial
  }
}

const Ship = () => {
  const exhaust = useRef<THREE.Mesh>(null)

  const mesh = useStore((s) => s.ship)
  const start = useStore((s) => s.startGame)
  const { nodes, materials } = useGLTF('/Rocket.glb') as GLTFResult

  const controls = useControls()

  const [{ x }, api] = useSpring(() => ({
    x: 0,
    config: { duration: 200 },
  }))

  // Controls
  useFrame(() => {
    if (true) {
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
    if (mesh.current && exhaust.current) {
      const time = clock.getElapsedTime() * 0.5

      mesh.current.position.x = getXDistortion(-15 / -400, time) + x.get()
      mesh.current.position.y = getYDistortion(-15 / -400, time) + 2

      exhaust.current.scale.x = 0.1 + Math.sin(time * 400) * 0.5
      exhaust.current.scale.y = 0.1 + Math.sin(time * 400) * 0.5
    }
  })

  return (
    <Suspense fallback={null}>
      <group
        ref={mesh}
        position-x={getXDistortion(15 / 400, 0)}
        position-y={getYDistortion(15 / 400, 0) + 5}
        position-z={-15}
      >
        <mesh
          material={materials.RocketShip_mat}
          geometry={nodes.RocketShip_mesh.geometry}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.3, 0.3, 0.3]}
        />
        <mesh
          ref={exhaust}
          scale={[0.3, 0.3, 2]}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
        >
          <dodecahedronBufferGeometry args={[1.5, 0]} />
          <meshBasicMaterial color='#FEEBC8' />
        </mesh>
      </group>
      <directionalLight position={[5, 5, 5]} castShadow />
    </Suspense>
  )
}
export default Ship

useGLTF.preload('/Rocket.glb')
