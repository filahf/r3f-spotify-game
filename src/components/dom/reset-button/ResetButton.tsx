import useStore from '@/shared/store'
import { CloseIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'

const ResetButton = () => {
  const resetGame = useStore((s) => s.resetGame)
  return (
    <>
      <Box
        position={'absolute'}
        left={0}
        top={0}
        px={3}
        mt={7}
        rounded='2xl'
        display='flex'
        color='white'
        cursor={'pointer'}
        onClick={() => resetGame()}
      >
        <CloseIcon />
      </Box>
    </>
  )
}

export default ResetButton
