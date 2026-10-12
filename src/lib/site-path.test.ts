import { describe, expect, it } from "vitest";
import { assetPath } from "./site-path";

describe("public asset paths", () => {
  it("loads local images beneath a GitHub Pages repository path", () => {
    expect(assetPath("/images/pets.webp", "/healthy-pet")).toBe(
      "/healthy-pet/images/pets.webp",
    );
  });
  it("keeps root-hosted assets unchanged", () => {
    expect(assetPath("/images/pets.webp", "")).toBe("/images/pets.webp");
  });
  it("keeps external photos and already-prefixed paths unchanged", () => {
    expect(assetPath("https://example.com/pets.webp", "/healthy-pet")).toBe(
      "https://example.com/pets.webp",
    );
    expect(assetPath("/healthy-pet/images/pets.webp", "/healthy-pet")).toBe(
      "/healthy-pet/images/pets.webp",
    );
  });
});
