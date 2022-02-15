import { GAME_CONSTANTS } from '@/utils/store'
import { Line } from '@react-three/drei'
import { useMemo } from 'react'

type PlaneProps = {
  // In micro s
  duration: number
}

const Plane = ({ duration }: PlaneProps) => {
  const { laneWidth } = GAME_CONSTANTS

  const { laneLinesArray, orthoLinesArray } = useMemo(() => {
    const orthoLinesArray = new Array(Math.floor(duration / 100))
      .fill(null)
      .map((_, index) => ({ z: index * 100 }))

    const laneLinesArray = new Array(4).fill(null).map((_, index) => ({
      x: index * laneWidth - laneWidth * 1.5,
    }))

    return { orthoLinesArray, laneLinesArray }
  }, [duration, laneWidth])

  return (
    <>
      <group>
        {laneLinesArray.map((item) => (
          <Line
            key={item.x}
            points={[
              [item.x, 0, -laneWidth],
              [item.x, 0, duration],
            ]}
            color='black'
            opacity={0.2}
          />
        ))}
      </group>
      <group>
        {orthoLinesArray.map((item) => (
          <Line
            key={item.z}
            points={[
              [-laneWidth * 1.5, 0, item.z],
              [laneWidth * 1.5, 0, item.z],
            ]}
            opacity={0.1}
            color={'black'}
          />
        ))}
      </group>
    </>
  )
}

export default Plane
