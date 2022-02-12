import {
  InstructionsStyle,
  InstructionsStyle1,
  InstructionsStyle2,
} from '@/components/dom/Instructions.style'
import Link from 'next/link'
export default function Instructions() {
  return (
    <InstructionsStyle
      style={{
        backgroundColor: 'rgb(27, 30, 40)',
        maxWidth: 'calc(100% - 28px)',
      }}
    >
      <InstructionsStyle1>
        This game is built using Next.js + Three.js. To enter the game you need
        to follow the instructions below.
      </InstructionsStyle1>
      <InstructionsStyle2>
        Step 1 -<span style={{ color: 'rgb(84, 90, 114)' }}>create:</span>
        <span style={{ color: 'rgb(249, 196, 232)' }}>
          {' '}
          <Link href={'https://developer.spotify.com/dashboard/applications'}>
            <a>a new spotify app (click me)</a>
          </Link>
        </span>
        <br />
        Step 2 -<span style={{ color: 'rgb(84, 90, 114)' }}>update:</span>
        <span style={{ color: 'rgb(249, 196, 232)' }}> .env.local</span>
        <br />
        Step 3 -<span style={{ color: 'rgb(84, 90, 114)' }}>authorize:</span>
        <span style={{ color: 'rgb(249, 196, 232)' }}>
          {' '}
          <Link href={'https://developer.spotify.com/dashboard/applications'}>
            <a>the app (click me)</a>
          </Link>{' '}
        </span>
        <br />
        Step 4 -<span style={{ color: 'rgb(84, 90, 114)' }}>start:</span>
        <span style={{ color: 'rgb(249, 196, 232)' }}>
          {' '}
          spotify on a device{' '}
        </span>
        <br />
        Step 5 -<span style={{ color: 'rgb(84, 90, 114)' }}>refresh:</span>
        <span style={{ color: 'rgb(249, 196, 232)' }}> By clicking here</span>
      </InstructionsStyle2>
    </InstructionsStyle>
  )
}
