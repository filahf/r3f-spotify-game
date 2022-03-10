import useStore from '@/shared/store'
import { EndGame, InGame, Onboarding } from '@/views/dom'
import dynamic from 'next/dynamic'

const GameCanvas = dynamic<Record<string, unknown>>(
  () => import('@/views/canvas').then((module) => module.GameCanvas),
  { ssr: false }
)

const DomElements = () => {
  const start = useStore((s) => s.startGame)
  const endGame = useStore((s) => s.endGame)

  return (
    <>
      {!start && !endGame && <Onboarding />}
      {start && !endGame && <InGame />}
      {!start && endGame && <EndGame />}
    </>
  )
}

const Page = () => {
  return (
    <>
      <DomElements />
      <GameCanvas r3f />
    </>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Home',
    },
  }
}

export default Page
