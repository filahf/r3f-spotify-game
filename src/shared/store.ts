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
  resetGame: () => void
  endGame: boolean
  setEndGame: () => void
}

type Explosion = {
  positionX: number
  ts: number
}

const newGameState = {
  score: 0,
  selectedTrack: null,
  hitStreak: 0,
  streakMultiplier: 1,
  startGame: false,
  audioAnalysis: null,
  endGame: false,
}

const useStore = create<StoreType>((set, get) => {
  let cancelExplosionTO: NodeJS.Timeout | undefined = undefined
  return {
    set,
    get,
    ...newGameState,
    router: null,
    connected: false,
    spotifyWebPlayer: null,
    currentTrack: null,
    deviceId: null,
    explosions: [],
    ship: createRef(),

    resetHitStreak: () => set(() => ({ hitStreak: 0 })),

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
    resetGame: () => {
      get().spotifyWebPlayer?.pause()
      set(() => ({ ...newGameState }))
    },
    setEndGame: () => {
      set(() => ({ audioAnalysis: null, endGame: true, startGame: false }))
    },
  }
})

export default useStore
