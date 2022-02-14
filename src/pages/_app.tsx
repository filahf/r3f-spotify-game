import { useRouter } from 'next/router'
import useStore from '@/helpers/store'
import { useEffect } from 'react'
import Header from '@/config'
import Dom from '@/components/layout/dom'
import partition from '@/helpers/partition'
import dynamic from 'next/dynamic'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import theme from '@/helpers/theme'

const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: false,
})

const Balance = ({ child }: { child: JSX.Element }) => {
  const [r3f, dom] = partition(child, (c: JSX.Element) => c.props?.r3f === true)

  return (
    <>
      <Dom>{dom}</Dom>
      <LCanvas>{r3f}</LCanvas>
    </>
  )
}

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    useStore.setState({ router: router })
  }, [router])

  // @ts-ignore
  const child = Component(pageProps).props.children

  return (
    <>
      <ChakraProvider resetCSS theme={theme}>
        <SessionProvider>
          <Header title={pageProps.title} />
          {child && child.length > 1 ? (
            // @ts-ignore
            <Balance child={Component(pageProps).props.children} />
          ) : (
            <Component {...pageProps} />
          )}
        </SessionProvider>
      </ChakraProvider>
    </>
  )
}

export default App
