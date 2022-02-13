import WebPlayback from '@/components/dom/spotify-web-playback'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getSession } from 'next-auth/react'

const Test = ({ accessToken }: { accessToken: string }) => {
  return (
    <>
      <WebPlayback token={accessToken} />
    </>
  )
}

export default Test

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  return {
    props: {
      title: 'Player',
      accessToken: session?.user.accessToken,
    },
  }
}
