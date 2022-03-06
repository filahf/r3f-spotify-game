import { AudioData } from '@/types'
import { NextRouter } from 'next/router'
import { createRef, RefObject } from 'react'
import { Mesh } from 'three'
import create from 'zustand'

type StoreType = {
  router: NextRouter | null
  connected: boolean
  selectedTrack: SpotifyApi.TrackObjectFull | null
  spotifyWebPlayer: Spotify.Player | null
  currentTrack: Spotify.Track | null
  audioAnalysis: AudioData | null
  startGame: boolean
  ship: RefObject<Mesh>
  hitStreak: number
  resetHitStreak: () => void
  score: number
  setScore: () => void
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
    ship: createRef(),
    hitStreak: 0,
    resetHitStreak: () => set(() => ({ hitStreak: 0 })),
    score: 0,
    setScore: () => {
      const streak = Math.floor(get().hitStreak / 10)
      const streakMuliplier = streak > 0 ? streak : 1

      return set((state) => ({
        score: state.score + 10 * streakMuliplier,
        hitStreak: state.hitStreak + 1,
      }))
    },
  }
})

export default useStore
