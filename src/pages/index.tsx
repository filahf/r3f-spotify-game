import { Stack } from '@chakra-ui/react'
import Overlay from '@/components/dom/overlay'
import Search from '@/components/dom/search'
import BoxComponent from '@/components/canvas/Box'

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
