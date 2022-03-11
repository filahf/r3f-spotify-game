import { Instance, Instances } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RefObject, useMemo, useRef } from 'react'
import * as THREE from 'three'

type ShipTrailsProps = {
  startPos: RefObject<THREE.Mesh>
}

const ShipTrails = (props: ShipTrailsProps) => {
  const arr = new Array(40).fill(null)
  return (
    <>
      <Instances limit={arr.length}>
        <circleGeometry args={[0.3, 32, 32]} />
        <meshPhongMaterial color='lightgreen' transparent opacity={1} />
        {arr.map((_, i) => {
          const scale = (Math.sin(i / 15) * Math.PI) / 1.5
          return <PointInstance key={i} index={i} scale={scale} {...props} />
        })}
      </Instances>
    </>
  )
}

type PointInstanceProps = {
  index: number
  startPos: RefObject<THREE.Mesh>
  scale: number
}

const PointInstance = ({ index, startPos, scale }: PointInstanceProps) => {
  const ref = useRef<THREE.InstancedMesh>()

  const tempVector = useMemo(() => new THREE.Vector3(0, 0, 0), [])

  useFrame((_, delta) => {
    if (ref.current && startPos.current) {
      const temp = startPos.current.getWorldPosition(tempVector)

      ref.current.position.y = temp.y
      ref.current.position.z = temp.z + 0.15 * index - 1
      ref.current.position.x =
        THREE.MathUtils.lerp(
          ref.current.position.x,
          temp.x,
          (1 / (index + 1)) * 5
        ) +
        Math.sin(delta * index * 400) / 70
    }
  })

  return <Instance ref={ref} scale={scale} />
}

export default ShipTrails
