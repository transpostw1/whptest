import { NextResponse } from "next/server";
import Cookies from "js-cookie";

export default function middleware(req) {
    const cookieToken = Cookies.get("isLoggedIn")
  console.log("login", cookieToken);
  if (  cookieToken) {
    console.log("Redirecting to login page");
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
export const config = {
  api: {
    bodyParser: false,
  },
  matcher: ["/profile"],
};
