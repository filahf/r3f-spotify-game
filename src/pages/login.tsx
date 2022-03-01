import { Button, Heading, Icon, Stack, Text } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { BsSpotify } from 'react-icons/bs'

const Box = dynamic(() => import('@/components/canvas/Box'), {
  ssr: false,
})

const Login = () => {
  return (
    <>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Lorem Ipsum{' '}
          <Text as={'span'} color={'green.400'}>
            made easy
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          This game is built using Next.js + Three.js. To enter the game you
          need to be authorized.
        </Text>
        <Stack spacing={6} direction={'row'}>
          <Button
            rounded={'full'}
            px={6}
            colorScheme={'green'}
            bg={'green.400'}
            _hover={{ bg: 'green.500' }}
            onClick={() => signIn('spotify', { callbackUrl: '/' })}
            rightIcon={<Icon as={BsSpotify} mb={1} />}
          >
            Sign in with Spotify
          </Button>
        </Stack>
      </Stack>
      <Box r3f />
    </>
  )
}

export default Login
