import { Landing } from '@/views/dom'
import dynamic from 'next/dynamic'

const LandingShip = dynamic<Record<string, unknown>>(
  () => import('@/components/canvas/ship').then((module) => module.LandingShip),
  { ssr: false }
)

const Page = () => {
  return (
    <>
      <Landing />
      <LandingShip r3f />
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
