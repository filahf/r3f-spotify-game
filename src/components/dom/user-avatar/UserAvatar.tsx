import { Avatar, Box, HStack, Text } from '@chakra-ui/react'
import { signOut } from 'next-auth/react'

type UserAvatarProps = {
  imgSrc?: string | null
  name: string
}

const UserAvatar = ({ name, imgSrc }: UserAvatarProps) => {
  return (
    <Box
      position={'absolute'}
      right={0}
      top={0}
      px={3}
      mt={5}
      rounded='2xl'
      display='flex'
      color='white'
      cursor={'pointer'}
      onClick={() => signOut()}
    >
      <HStack spacing={2}>
        <Avatar size={'sm'} name={name} src={imgSrc || undefined} />
        <Text>Sign Out</Text>
      </HStack>
    </Box>
  )
}

export default UserAvatar
