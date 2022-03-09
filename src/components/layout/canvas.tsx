import { Preload } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
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
    backgroundColor: 'black',
  }

  return (
    <Canvas mode='concurrent' dpr={[1, 1.5]} style={style}>
      <Preload all />
      {children}
    </Canvas>
  )
}

export default LCanvas
