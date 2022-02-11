import { DomStyle } from '@/components/layout/dom.style'
import useStore from '@/helpers/store'
import { useEffect, useRef } from 'react'

const Dom = ({ children }) => {
  const ref = useRef(null)
  useEffect(() => {
    useStore.setState({ dom: ref })
  }, [])

  return <DomStyle ref={ref}>{children}</DomStyle>
}

export default Dom
