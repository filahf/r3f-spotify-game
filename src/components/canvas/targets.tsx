import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const tempObject = new THREE.Object3D()

type Beat = {
  start: number
  duration: number
  confidence: number
}

type TargetProps = {
  data: Beat[]
}

const Targets = ({ data }: TargetProps) => {
  const ref = useRef<THREE.InstancedMesh>()

  const confirmedBeats = useMemo(
    () => data?.filter((beat) => beat.confidence > 0.6),
    [data]
  )

  useLayoutEffect(() => {
    confirmedBeats.map((beats, i) => {
      tempObject.position.set(
        // (Math.floor(Math.random() * 3) - 1) * 20,
        0,
        0,
        beats.start * 100
      )
      tempObject.updateMatrix()
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ref.current!.setMatrixAt(i, tempObject.matrix)
    })
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ref.current!.instanceMatrix.needsUpdate = true
  }, [confirmedBeats])

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, confirmedBeats.length]}
    >
      <boxBufferGeometry attach='geometry' args={[10, 2, 15]} />
      {/* <meshLambertMaterial attach='material' color={'blue'} /> */}
      <meshStandardMaterial color={'orange'} />
    </instancedMesh>
  )
}

export default Targets
