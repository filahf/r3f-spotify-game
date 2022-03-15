import { authLog, colorError, colorPass, colorWarning } from '@/utils/chalk-log'
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import SpotifyProvider from 'next-auth/providers/spotify'

const scopes = [
  'user-read-email',
  'user-read-private',
  'streaming',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
].join(',')

const refreshAccessToken = async (token: JWT) => {
  try {
    const url =
      'https://accounts.spotify.com/api/token?' +
      new URLSearchParams({
        client_id: process.env.SPOTIFY_CLIENT_ID || '',
        client_secret: process.env.SPOTIFY_CLIENT_SECRET || '',
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken as string,
      })

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    })

    const refreshedToken = await response.json()

    response.ok && authLog(colorPass('succesfully refreshed token'))
    if (!response.ok) {
      throw refreshedToken
    }

    return {
      ...token,
      acessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    authLog(colorError(error))
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID || '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
      authorization: {
        params: { scope: scopes },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      // initial login
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: (account.expires_at as number) * 1000, // Handle expiry time in ms
        }
      }
      // Return previous token if the access token has not expired
      if (Date.now() < (token.accessTokenExpires as number)) {
        authLog(colorPass('existing token valid'))
        return token
      }

      // Access token expired
      authLog(colorWarning('token has expired, refreshing...'))
      return refreshAccessToken(token)
    },
    // @ts-ignore
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          username: token.username,
        },
      }
    },
  },
  pages: {
    signIn: '/login',
  },
})
