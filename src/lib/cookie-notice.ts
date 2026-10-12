export function hasCookieNotice(cookies: string): boolean {
  return cookies
    .split(";")
    .some((cookie) => cookie.trim() === "hp_cookie_notice=v1");
}

export function cookieNoticeValue(secure: boolean): string {
  return `hp_cookie_notice=v1; Max-Age=15552000; Path=/; SameSite=Lax${secure ? "; Secure" : ""}`;
}
