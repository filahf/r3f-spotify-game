import LCanvas from '@/components/layout/canvas'
import Dom from '@/components/layout/dom'
import Header from '@/shared/header-config'
import useStore from '@/shared/store'
import theme from '@/shared/theme'
import partition from '@/utils/partition'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

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
        <SessionProvider session={session}>
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
