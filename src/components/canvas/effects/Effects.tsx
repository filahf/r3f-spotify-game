import {
  Bloom,
  EffectComposer,
  Noise,
  SSAO,
  Vignette,
} from '@react-three/postprocessing'

const Effects = () => {
  return (
    <EffectComposer multisampling={8}>
      <Bloom
        kernelSize={4}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.3}
        intensity={0.2}
      />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
      <SSAO />
    </EffectComposer>
  )
}

export default Effects
