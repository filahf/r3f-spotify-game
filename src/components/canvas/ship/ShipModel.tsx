import { useGLTF } from '@react-three/drei'
import { RefObject, Suspense } from 'react'
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

type ShipModelProps = {
  meshRef: RefObject<THREE.Mesh>
  exhaustLeftRef: RefObject<THREE.Mesh>
  exhaustRightRef: RefObject<THREE.Mesh>
  rotation?: THREE.Vector3Tuple
  position?: THREE.Vector3Tuple
}

const Ship = ({
  meshRef,
  exhaustLeftRef,
  exhaustRightRef,
  ...props
}: ShipModelProps) => {
  const { nodes, materials } = useGLTF('/Speeder.glb') as GLTFResult

  return (
    <Suspense fallback={null}>
      <group ref={meshRef} {...props}>
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
          ref={exhaustLeftRef}
          scale={[0.3, 0.3, 0.2]}
          position={[-0.8, 0.7, 2.5]}
          rotation={[0, 0, 0]}
        >
          <dodecahedronBufferGeometry args={[1.5, 0]} />
          <meshBasicMaterial color='#FEEBC8' />
        </mesh>
        <mesh
          ref={exhaustRightRef}
          scale={[0.3, 0.3, 0.2]}
          position={[0.8, 0.7, 2.5]}
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
