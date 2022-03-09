import { CoverArt } from '@/components/canvas/cover-art'
import { Effects } from '@/components/canvas/effects'
import Explosions from '@/components/canvas/explosion/Explosion'
import { Rings } from '@/components/canvas/rings'
import { Road } from '@/components/canvas/road'
import { GameShip } from '@/components/canvas/ship'
import { Targets } from '@/components/canvas/targets'
import { ROAD_LENGTH } from '@/shared/constants'
import useStore from '@/shared/store'
import { getYDistortion } from '@/utils/distortion'
import { CameraShake, PerspectiveCamera, Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Suspense, useMemo } from 'react'
import * as THREE from 'three'

const GameCanvas = () => {
  const selectedTrack = useStore((s) => s.selectedTrack)
  const ship = useStore((s) => s.ship)

  const lookAt = useMemo(() => new THREE.Vector3(), [])

  useFrame(({ camera, clock }) => {
    if (ship.current) {
      const time = clock.getElapsedTime()
      const progress = 0.025
      lookAt.set(ship.current.position.x, ship.current.position.y, -50)

      camera.position.x = ship.current.position.x
      camera.position.y = getYDistortion(progress, time) + 8

      camera.lookAt(lookAt)
    }
  })

  return (
    <>
      <pointLight position={[10, 10, 10]} />
      <ambientLight />
      <PerspectiveCamera
        fov={100}
        near={0.5}
        far={ROAD_LENGTH}
        position={[0, 5, -5]}
        makeDefault
      />
      <GameShip />
      <Road />
      <Targets />
      <fog attach='fog' color='black' near={10} far={400} />
      <Explosions />
      <Rings />
      <Suspense fallback={null}>
        {selectedTrack && (
          <CoverArt imgUrl={selectedTrack.album.images[0].url} />
        )}
      </Suspense>
      <Stars radius={120} count={600} />
      <CameraShake maxYaw={0} maxPitch={0} maxRoll={0.05} />
      <Effects />
    </>
  )
}

export default GameCanvas
