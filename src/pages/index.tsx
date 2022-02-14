import { Stack } from '@chakra-ui/react'
import Infobox from '@/components/dom/Infobox'
import Search from '@/components/dom/search'
import BoxComponent from '@/components/canvas/Box'

const Page = () => {
  return (
    <>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        backgroundColor={'red.200'}
      >
        <Infobox />
        <Search />
      </Stack>
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
