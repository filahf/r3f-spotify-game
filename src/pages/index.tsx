import BoxComponent from '@/components/canvas/Box'
import Overlay from '@/components/dom/overlay'

const Page = () => {
  return (
    <>
      <Overlay />
      <BoxComponent r3f />
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
