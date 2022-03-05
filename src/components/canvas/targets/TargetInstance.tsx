import useStore from '@/shared/store'
import { distance } from '@/utils/distance'
import { getXDistortion, getYDistortion } from '@/utils/distortion'
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

  useFrame((state, delta) => {
    if (ref.current && ship.current && start) {
      const getDistortion = (
        progress: number,
        time: number
      ): THREE.Vector3Tuple => [
        getXDistortion(progress, time) + offset,
        getYDistortion(progress, time) + 2,
        ref.current?.position.z || 0,
      ]
      ref.current.position.z += delta * 100
      const time = state.clock.getElapsedTime() * 0.5
      const distPos = getDistortion(ref.current.position.z / -400, time)
      ref.current.position.set(...distPos)
      if (distance(ship.current.position, ref.current.position) < 2) {
        ref.current.position.z = 10
        console.log('hit')
      }
    }
  })

  return <Instance ref={ref} position={position} />
}

export default TargetInstance
