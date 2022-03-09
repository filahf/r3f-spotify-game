import useStore from '@/shared/store'
import { InGame, Onboarding } from '@/views/dom'
import dynamic from 'next/dynamic'

const GameCanvas = dynamic<Record<string, unknown>>(
  () => import('@/views/canvas').then((module) => module.GameCanvas),
  { ssr: false }
)

const DomElements = () => {
  const inGame = useStore((s) => s.startGame)

  return inGame ? <InGame /> : <Onboarding />
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
