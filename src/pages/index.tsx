import { Road } from '@/components/canvas/road'
import { Ship } from '@/components/canvas/ship'
import { Targets } from '@/components/canvas/targets'
import { InGame, Onboarding } from '@/components/dom/overlay'
import useStore from '@/shared/store'

const DomElements = () => {
  const inGame = useStore((s) => s.startGame)

  return inGame ? <InGame /> : <Onboarding />
}

const Page = () => {
  return (
    <>
      <DomElements />
      <Ship r3f />
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
