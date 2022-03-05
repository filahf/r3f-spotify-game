declare module '*.vert' {
  const content: string
  export default content
}

declare module '*.frag' {
  const content: string
  export default content
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      roadShaderMaterial: ReactThreeFiber.Object3DNode<
        roadShaderMaterial,
        typeof RoadShaderMaterial
      >
    }
  }
}
