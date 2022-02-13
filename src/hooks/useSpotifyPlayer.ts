import { useEffect, useState } from 'react'
const track = {
  name: '',
  album: {
    images: [{ url: '' }],
  },
  artists: [{ name: '' }],
}
const useSpotifyPlayer = (accessToken: string | undefined) => {
  const [is_paused, setPaused] = useState(false)
  const [is_active, setActive] = useState(false)
  const [player, setPlayer] = useState<Spotify.Player>()
  const [current_track, setTrack] = useState(track)

  useEffect(() => {
    if (!accessToken) return
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true

    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Filip App',
        getOAuthToken: (cb) => {
          cb(accessToken)
        },
        volume: 0.5,
      })

      setPlayer(player)

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
      })

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
      })

      player.addListener('player_state_changed', (state) => {
        if (!state) {
          return
        }

        setTrack(state.track_window.current_track)
        setPaused(state.paused)

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true)
        })
      })

      player.connect()
    }
  }, [accessToken])

  return { is_active, is_paused, player, current_track }
}

export default useSpotifyPlayer
