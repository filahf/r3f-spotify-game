import useSpotify from '@/hooks/useSpotify'
import useSpotifyPlayer from '@/hooks/useSpotifyPlayer'
import useStore from '@/utils/store'
import { Box, Button, Stack } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useCallback } from 'react'

import Search from '../search'
import UserAvatar from '../user-avatar'

export default function Overlay() {
  const { data: session } = useSession()

  const player = useStore((s) => s.spotifyWebPlayer)
  const connected = useStore((s) => s.connected)
  const selectedTrack = useStore((s) => s.selectedTrack)

  const spotifyApi = useSpotify()

  useSpotifyPlayer(session?.user.accessToken)

  const handleOnStart = useCallback(() => {
    if (!player || !selectedTrack) return
    spotifyApi.play({ uris: [selectedTrack.uri] }).then(() => {
      player.seek(0)
      useStore.setState({ startGame: true })
    })
  }, [player, selectedTrack, spotifyApi])

  return (
    <Stack textAlign={'center'} py={4}>
      {session && session.user.name && (
        <UserAvatar name={session.user.name} imgSrc={session.user.image} />
      )}
      <Search />
      {connected && player && selectedTrack && (
        <Box>
          <Button onClick={handleOnStart}>START</Button>
        </Box>
      )}
    </Stack>
  )
}
