import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

const protectedPathnames = ["/chat", "/create", "/messages", "/profile"];

function isProtectedPath(pathname: string) {
	return protectedPathnames.some(
		(path) => pathname === path || pathname.startsWith(`${path}/`)
	);
}

export function middleware(request: NextRequest) {
	const { pathname, search } = request.nextUrl;

	if (isProtectedPath(pathname) && !getSessionCookie(request)) {
		const loginURL = request.nextUrl.clone();
		loginURL.pathname = "/login";
		loginURL.search = "";
		loginURL.searchParams.set("callbackURL", `${pathname}${search}`);
		return NextResponse.redirect(loginURL);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/chat/:path*", "/create/:path*", "/messages/:path*", "/profile/:path*"],
};
