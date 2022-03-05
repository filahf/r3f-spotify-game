import { Preload, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {
  Bloom,
  EffectComposer,
  Noise,
  Vignette,
} from '@react-three/postprocessing'
import { CSSProperties } from 'react'

type LCanvasProps = {
  children: JSX.Element
}

const LCanvas = ({ children }: LCanvasProps) => {
  const style: CSSProperties = {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100vh',
  }

  return (
    <Canvas mode='concurrent' dpr={[1, 1.5]} style={style}>
      <Preload all />
      {children}
      <fog attach='fog' color='#D69E2E' near={10} far={210} />
      {/* <Stars count={100} depth={200} /> */}
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
