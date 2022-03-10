import { ResetButton } from '@/components/dom/reset-button'
import { Score } from '@/components/dom/score'
import { Box } from '@chakra-ui/react'

const InGame = () => {
  return (
    <>
      <ResetButton />
      <Box mt={6}>
        <Score />
      </Box>
    </>
  )
}

export default InGame
