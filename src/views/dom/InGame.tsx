import { ResetButton } from '@/components/dom/reset-button'
import { Score } from '@/components/dom/score'
import { Box, Stack } from '@chakra-ui/react'

const InGame = () => {
  return (
    <>
      <ResetButton />
      <Stack textAlign={'center'} py={4}>
        <Box>
          <Score />
        </Box>
      </Stack>
    </>
  )
}

export default InGame
