import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware((auth, req) =>{
}, {
  debug: true,
  publicRoutes: ['/'],
  ignoreRoutes: ['/api/*'],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
