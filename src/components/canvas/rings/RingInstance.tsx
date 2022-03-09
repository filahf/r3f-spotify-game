import { ROAD_LENGTH } from '@/shared/constants'
import useStore from '@/shared/store'
import { getDistVector3Tuple } from '@/utils/distortion'
import { Instance } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

type RingInstanceProps = {
  position: THREE.Vector3Tuple
  scale: number
}
const RingInstance = ({ position, scale }: RingInstanceProps) => {
  const ref = useRef<THREE.InstancedMesh>()

  const start = useStore((s) => s.startGame)

  useFrame((state, delta) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime()

      if (start) {
        ref.current.position.z += delta * 100
      }

      const distPos = getDistVector3Tuple(
        ref.current.position.z / -ROAD_LENGTH,
        time,
        ref.current.position.z,
        [0, 0, 0]
      )
      ref.current.position.set(...distPos)
      if (ref.current.position.z > 0) {
        ref.current.position.z = -ROAD_LENGTH
      }
    }
  })

  return <Instance ref={ref} position={position} scale={scale} />
}

export default RingInstance
