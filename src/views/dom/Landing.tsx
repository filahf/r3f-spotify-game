import { Button, Heading, Icon, Stack, Text } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { BsSpotify } from 'react-icons/bs'

const Landing = () => {
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
          {process.env.NEXT_PUBLIC_APP_NAME}
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          You need to authorize with a Spotify Premium account to enter the
          game.
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
    </>
  )
}

export default Landing
