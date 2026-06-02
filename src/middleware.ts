import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "@/../i18n.config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
  // TODO: Set to user-preferred locale based on user data
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  //@ts-expect-error locales are readonly
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

export default async function middleware(request: NextRequest) {
  const user: any = userAgent(request);
  const browser = user.browser.name;

  const pathname = request.nextUrl.pathname;
  const isMedia = /\.(glb|OTF)$|\/public\/fonts|\/legal\/|\/media\//.test(pathname);

  if (isMedia) return NextResponse.next();
  const pathnameHasLocale = i18n.locales.some((locale: any) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);

  response.cookies.set("navigator", browser);

  response.headers.set("x-middleware-cache", "no-cache");

  // Redirect if there is no locale or locale is invalid
  if (!pathnameHasLocale) {
    // TODO: Here the "en" could be replaced by user-preferred locale based on user data...?
    const detectedLocale = getLocale(request);

    let locale = ["en", "fr"].includes(detectedLocale || "") ? detectedLocale : "fr";

    if (locale !== "fr") locale = "fr"; // TODO: Remove this after translation is complete

    const correctedPathname = new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}${request.nextUrl.search}`, request.url);
    response.headers.set("x-pathname", correctedPathname.toString());
    return NextResponse.redirect(correctedPathname);
  } else {
    response.headers.set("x-pathname", pathname);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
