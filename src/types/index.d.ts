import 'next-auth'

declare module 'next-auth' {
  interface User {
    accessToken: string
    refreshToken: string
    username: string
  }

  interface Session {
    user: User
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      r3f?: boolean
    }
  }
}
