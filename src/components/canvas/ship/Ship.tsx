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
    craft_speederC_1: THREE.Mesh
    craft_speederC_2: THREE.Mesh
    craft_speederC_3: THREE.Mesh
    craft_speederC_4: THREE.Mesh
  }
  materials: {
    metalRed: THREE.MeshStandardMaterial
    metalDark: THREE.MeshStandardMaterial
    metal: THREE.MeshStandardMaterial
    dark: THREE.MeshStandardMaterial
  }
}

const Ship = () => {
  const exhaustLeft = useRef<THREE.Mesh>(null)
  const exhaustRight = useRef<THREE.Mesh>(null)

  const mesh = useStore((s) => s.ship)
  const start = useStore((s) => s.startGame)
  const { nodes, materials } = useGLTF('/Speeder.glb') as GLTFResult

  const controls = useControls()

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
    <Suspense fallback={null}>
      <group
        ref={mesh}
        position-x={getXDistortion(15 / 400, 0)}
        position-y={getYDistortion(15 / 400, 0) + 5}
        position-z={-15}
      >
        <group scale={20} rotation-y={Math.PI}>
          <mesh
            geometry={nodes.craft_speederC_1.geometry}
            material={materials.metalRed}
          >
            <meshPhongMaterial color='#48bb78' />
          </mesh>
          <mesh
            geometry={nodes.craft_speederC_2.geometry}
            material={materials.metalDark}
          >
            <meshPhongMaterial color='#171923' />
          </mesh>
          <mesh
            geometry={nodes.craft_speederC_3.geometry}
            material={materials.metal}
          >
            <meshPhongMaterial color='#171923' />
          </mesh>
          <mesh
            geometry={nodes.craft_speederC_4.geometry}
            material={materials.dark}
          />
        </group>
        <mesh
          ref={exhaustLeft}
          scale={[0.3, 0.3, 0.2]}
          position={[-0.8, 0.5, 2]}
          rotation={[0, 0, 0]}
        >
          <dodecahedronBufferGeometry args={[1.5, 0]} />
          <meshBasicMaterial color='#FEEBC8' />
        </mesh>
        <mesh
          ref={exhaustRight}
          scale={[0.3, 0.3, 0.2]}
          position={[0.8, 0.5, 2]}
          rotation={[0, 0, 0]}
        >
          <dodecahedronBufferGeometry args={[1.5, 0]} />
          <meshBasicMaterial color='#FEEBC8' />
        </mesh>
      </group>
    </Suspense>
  )
}
export default Ship

useGLTF.preload('/Speeder.glb')
