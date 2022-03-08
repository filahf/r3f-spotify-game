import { ROAD_LENGTH } from '@/shared/constants'
import useStore from '@/shared/store'
import { getXDistortion, getYDistortion } from '@/utils/distortion'
import { Instances } from '@react-three/drei'
import { Suspense, useMemo } from 'react'
import * as THREE from 'three'

import TargetInstance from './TargetInstance'

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
              getXDistortion(zPosition / -ROAD_LENGTH, 0) +
                (Math.floor(Math.random() * 3) - 1) * 3,
              getYDistortion(zPosition / -ROAD_LENGTH, 0),
              zPosition,
            ]
            return (
              <TargetInstance key={i} position={position} offset={offset} />
            )
          })}
        </Instances>
      )}
    </Suspense>
  )
}

export default Targets
