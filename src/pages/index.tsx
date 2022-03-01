import BoxComponent from '@/components/canvas/Box'
import Road from '@/components/canvas/road'
import Targets from '@/components/canvas/targets'
import Overlay from '@/components/dom/overlay'

const Page = () => {
  return (
    <>
      <Overlay />
      <BoxComponent r3f />
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
