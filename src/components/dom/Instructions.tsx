import {
  InstructionsStyle,
  InstructionsStyle1,
  InstructionsStyle2,
} from '@/components/dom/Instructions.style'
export default function Instructions() {
  return (
    <InstructionsStyle
      style={{
        backgroundColor: 'rgb(27, 30, 40)',
        maxWidth: 'calc(100% - 28px)',
      }}
    >
      <InstructionsStyle1>
        This is a minimal starter for Nextjs + Threejs. Click on the cube to
        navigate to the `/box` page. OrbitControls is enabled by default.
      </InstructionsStyle1>
      <InstructionsStyle2>
        Step 1 -<span style={{ color: 'rgb(84, 90, 114)' }}>update:</span>
        <span style={{ color: 'rgb(249, 196, 232)' }}> @/pages/index </span>
        <br />
        Step 2 -<span style={{ color: 'rgb(84, 90, 114)' }}>update:</span>
        <span style={{ color: 'rgb(249, 196, 232)' }}>
          {' '}
          @/components/canvas/Shader/Shader{' '}
        </span>
        <br />
        Step 3 -<span style={{ color: 'rgb(84, 90, 114)' }}>delete:</span>
        <span style={{ color: 'rgb(249, 196, 232)' }}> @/pages/box </span>
        <br />
        Step 4 -{' '}
        <span style={{ color: 'rgb(84, 90, 114)' }}>update header:</span>
        <span style={{ color: 'rgb(249, 196, 232)' }}> @/config </span>
        <br />
        Step 5 -<span style={{ color: 'rgb(84, 90, 114)' }}>delete:</span>
        <span style={{ color: 'rgb(249, 196, 232)' }}>
          {' '}
          @/components/dom/Instructions
        </span>
      </InstructionsStyle2>
    </InstructionsStyle>
  )
}
