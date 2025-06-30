// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentUser } from '@/service/actions/auth.services';

const AuthRoutes = ["/login", "/register"];

// Define your roles explicitly
type Role = 'USER' | 'ADMIN';

const roleBasedRoutes: Record<Role, RegExp[]> = {
  USER: [/^\/profile/, /^\/dashboard/],
  ADMIN: [/^\/admin/, /^\/dashboard/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();
console.log('mid',user);
console.log(pathname);
  // 1. Handle unauthenticated users
  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  // 2. Handle authenticated users trying to access auth routes
  if (user && AuthRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 3. Handle role-based access control
  const userRole = user.role as Role;
  if (roleBasedRoutes[userRole]) {
    const allowedRoutes = roleBasedRoutes[userRole];
    const isAllowed = allowedRoutes.some(route => pathname.match(route));
    
    if (isAllowed) {
      return NextResponse.next();
    }
  }

  // Default redirect if no conditions are met
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: [
    '/profile',
    '/profile/:path*',
    '/admin',
    '/admin/:path*',
    '/dashboard',
    '/dashboard/:path*',
    '/login',
    '/register'
  ],
};