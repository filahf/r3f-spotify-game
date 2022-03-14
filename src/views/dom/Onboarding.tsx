import {
  ConnectStep,
  SelectTrackStep,
  StartStep,
  steps,
} from '@/components/dom/stepper-steps'
import useSpotifyPlayer from '@/hooks/useSpotifyPlayer'
import useStore from '@/shared/store'
import { Box, Center, Spinner, Stack } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const Onboarding = () => {
  const { data: session } = useSession()

  const player = useStore((s) => s.spotifyWebPlayer)
  const connected = useStore((s) => s.connected)
  const selectedTrack = useStore((s) => s.selectedTrack)
  const { activeStep, setStep } = useSteps({
    initialStep: 0,
  })

  useSpotifyPlayer(session?.user.accessToken)

  useEffect(() => {
    if (connected && selectedTrack) {
      setStep(3)
    } else if (connected) {
      setStep(1)
    } else {
      setStep(0)
    }
  }, [connected, selectedTrack, setStep])

  return (
    <Stack textAlign={'center'} py={4}>
      <Box>
        {player && (
          <Center>
            <Box width='60%'>
              <Steps activeStep={activeStep}>
                {steps.map(({ label }) => (
                  <Step label={label} key={label} />
                ))}
              </Steps>
            </Box>
          </Center>
        )}
        <Box my={5}>
          {!player && <Spinner />}
          {activeStep === 0 && <ConnectStep />}
          {activeStep === 1 && <SelectTrackStep />}
          {activeStep === 3 && <StartStep />}
        </Box>
      </Box>
    </Stack>
  )
}

export default Onboarding
