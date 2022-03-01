import { Beat } from '@/types'
import { Instance, Instances } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

type TargetProps = {
  data?: Beat[]
}

const Targets = ({ data }: TargetProps) => {
  // const confirmedBeats = useMemo(
  //   () => data?.filter((beat) => beat.confidence > 0.6),
  //   [data]
  // )

  const confirmedBeats = new Array(100).fill(null)

  return (
    <Instances limit={confirmedBeats.length}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial roughness={0} color='#f0f0f0' />
      {confirmedBeats.map((_, i) => (
        <Target key={i} position={[0, 10, -50 * i]} />
      ))}
    </Instances>
  )
}

const Target = ({ position }: { position: THREE.Vector3Tuple }) => {
  const ref = useRef<THREE.InstancedMesh>()
  useFrame(({ clock }) => {
    if (ref.current) {
      const getDistortion = (
        progress: number,
        time: number
      ): THREE.Vector3Tuple => [
        Math.sin(progress * Math.PI * 2 + time) * 35 -
          Math.sin(0.0125 * Math.PI * 2 + time) * 35,
        Math.sin(progress * Math.PI * 3 + time) * 10 -
          Math.sin(0.0125 * Math.PI * 3 + time) * 10 +
          2,
        ref.current?.position.z || 0,
      ]

      const time = clock.getElapsedTime() * 0.5
      const distPos = getDistortion(ref.current.position.z / -400, time)
      ref.current.position.set(...distPos)
    }
  })
  return <Instance ref={ref} position={position} />
}

export default Targets
