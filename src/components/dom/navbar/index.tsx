import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const colormode = useColorMode()
  const router = useRouter()
  const route = router.pathname
  const { data: session } = useSession()

  return (
    <Flex
      position='fixed'
      width='100%'
      justifyContent='center'
      top={0}
      zIndex={900}
    >
      <Box color={'gray.600'} px={4} width='80%' maxWidth='1500px'>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {/* {NavItems.map((link: NavItemType) => (
                <NavLink
                  colorMode={colormode.colorMode}
                  route={route}
                  key={link.href}
                  url={link.href}
                  name={link.label}
                />
              ))}
              {session && <NewButton />} */}
            </HStack>
          </HStack>
          <HStack alignItems='center' spacing={2}>
            hej
            {/* {session ? <Profile /> : <SignInButton />} */}
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {/* {NavItems.map((link: NavItemType) => (
                <NavLink
                  colorMode={colormode.colorMode}
                  route={route}
                  key={link.href}
                  url={link.href}
                  name={link.label}
                />
              ))} */}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Flex>
  )
}

export default Navbar
