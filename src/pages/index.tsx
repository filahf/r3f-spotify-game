import useStore from '@/shared/store'
import { InGame, Onboarding } from '@/views/dom'
import dynamic from 'next/dynamic'

const Road = dynamic<Record<string, unknown>>(
  () => import('@/components/canvas/road').then((module) => module.Road),
  { ssr: false }
)
const GameShip = dynamic<Record<string, unknown>>(
  () => import('@/components/canvas/ship').then((module) => module.GameShip),
  { ssr: false }
)
const Targets = dynamic<Record<string, unknown>>(
  () => import('@/components/canvas/targets').then((module) => module.Targets),
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
      <GameShip r3f />
      <Road r3f />
      <Targets r3f />
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
