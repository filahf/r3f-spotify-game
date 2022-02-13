import useStore from '@/helpers/store'
import { useEffect, useRef } from 'react'
import { Container } from '@chakra-ui/react'
import Navbar from '../dom/navbar'

type DomType = {
  children: JSX.Element
}

const Standard = ({ children }: DomType) => {
  return (
    <Container
      maxW={'5xl'}
      zIndex={10}
      position={'absolute'}
      left={0}
      right={0}
      mx={'auto'}
    >
      <Navbar />
      {children}
    </Container>
  )
}

export default Standard
