import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi()

const useSpotify = () => {
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      session.error === 'RefreshAccessTokenError' && signIn() // Force sign in
      spotifyApi.setAccessToken(session.user.accessToken)
    }
  }, [session])

  return spotifyApi
}

export default useSpotify
