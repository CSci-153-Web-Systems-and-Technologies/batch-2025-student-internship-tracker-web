import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data } = await supabase.auth.getSession();
  const user = data.session?.user;

  const path = request.nextUrl.pathname;

  if (
    user &&
    (path.startsWith("/login") ||
      path.startsWith("/signup") ||
      path.startsWith("/auth") ||
      path.startsWith("/emailconfirm"))
  ) {
    return NextResponse.redirect(new URL("/organization", request.url));
  }
  const publicRoutes = ["/", "/login", "/signup", "/auth", "/emailconfirm"];
  if (!user && !publicRoutes.some((route) => path.startsWith(route))) {
  return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}