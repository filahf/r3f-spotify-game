import useStore from '@/helpers/store'
import { useEffect, useRef } from 'react'
import { Container } from '@chakra-ui/react'

type DomType = {
  children: JSX.Element
}

const Dom = ({ children }: DomType) => {
  return (
    <Container
      className='dom'
      maxW={'5xl'}
      zIndex={10}
      userSelect={'none'}
      position={'absolute'}
      left={0}
      right={0}
      overflow={'hidden'}
      mx={'auto'}
    >
      {children}
    </Container>
  )
}

export default Dom
