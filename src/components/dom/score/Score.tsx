// https://github.com/pmndrs/racing-game/blob/main/src/ui/Speed/Text.tsx

import useStore from '@/shared/store'
import { Text, VStack } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

const Score = () => {
  const ref = useRef<HTMLParagraphElement>(null)

  const score = useStore((s) => s.score)
  const streakMultiplier = useStore((s) => s.streakMultiplier)
  const start = useStore((s) => s.startGame)

  useEffect(() => {
    if (!ref.current) return

    if (ref.current.innerText !== score.toString()) {
      ref.current.innerText = score.toString()
    }
  })

  return (
    <>
      <VStack>
        <Text>SCORE</Text>
        <Text textStyle='score' mb={0} pb={0} ref={ref}>
          {score}
        </Text>
        {start && (
          <Text mt={0} fontWeight='bold'>
            {streakMultiplier}x
          </Text>
        )}
      </VStack>
    </>
  )
}

export default Score
