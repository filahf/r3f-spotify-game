import { NextRouter } from 'next/router'
import create from 'zustand'

type StoreType = {
  router: NextRouter | null
  isPlaying: boolean
  currentTrack: string | null
}

const useStore = create<StoreType>(() => {
  return {
    router: null,
    isPlaying: false,
    currentTrack: null,
  }
})

export default useStore
