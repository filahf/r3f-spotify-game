import useStore from '@/helpers/store'
import { useEffect, useRef } from 'react'

type DomType = {
  children: JSX.Element
}

const Dom = ({ children }: DomType) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    useStore.setState({ dom: ref })
  }, [])

  return (
    <div
      className='absolute top-0 left-0 z-10 w-screen h-screen overflow-hidden dom'
      ref={ref}
    >
      {children}
    </div>
  )
}

export default Dom
