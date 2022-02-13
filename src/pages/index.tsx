import { Stack } from '@chakra-ui/react'
import Infobox from '@/components/dom/Infobox'
import Search from '@/components/dom/search'
import Standard from '@/components/layout/standard'

const Page = () => {
  return (
    <>
      <Standard>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Infobox />
          <Search />
        </Stack>
      </Standard>
    </>
  )
}

export default Page
