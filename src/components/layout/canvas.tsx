import { PerspectiveCamera, Preload } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { CSSProperties } from 'react'

import Plane from '../canvas/Plane'

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
      <PerspectiveCamera
        fov={45}
        rotation={[-0.1, Math.PI, 0]}
        position={[0, 10, -50]}
        far={500}
        makeDefault
      />
      <Preload all />
      {children}
      <Plane />
    </Canvas>
  )
}

export default LCanvas
