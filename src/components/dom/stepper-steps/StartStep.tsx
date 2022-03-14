import useSpotify from '@/hooks/useSpotify'
import useStore from '@/shared/store'
import { Button, Kbd, Text } from '@chakra-ui/react'
import { useCallback } from 'react'

const StartStep = () => {
  const player = useStore((s) => s.spotifyWebPlayer)
  const selectedTrack = useStore((s) => s.selectedTrack)
  const spotifyApi = useSpotify()

  const handleOnStart = useCallback(() => {
    if (!player || !selectedTrack) return
    spotifyApi.play({ uris: [selectedTrack.uri] }).then(() => {
      useStore.setState({ startGame: true })
    })
  }, [player, selectedTrack, spotifyApi])

  return (
    <>
      <Button mb={4} onClick={handleOnStart}>
        START
      </Button>
      <Text>Controls</Text>
      <Text>
        <Kbd>A</Kbd> <Kbd>S</Kbd> <Kbd>D</Kbd> or <Kbd>←</Kbd>
        <Kbd>↓</Kbd> <Kbd>→</Kbd>
      </Text>
    </>
  )
}

export default StartStep
