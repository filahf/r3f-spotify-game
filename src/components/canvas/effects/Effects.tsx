import {
  Bloom,
  EffectComposer,
  Noise,
  Vignette,
} from '@react-three/postprocessing'

const Effects = () => {
  return (
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
  )
}

export default Effects
