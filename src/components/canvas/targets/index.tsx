import { distance } from '@/utils/distance'
import { getXDistortion, getYDistortion } from '@/utils/distortion'
import useStore from '@/utils/store'
import { Instance, Instances } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'

const Targets = () => {
  const data = useStore((s) => s.audioAnalysis)
  const confirmedBeats = useMemo(
    () => data?.beats.filter((beat) => beat.confidence > 0.6),
    [data]
  )
  return (
    <Suspense fallback={null}>
      {confirmedBeats && (
        <Instances limit={confirmedBeats.length}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial roughness={0} color='#F6E05E' />
          {confirmedBeats.map((data, i) => {
            const zPosition = data.start * -100
            const offset = i % 3 ? (Math.floor(Math.random() * 3) - 1) * 10 : 0
            const position: THREE.Vector3Tuple = [
              getXDistortion(zPosition / -400, 0) +
                (Math.floor(Math.random() * 3) - 1) * 3,
              getYDistortion(zPosition / -400, 0),
              zPosition,
            ]
            return <Target key={i} position={position} offset={offset} />
          })}
        </Instances>
      )}
    </Suspense>
  )
}

const Target = ({
  position,
  offset,
}: {
  position: THREE.Vector3Tuple
  offset: number
}) => {
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

export default Targets
