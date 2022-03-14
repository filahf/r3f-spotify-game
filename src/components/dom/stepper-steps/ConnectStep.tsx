import { Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import imgSrc from 'public/img/connect-spotify.webp'
const ConnectStep = () => {
  return (
    <>
      <VStack>
        <Text mb={2}>Connect to the game via another Spotify client</Text>
        <Image src={imgSrc} alt='Spotify Client' />
      </VStack>
    </>
  )
}

export default ConnectStep
