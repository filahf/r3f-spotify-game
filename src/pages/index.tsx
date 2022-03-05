import { Road } from '@/components/canvas/road'
import { Ship } from '@/components/canvas/ship'
import { Targets } from '@/components/canvas/targets'
import { Onboarding } from '@/components/dom/overlay'

const Page = () => {
  return (
    <>
      <Onboarding />
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
