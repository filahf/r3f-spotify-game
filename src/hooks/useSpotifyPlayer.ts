import useStore from '@/shared/store'
import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'

const useSpotifyPlayer = (accessToken: string | undefined) => {
  const toast = useToast()
  const selectedTrack = useStore((s) => s.selectedTrack)
  const setEndGame = useStore((s) => s.setEndGame)

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
        name: process.env.NEXT_PUBLIC_APP_NAME || 'Audio Game',
        getOAuthToken: (cb) => {
          cb(accessToken)
        },
        volume: 0.5,
      })

      useStore.setState({ spotifyWebPlayer: player })

      player.addListener('not_ready', ({ device_id }) => {
        console.error('Device ID has gone offline', device_id)
      })

      player.addListener('player_state_changed', (state) => {
        if (state) {
          useStore.setState({
            currentTrack: state.track_window.current_track,
          })

          if (
            useStore.getState().startGame &&
            state.position === 0 &&
            state.paused
          ) {
            setEndGame()
          }

          if (
            selectedTrack?.uri === state.track_window.current_track.uri &&
            !state.paused
          ) {
            useStore.setState({
              startGame: true,
            })
          }
        }

        player.getCurrentState().then((state) => {
          if (state && !useStore.getState().connected) {
            toast({
              title: "You've connected Spotify.",
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
          }
          if (!state && useStore.getState().connected) {
            toast({
              title: "You've lost connection to Spotify.",
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
          }
          useStore.setState({ connected: !!state })
        })
      })

      player.connect()
    }
  }, [accessToken, toast, selectedTrack, setEndGame])
}

export default useSpotifyPlayer
