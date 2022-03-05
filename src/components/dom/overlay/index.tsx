import useSpotify from '@/hooks/useSpotify'
import useSpotifyPlayer from '@/hooks/useSpotifyPlayer'
import useStore from '@/shared/store'
import { Box, Button, Center, Spinner, Stack } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect } from 'react'

import Search from '../search'
import UserAvatar from '../user-avatar'

export default function Overlay() {
  const { data: session } = useSession()

  const player = useStore((s) => s.spotifyWebPlayer)
  const connected = useStore((s) => s.connected)
  const selectedTrack = useStore((s) => s.selectedTrack)
  const { activeStep, setStep } = useSteps({
    initialStep: 0,
  })

  const steps = [
    { label: 'Connect Spotify' },
    { label: 'Select Track' },
    { label: 'Start the game' },
  ]

  const spotifyApi = useSpotify()

  useSpotifyPlayer(session?.user.accessToken)

  const handleOnStart = useCallback(() => {
    if (!player || !selectedTrack) return
    spotifyApi.play({ uris: [selectedTrack.uri] }).then(() => {
      player.seek(0)
      useStore.setState({ startGame: true })
    })
  }, [player, selectedTrack, spotifyApi])

  useEffect(() => {
    if (connected && selectedTrack) {
      setStep(3)
    } else if (connected) {
      setStep(1)
    }
  }, [connected, selectedTrack, setStep])

  return (
    <Stack textAlign={'center'} py={4}>
      {session && session.user.name && (
        <UserAvatar name={session.user.name} imgSrc={session.user.image} />
      )}
      <Box>
        {player && (
          <Center>
            <Box width='60%'>
              <Steps activeStep={activeStep}>
                {steps.map(({ label }) => (
                  <Step label={label} key={label}>
                    <Box my={5}>
                      {activeStep === 3 && (
                        <Button onClick={handleOnStart}>START</Button>
                      )}
                      {activeStep === 1 && <Search />}
                    </Box>
                  </Step>
                ))}
              </Steps>
            </Box>
          </Center>
        )}
        <Box my={5}>
          {!player && <Spinner />}
          {activeStep === 3 && <Button onClick={handleOnStart}>START</Button>}
        </Box>
      </Box>
    </Stack>
  )
}
