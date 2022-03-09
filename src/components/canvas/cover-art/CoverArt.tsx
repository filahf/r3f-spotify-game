import { Billboard, MeshWobbleMaterial } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const CoverArt = ({ imgUrl }: { imgUrl: string }) => {
  const material = useRef<JSX.IntrinsicElements['wobbleMaterialImpl']>()
  const [image] = useLoader(THREE.TextureLoader, [imgUrl])

  useFrame(({ clock }) => {
    if (material.current) {
      material.current.factor =
        Math.abs(Math.sin(clock.getElapsedTime())) * 0.09
      material.current.speed = Math.abs(Math.sin(clock.getElapsedTime())) * 10
    }
  })
  return (
    <>
      <Billboard follow={true} lockX={false} lockY={true} lockZ={true}>
        <mesh position={[0, 200, -350]} scale={70}>
          <planeBufferGeometry args={[10, 10, 16, 16]} />
          <MeshWobbleMaterial
            attach='material'
            map={image}
            ref={material}
            transparent
            opacity={0.5}
          />
        </mesh>
      </Billboard>
    </>
  )
}

export default CoverArt
