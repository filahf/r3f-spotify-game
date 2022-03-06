// https://github.com/pmndrs/racing-game/blob/main/src/ui/Speed/Text.tsx

import useStore from '@/shared/store'
import { addEffect } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

const Score = () => {
  const ref = useRef<HTMLSpanElement>(null)

  const score = useStore((s) => s.score)

  useEffect(() =>
    addEffect(() => {
      if (!ref.current) return

      if (ref.current.innerText !== score.toString()) {
        ref.current.innerText = score.toString()
      }
    })
  )
  return (
    <>
      <span ref={ref}>{score}</span>
    </>
  )
}

export default Score
