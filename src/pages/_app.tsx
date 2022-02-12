// @ts-nocheck
import { useRouter } from 'next/router'
import useStore from '@/helpers/store'
import { useEffect } from 'react'
import Header from '@/config'
import Dom from '@/components/layout/dom'
import partition from '@/helpers/partition'
import dynamic from 'next/dynamic'
import { SessionProvider } from 'next-auth/react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  }
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: false,
})

const Balance = ({ child }) => {
  const [r3f, dom] = partition(child, (c) => c.props?.r3f === true)

  return (
    <>
      <Dom>{dom}</Dom>
      <LCanvas>{r3f}</LCanvas>
    </>
  )
}

function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()

  useEffect(() => {
    useStore.setState({ router: router })
  }, [router])

  const child = Component(pageProps).props.children

  return (
    <>
      <SessionProvider>
        <GlobalStyle />
        <Header title={pageProps.title} />
        <ThemeProvider theme={theme}>
          {child && child.length > 1 ? (
            <Balance child={Component(pageProps).props.children} />
          ) : (
            <Component {...pageProps} />
          )}
        </ThemeProvider>
      </SessionProvider>
    </>
  )
}

export default App
