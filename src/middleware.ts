import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  try {
    console.log("Middleware called for path:", request.nextUrl.pathname)

    // Allow access to NextAuth API routes
    if (request.nextUrl.pathname.startsWith('/api/auth')) {
      console.log("Allowing access to NextAuth API route")
      return NextResponse.next()
    }

    const token = await getToken({ 
      req: request as any, 
      secret: process.env.NEXTAUTH_SECRET
    })
    console.log("Token:", token ? "exists" : "does not exist")

    if (!token && (request.nextUrl.pathname.startsWith('/api/') || request.nextUrl.pathname === '/dashboard')) {
      console.log("No token, redirecting or returning unauthorized")
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return new NextResponse(
          JSON.stringify({ success: false, message: 'Authentication failed' }),
          { status: 401, headers: { 'content-type': 'application/json' } }
        )
      } else {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
      }
    }

    console.log("Proceeding to next middleware or route handler")
    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    )
  }
}

export const config = {
  matcher: ['/api/:path*', '/dashboard']
}