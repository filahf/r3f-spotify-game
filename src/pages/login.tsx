import { signIn } from 'next-auth/react'
import dynamic from 'next/dynamic'

const Box = dynamic(() => import('@/components/canvas/Box'), {
  ssr: false,
})

const Login = () => {
  return (
    <>
      <div>
        <button onClick={() => signIn('spotify', { callbackUrl: '/' })}>
          Sign in with Spotify
        </button>
      </div>
      <Box r3f route='/' />
    </>
  )
}

export default Login
