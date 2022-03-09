import { ROAD_LENGTH } from '@/shared/constants'
import useStore from '@/shared/store'
import { distance } from '@/utils/distance'
import { getDistVector3Tuple } from '@/utils/distortion'
import { Instance } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

type TargetInstanceProps = {
  position: THREE.Vector3Tuple
  offset: number
}

const TargetInstance = ({ position, offset }: TargetInstanceProps) => {
  const ref = useRef<THREE.InstancedMesh>()
  const start = useStore((s) => s.startGame)
  const ship = useStore((s) => s.ship)
  const incrementScore = useStore((s) => s.setScore)
  const addExplosion = useStore((s) => s.addExplosion)
  const resetHitStreak = useStore((s) => s.resetHitStreak)

  useFrame((state, delta) => {
    if (ref.current && ship.current) {
      if (start) {
        ref.current.position.z += delta * 100
      }
      const time = state.clock.getElapsedTime()
      const distPos = getDistVector3Tuple(
        ref.current.position.z / -ROAD_LENGTH,
        time,
        ref.current.position.z,
        [offset, 2, 0]
      )
      ref.current.position.set(...distPos)

      // Hit
      if (distance(ship.current.position, ref.current.position) < 2) {
        addExplosion(ref.current.position.x)
        ref.current.position.z = 10
        incrementScore()
      }

      // Miss
      if (ref.current.position.z > -10 && ref.current.position.z < 10) {
        ref.current.position.z = 10
        resetHitStreak()
      }
    }
  })

  return <Instance ref={ref} position={position} />
}

export default TargetInstance
