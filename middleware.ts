import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { apiAuthRoutes,authRoutes,publicRoutes,REDIRECT_ROUTE } from '@/lib/routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {

    const { nextUrl } = req
    const isLoggedin = !!req.auth

    const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthRoutes)
    const ispublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    console.log('ROUTE: ',req.nextUrl.pathname);
    //console.log('IS LOGGED_IN: ',isLoggedin);
    if(isApiAuthRoutes){
        return;
    }
    if(isAuthRoute){
        if(isLoggedin){
            return Response.redirect(new URL(REDIRECT_ROUTE,nextUrl))
        }
        return
    }
    if(!ispublicRoute && !isLoggedin){
        return Response.redirect(new URL('/auth/login',nextUrl))
    }
})
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)','/','/(api|trpc)(.*)'],
}