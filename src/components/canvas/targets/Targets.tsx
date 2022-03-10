import useGenerateTargetData from '@/hooks/useGenerateTargetData'
import useStore from '@/shared/store'
import { Instances } from '@react-three/drei'
import { Suspense } from 'react'

import TargetInstance from './TargetInstance'

const Targets = () => {
  const data = useStore((s) => s.audioAnalysis)

  const targetData = useGenerateTargetData(data, 0.3)

  return (
    <Suspense fallback={null}>
      {targetData && (
        <Instances limit={targetData.length}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial roughness={0} color='#F6E05E' />
          {targetData.map((target) => (
            <TargetInstance
              key={target.position[2]}
              position={target.position}
              offset={target.offset}
            />
          ))}
        </Instances>
      )}
    </Suspense>
  )
}

export default Targets
