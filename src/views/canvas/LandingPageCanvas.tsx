import { LandingShip } from '@/components/canvas/ship'
import { PerspectiveCamera } from '@react-three/drei'

const LandingPageCanvas = () => {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 20, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <pointLight intensity={1} position={[-10, 25, -10]} />
      </PerspectiveCamera>
      <ambientLight intensity={0.3} />
      <LandingShip />
    </>
  )
}

export default LandingPageCanvas
