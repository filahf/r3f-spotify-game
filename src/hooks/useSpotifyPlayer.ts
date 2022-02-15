import useStore from '@/utils/store'
import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'

const useSpotifyPlayer = (accessToken: string | undefined) => {
  const toast = useToast()
  useEffect(() => {
    if (!accessToken) {
      console.log('Couldnt start spotify player')
      return
    }

    if (document.querySelector('script#spotify-sdk') !== null) return

    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true
    script.id = 'spotify-sdk'

    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Filip App',
        getOAuthToken: (cb) => {
          cb(accessToken)
        },
        volume: 0.5,
      })

      useStore.setState({ spotifyWebPlayer: player })

      player.addListener('ready', ({ device_id }) => {
        useStore.setState({ deviceId: device_id })
      })

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
      })

      player.addListener('player_state_changed', (state) => {
        if (!state) {
          return
        }
        console.log('state change', state)

        useStore.setState({ currentTrack: state.track_window.current_track })
        useStore.setState({ isPlaying: state.paused })

        player.getCurrentState().then((state) => {
          if (state && !useStore.getState().connected) {
            toast({
              title: 'Account created.',
              description: "We've created your account for you.",
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
          }
          !state
            ? useStore.setState({ connected: false })
            : useStore.setState({ connected: true })
        })
      })

      player.connect()
    }
  }, [accessToken, toast])
}

export default useSpotifyPlayer
