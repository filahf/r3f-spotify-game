import useStore from '@/helpers/store'
import { useEffect, useRef } from 'react'
import { Container } from '@chakra-ui/react'

type DomType = {
  children: JSX.Element
}

const Dom = ({ children }: DomType) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    useStore.setState({ dom: ref })
  }, [])

  return (
    <Container
      maxW={'5xl'}
      zIndex={10}
      userSelect={'none'}
      position={'absolute'}
      left={0}
      right={0}
      mx={'auto'}
      ref={ref}
    >
      {children}
    </Container>
  )
}

export default Dom
