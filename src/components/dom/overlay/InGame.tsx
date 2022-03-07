import { Box, Stack } from '@chakra-ui/react'

import { Score } from '../score'

const InGame = () => {
  return (
    <Stack textAlign={'center'} py={4}>
      <Box>
        <Score />
      </Box>
    </Stack>
  )
}

export default InGame
