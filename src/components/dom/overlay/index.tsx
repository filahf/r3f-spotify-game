import useSpotifyPlayer from '@/hooks/useSpotifyPlayer'
import useStore from '@/utils/store'
import { Stack, Text, VStack } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'

import Search from '../search'
import UserAvatar from '../user-avatar'

export default function Overlay() {
  const { data: session } = useSession()

  const track = useStore((s) => s.currentTrack)
  const connected = useStore((s) => s.connected)
  const deviceId = useStore((s) => s.deviceId)
  const selectedTrack = useStore((s) => s.selectedTrack)

  useSpotifyPlayer(session?.user.accessToken)

  return (
    <Stack textAlign={'center'} py={4}>
      <VStack>
        <Text>Current track: {track ? track.name : 'undefined'}</Text>
        <Text>Spotify remote: {connected ? 'YES' : 'NO'} </Text>
        <Text>Device id: {deviceId} </Text>
        <Text>Selected track: {selectedTrack?.name} </Text>
      </VStack>
      {session && session.user.name && (
        <UserAvatar name={session.user.name} imgSrc={session.user.image} />
      )}
      <Search />
    </Stack>
  )
}
