import { NextRouter } from 'next/router'
import create from 'zustand'

type StoreType = {
  router: NextRouter | null
  isPlaying: boolean
  connected: boolean
  selectedTrack: SpotifyApi.TrackObjectFull | null
  spotifyWebPlayer: Spotify.Player | null
  currentTrack: Spotify.Track | null
  deviceId: string | null
}

const useStore = create<StoreType>(() => {
  return {
    router: null,
    isPlaying: false,
    connected: false,
    selectedTrack: null,
    spotifyWebPlayer: null,
    currentTrack: null,
    deviceId: null,
  }
})

export default useStore
