import 'next-auth'

declare module 'next-auth' {
  interface User {
    accessToken: string
    refreshToken: string
  }

  interface Session {
    user: User
  }
}
