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
          <meshStandardMaterial roughness={0} color='#f0f0f0' />
          {confirmedBeats.map((data, i) => {
            const zPosition = data.start * -100
            const position: THREE.Vector3Tuple = [
              getXDistortion(zPosition / -400, 0),
              getYDistortion(zPosition / -400, 0),
              zPosition,
            ]
            return <Target key={i} position={position} />
          })}
        </Instances>
      )}
    </Suspense>
  )
}

const Target = ({ position }: { position: THREE.Vector3Tuple }) => {
  const ref = useRef<THREE.InstancedMesh>()
  const start = useStore((s) => s.startGame)

  useFrame((state, delta) => {
    if (ref.current && start) {
      const getDistortion = (
        progress: number,
        time: number
      ): THREE.Vector3Tuple => [
        getXDistortion(progress, time),
        getYDistortion(progress, time) + 2,
        ref.current?.position.z || 0,
      ]
      ref.current.position.z += delta * 100
      const time = state.clock.getElapsedTime() * 0.5
      const distPos = getDistortion(ref.current.position.z / -400, time)
      ref.current.position.set(...distPos)
    }
  })

  return <Instance ref={ref} position={position} />
}

export default Targets
