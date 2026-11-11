import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const DESIGNATED_ADMIN_EMAIL = 'prajapatipriyanshu@gmail.com';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // If Supabase is not configured yet, allow route handling in fallback mode
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value,
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({
          name,
          value,
          ...options,
        });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value: '',
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({
          name,
          value: '',
          ...options,
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Strict route protection for /admin/dashboard:
  // Must be authenticated AND must match the designated admin email
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('redirectedFrom', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    const adminEmail = process.env.ADMIN_EMAIL || DESIGNATED_ADMIN_EMAIL;
    if (user.email?.toLowerCase() !== adminEmail.toLowerCase()) {
      // User is logged in with an unauthorized account
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('error', 'unauthorized');
      return NextResponse.redirect(url);
    }
  }

  // If user is already logged in as authorized admin and visits /admin/login, redirect to dashboard
  if (request.nextUrl.pathname === '/admin/login' && user) {
    const adminEmail = process.env.ADMIN_EMAIL || DESIGNATED_ADMIN_EMAIL;
    if (user.email?.toLowerCase() === adminEmail.toLowerCase()) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/dashboard';
      return NextResponse.redirect(url);
    }
  }

  return response;
}
