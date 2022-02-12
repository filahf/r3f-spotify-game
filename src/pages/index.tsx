import Infobox from '@/components/dom/Infobox'

import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'

const Box = dynamic(() => import('@/components/canvas/Box'), {
  ssr: false,
})

const DOM = () => {
  return (
    <>
      <Infobox />
    </>
  )
}

const R3F = () => {
  return (
    <>
      <Box route='/' />
    </>
  )
}

const Page = () => {
  return (
    <>
      <DOM />
      {/* @ts-ignore */}
      <R3F r3f />
    </>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  return {
    props: {
      title: 'Box',
      session: session,
    },
  }
}
