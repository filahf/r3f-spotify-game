import { Container } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'

import { UserAvatar } from '../dom/user-avatar'

type DomType = {
  children: JSX.Element
}

const Dom = ({ children }: DomType) => {
  const { data: session } = useSession()
  return (
    <Container>
      {session && session.user.name && (
        <UserAvatar name={session.user.name} imgSrc={session.user.image} />
      )}
      <Container
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
    </Container>
  )
}

export default Dom
