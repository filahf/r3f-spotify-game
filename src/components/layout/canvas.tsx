import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import useStore from '@/helpers/store'
import { CSSProperties, useEffect, useRef } from 'react'

import { Box } from '@chakra-ui/react'
const LControl = () => {
  const dom = useStore((state) => state.dom)
  const control = useRef(null)

  useEffect(() => {
    if (control && dom?.current) {
      dom.current.style['touch-action'] = 'none'
    }
  }, [dom, control])
  // @ts-ignore
  return <OrbitControls ref={control} domElement={dom.current} />
}

type LCanvasProps = {
  children: JSX.Element
}

const LCanvas = ({ children }: LCanvasProps) => {
  const dom = useStore((state) => state.dom)

  const style: CSSProperties = {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100vh',
  }

  return (
    <Canvas
      mode='concurrent'
      style={style}
      onCreated={(state) => {
        if (state.events.connect && dom?.current) {
          state.events.connect(dom.current)
        }
      }}
    >
      <LControl />
      <Preload all />
      {children}
    </Canvas>
  )
}

export default LCanvas
