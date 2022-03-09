import { Landing } from '@/views/dom'
import dynamic from 'next/dynamic'

const LandingPageCanvas = dynamic<Record<string, unknown>>(
  () => import('@/views/canvas/').then((module) => module.LandingPageCanvas),
  { ssr: false }
)

const Page = () => {
  return (
    <>
      <Landing />
      <LandingPageCanvas r3f />
    </>
  )
}
export const getStaticProps = async () => {
  return {
    props: {
      title: 'Login',
    },
  }
}
export default Page
