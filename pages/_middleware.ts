import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.endsWith('.xml')) {
        return NextResponse.rewrite('/sitemap')
    }
    NextResponse.next()
}
