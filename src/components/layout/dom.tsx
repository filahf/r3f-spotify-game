import useStore from '@/helpers/store'
import { useEffect, useRef } from 'react'

import styled from 'styled-components'

const DomStyle = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

type DomType = {
  children: JSX.Element
}

const Dom = ({ children }: DomType) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    useStore.setState({ dom: ref })
  }, [])

  return <DomStyle ref={ref}>{children}</DomStyle>
}

export default Dom