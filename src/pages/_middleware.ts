import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export const middleware = async (req: NextRequest) => {
  // @ts-ignore
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const url = req.nextUrl.clone()

  // If user allready have a token redirect to the app
  if (token && url.pathname === '/login') {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }
  // Allow the request if:
  // 1. Token request
  // 2. Token exist
  if (
    url.pathname.includes('/api/auth') ||
    url.pathname.includes('Speeder.glb') ||
    token
  ) {
    return NextResponse.next()
  }

  // Else redirect to signin
  if (!token && url.pathname !== '/login') {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
}
