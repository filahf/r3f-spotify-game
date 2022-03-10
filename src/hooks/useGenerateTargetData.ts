import { ROAD_LENGTH, SHIP_Z_OFFSET } from '@/shared/constants'
import { AudioData } from '@/types'
import { getXDistortion, getYDistortion } from '@/utils/distortion'
import { useMemo } from 'react'

export type TargetDataType = {
  position: THREE.Vector3Tuple
  offset: number
}

const useGenerateTargetData = (
  data: AudioData | null,
  confidenceThreshold: number
): TargetDataType[] | null => {
  const targetData = useMemo(() => {
    if (!data) return null
    const endOfFadeIn = data.track.end_of_fade_in
    const startOfFadeOut = data.track.start_of_fade_out

    const filteredData = data.beats.filter(
      (beat) =>
        beat.confidence > confidenceThreshold &&
        beat.start > endOfFadeIn &&
        beat.start < startOfFadeOut
    )

    const targetData = filteredData.map((beat, i) => {
      const zPosition = beat.start * -100 + SHIP_Z_OFFSET
      const offset = i % 3 ? (Math.floor(Math.random() * 3) - 1) * 10 : 0
      const position: THREE.Vector3Tuple = [
        getXDistortion(zPosition / -ROAD_LENGTH, 0) +
          (Math.floor(Math.random() * 3) - 1) * 3,
        getYDistortion(zPosition / -ROAD_LENGTH, 0) + 2,
        zPosition,
      ]

      return { position, offset }
    })

    return targetData
  }, [data, confidenceThreshold])

  return targetData
}

export default useGenerateTargetData
