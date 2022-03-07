import useStore from '@/shared/store'
import { Preload, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {
  Bloom,
  EffectComposer,
  Noise,
  Vignette,
} from '@react-three/postprocessing'
import { CSSProperties, Suspense } from 'react'

import { CoverArt } from '../canvas/cover-art'
import Explosions from '../canvas/explosion/Explosion'

type LCanvasProps = {
  children: JSX.Element
}

const LCanvas = ({ children }: LCanvasProps) => {
  const selectedTrack = useStore((s) => s.selectedTrack)
  const style: CSSProperties = {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'black',
  }

  return (
    <Canvas mode='concurrent' dpr={[1, 1.5]} style={style}>
      <Preload all />
      {children}
      <fog attach='fog' color='black' near={10} far={400} />
      <Explosions />
      <Suspense fallback={null}>
        {selectedTrack && (
          <CoverArt imgUrl={selectedTrack.album.images[0].url} />
        )}
      </Suspense>
      <Stars radius={120} count={600} />
      <EffectComposer multisampling={8}>
        <Bloom
          kernelSize={4}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.3}
          intensity={0.2}
        />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </Canvas>
  )
}

export default LCanvas
