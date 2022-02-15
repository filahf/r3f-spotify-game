import { useEffect, useRef } from 'react'

export function useKeyPress(target: string[], event: (key: boolean) => void) {
  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) =>
      target.indexOf(key) !== -1 && event(true)
    const upHandler = ({ key }: KeyboardEvent) =>
      target.indexOf(key) !== -1 && event(false)
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [event, target])
}

export function useControls() {
  const keys = useRef({
    left: false,
    right: false,
  })

  useKeyPress(
    ['ArrowLeft', 'a'],
    (pressed: boolean) => (keys.current.left = pressed)
  )
  useKeyPress(
    ['ArrowRight', 'd'],
    (pressed: boolean) => (keys.current.right = pressed)
  )

  return keys
}
