import { NextResponse } from "next/server";
// import * as jose from "jose";
// import Cookies from "js-cookie";
import { session } from "./lib/session";

export async function middleware(req) {
  const url = new URL(req.url);
  const path = url.pathname;

  if (path.startsWith("/dashboard")) {
    try {
      const { token } = session();
      // const token = Cookies.get("token");
      // const secretKey = "rahasia";
      // const secret = new TextDecoder().encode(secretKey);

      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      //validating token
      // await jose.jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      console.log("ERR", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  // return NextResponse.redirect(new URL("/login", req.url));
}

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
