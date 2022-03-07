// https://codesandbox.io/s/space-game-i2160?file=/src/3d/Explosions.js
// By @drcmda

import useStore from '@/shared/store'
import { useFrame } from '@react-three/fiber'
import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'

const tempObject = new THREE.Object3D()

function make(color: string, speed: number) {
  return {
    ref: React.createRef(),
    color,
    data: new Array(20)
      .fill(null)
      .map(() => [
        new THREE.Vector3(),
        new THREE.Vector3(
          -1 + Math.random() * 2,
          -1 + Math.random() * 2,
          -1 + Math.random() * 2
        )
          .normalize()
          .multiplyScalar(speed * 0.75),
      ]),
  }
}

export default function Explosions() {
  const explosions = useStore((s) => s.explosions)
  return (
    <>
      {explosions &&
        explosions.map(({ positionX }, i) => (
          <Explosion
            key={i}
            position={[positionX, 1.7, -20]}
            scale={0.3 * 0.75}
          />
        ))}
    </>
  )
}

type ExplosionProps = {
  scale: number
  position: THREE.Vector3Tuple
}
function Explosion({ position, scale }: ExplosionProps) {
  const group = useRef<THREE.Mesh>()
  const particles = useMemo(
    () => [make('white', 0.8), make('#F6E05E', 1.6)],
    []
  )

  useFrame((state, delta) => {
    particles.forEach(({ data }, type) => {
      if (group.current) {
        const mesh = group.current.children[type] as THREE.InstancedMesh
        data.forEach(([vec, normal], i) => {
          vec.add(normal)
          tempObject.position.copy(vec)
          tempObject.updateMatrix()
          mesh.setMatrixAt(i, tempObject.matrix)
        })
        // @ts-ignore
        mesh.material.opacity -= 0.055
        group.current.position.z += delta * 50
        mesh.instanceMatrix.needsUpdate = true
      }
    })
  })

  return (
    <group ref={group} position={position} scale={[scale, scale, scale]}>
      {particles.map(({ color, data }, index) => (
        <instancedMesh
          key={index}
          args={[undefined, undefined, data.length]}
          frustumCulled={false}
        >
          <dodecahedronGeometry args={[10, 0]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={1}
            fog={false}
          />
        </instancedMesh>
      ))}
    </group>
  )
}
