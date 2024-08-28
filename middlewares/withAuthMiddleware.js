import { getToken } from 'next-auth/jwt';

import { NextResponse } from 'next/server';

export function withAuthMiddleware(middleware) {
    return async (request, event, response) => {
        const pathname = request.nextUrl.pathname;
        if (
          pathname.startsWith("/_next") || // exclude Next.js internals
          pathname.startsWith("/static") || // exclude static files
          pathname.startsWith("/api") ||  // exclude API routes
          pathname.startsWith("/event/*") // exclude API routes
        )
          return NextResponse.next();
      
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
        console.log(token,process.env.NEXTAUTH_SECRET,request,'token')
        if (!token) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        return middleware(request, event, response);
    };

}
