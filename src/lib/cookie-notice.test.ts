import { describe, expect, it } from "vitest";
import { hasCookieNotice, cookieNoticeValue } from "./cookie-notice";

describe("cookie notice", () => {
  it("recognizes the current notice among unrelated cookies", () => {
    expect(hasCookieNotice("other=123; fv_cookie_notice=v1; theme=light")).toBe(
      true,
    );
  });

  it.each([
    "",
    "fv_cookie_notice=v0",
    "fv_cookie_notice=no",
    "other_fv_cookie_notice=v1",
    "fv_cookie_notice=v1_extra",
  ])(
    "does not suppress the notice for an absent or invalid acknowledgement: %s",
    (cookies) => expect(hasCookieNotice(cookies)).toBe(false),
  );

  it("limits the acknowledgement to this site for 180 days", () => {
    const value = cookieNoticeValue(false);
    expect(value).toContain("fv_cookie_notice=v1");
    expect(value).toContain("Max-Age=15552000");
    expect(value).toContain("Path=/");
    expect(value).toContain("SameSite=Lax");
    expect(value).not.toContain("Domain=");
    expect(value).not.toContain("Secure");
  });

  it("restricts the cookie to secure transport on HTTPS", () => {
    expect(cookieNoticeValue(true)).toContain("; Secure");
  });
});
