import { NextRouter } from 'next/router'
import { RefObject } from 'react'
import create from 'zustand'

type StoreType = {
  router: NextRouter | null
  dom: RefObject<HTMLDivElement> | null
  isPlaying: boolean
  currentTrack: string | null
}

const useStore = create<StoreType>(() => {
  return {
    router: null,
    dom: null,
    isPlaying: false,
    currentTrack: null,
  }
})

export default useStore
