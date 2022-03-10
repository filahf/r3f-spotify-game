import { Score } from '@/components/dom/score'
import useStore from '@/shared/store'
import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'
const EndGame = () => {
  const resetGame = useStore((s) => s.resetGame)
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={true}
        isCentered
        onClose={() => resetGame()}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody bg='black' p={10}>
            <Center flexDir='column'>
              <Score />
              <Button mt={3} onClick={() => resetGame()}>
                New Game
              </Button>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EndGame
