import { Box, Stack } from '@chakra-ui/react'

import { ResetButton } from '../reset-button'
import { Score } from '../score'

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
