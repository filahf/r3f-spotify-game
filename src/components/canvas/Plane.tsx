import useStore, { GAME_CONSTANTS } from '@/utils/store'
import { Line } from '@react-three/drei'
import { useMemo } from 'react'

import Targets from './targets'

const Plane = () => {
  const { laneWidth } = GAME_CONSTANTS
  const audioData = useStore((s) => s.audioAnalysis)

  // @ts-ignore
  const duration = audioData && audioData.track.duration * 100

  const lines = useMemo(() => {
    if (!audioData) return null
    const orthoLinesArray = new Array(Math.floor(duration / 100))
      .fill(null)
      .map((_, index) => ({ z: (index * 100 * audioData.track.tempo) / 60 }))

    const laneLinesArray = new Array(4).fill(null).map((_, index) => ({
      x: index * laneWidth - laneWidth * 1.5,
    }))

    return { orthoLinesArray, laneLinesArray }
  }, [duration, laneWidth, audioData])

  return (
    <>
      <group>
        {lines &&
          lines.laneLinesArray.map((item) => (
            <Line
              key={item.x}
              points={[
                [item.x, 0, -laneWidth],
                [item.x, 0, duration],
              ]}
              color='white'
              opacity={0.2}
            />
          ))}
      </group>
      <group>
        {lines &&
          lines.orthoLinesArray.map((item) => (
            <Line
              key={item.z}
              points={[
                [-laneWidth * 1.5, 0, item.z],
                [laneWidth * 1.5, 0, item.z],
              ]}
              opacity={0.1}
              color={'white'}
            />
          ))}
      </group>
      {audioData && <Targets data={audioData.beats} />}
    </>
  )
}

export default Plane
