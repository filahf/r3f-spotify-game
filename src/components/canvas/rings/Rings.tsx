import { ROAD_LENGTH } from '@/shared/constants'
import { getXDistortion, getYDistortion } from '@/utils/distortion'
import { Instances } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

import RingInstance from './RingInstance'

const Rings = () => {
  const ringsArray = useMemo(() => new Array(5).fill(null), [])

  return (
    <>
      <Instances limit={ringsArray.length}>
        <ringBufferGeometry args={[1, 1.02, 64]} />
        <meshBasicMaterial color='#D6BCFA' side={THREE.DoubleSide} />

        {ringsArray.map((_, i) => {
          const zPosition = i * -50
          const pos: THREE.Vector3Tuple = [
            getXDistortion(zPosition / -ROAD_LENGTH, 0),
            getYDistortion(zPosition / -ROAD_LENGTH, 0),
            zPosition,
          ]
          const scale = (Math.sin(i / 10) * Math.PI) / 4
          return <RingInstance key={i} position={pos} scale={scale * 17 + 20} />
        })}
      </Instances>
    </>
  )
}

export default Rings
