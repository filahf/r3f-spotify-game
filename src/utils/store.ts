import { AudioData } from '@/types'
import { NextRouter } from 'next/router'
import create from 'zustand'

type StoreType = {
  router: NextRouter | null
  connected: boolean
  selectedTrack: SpotifyApi.TrackObjectFull | null
  spotifyWebPlayer: Spotify.Player | null
  currentTrack: Spotify.Track | null
  audioAnalysis: AudioData | null
  startGame: boolean
}

export const GAME_CONSTANTS = {
  laneWidth: 20,
}

const useStore = create<StoreType>((set, get) => {
  return {
    set,
    get,
    router: null,
    isPlaying: false,
    connected: false,
    selectedTrack: null,
    spotifyWebPlayer: null,
    currentTrack: null,
    deviceId: null,
    audioAnalysis: null,
    startGame: false,
  }
})

export default useStore
