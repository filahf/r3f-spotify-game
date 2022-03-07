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
  streakMultiplier: number
  resetHitStreak: () => void
  score: number
  setScore: () => void
  explosions: Explosion[]
  addExplosion: (positionX: number) => void
}

type Explosion = {
  positionX: number
  ts: number
}

export const GAME_CONSTANTS = {
  laneWidth: 20,
}

const useStore = create<StoreType>((set, get) => {
  let cancelExplosionTO: NodeJS.Timeout | undefined = undefined
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
    streakMultiplier: 1,
    resetHitStreak: () => set(() => ({ hitStreak: 0 })),
    score: 0,
    explosions: [],
    setScore: () => {
      const streak = Math.floor(get().hitStreak / 10)
      const streakMuliplier = streak > 0 ? streak : 1

      set((state) => ({
        score: state.score + 10 * streakMuliplier,
        hitStreak: state.hitStreak + 1,
        streakMultiplier: streakMuliplier,
      }))
    },
    addExplosion: (positionX: number) => {
      set((state) => ({
        explosions: [
          ...state.explosions,
          { positionX: positionX, ts: Date.now() },
        ],
      }))

      cancelExplosionTO && clearTimeout(cancelExplosionTO)
      cancelExplosionTO = setTimeout(
        () =>
          set((state) => ({
            explosions: state.explosions.filter(
              ({ ts }) => Date.now() - ts <= 700
            ),
          })),
        700
      )
    },
  }
})

export default useStore
