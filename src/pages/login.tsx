import { InferGetServerSidePropsType } from 'next'
import { getProviders, signIn } from 'next-auth/react'

const Login = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  return (
    <>
      <div>Login Page</div>
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
              {provider.name}
            </button>
          </div>
        ))}
    </>
  )
}

export const getServerSideProps = async () => {
  const providers = await getProviders()

  return {
    props: {
      providers: providers,
    },
  }
}

export default Login
