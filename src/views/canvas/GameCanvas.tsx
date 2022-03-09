import { CoverArt } from '@/components/canvas/cover-art'
import { Effects } from '@/components/canvas/effects'
import Explosions from '@/components/canvas/explosion/Explosion'
import { Road } from '@/components/canvas/road'
import { GameShip } from '@/components/canvas/ship'
import { Targets } from '@/components/canvas/targets'
import useStore from '@/shared/store'
import { Stars } from '@react-three/drei'
import { Suspense } from 'react'

const GameCanvas = () => {
  const selectedTrack = useStore((s) => s.selectedTrack)
  return (
    <>
      <GameShip />
      <Road />
      <Targets />
      <fog attach='fog' color='black' near={10} far={400} />
      <Explosions />
      <Suspense fallback={null}>
        {selectedTrack && (
          <CoverArt imgUrl={selectedTrack.album.images[0].url} />
        )}
      </Suspense>
      <Stars radius={120} count={600} />
      <Effects />
    </>
  )
}

export default GameCanvas
