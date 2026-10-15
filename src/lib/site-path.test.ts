import { describe, expect, it } from "vitest";
import { assetPath } from "./site-path";

describe("public asset paths", () => {
  it("loads local images beneath a GitHub Pages repository path", () => {
    expect(assetPath("/images/pets.webp", "/lamantin-vet")).toBe(
      "/lamantin-vet/images/pets.webp",
    );
  });
  it("keeps root-hosted assets unchanged", () => {
    expect(assetPath("/images/pets.webp", "")).toBe("/images/pets.webp");
  });
  it("keeps external photos and already-prefixed paths unchanged", () => {
    expect(assetPath("https://example.com/pets.webp", "/lamantin-vet")).toBe(
      "https://example.com/pets.webp",
    );
    expect(assetPath("/lamantin-vet/images/pets.webp", "/lamantin-vet")).toBe(
      "/lamantin-vet/images/pets.webp",
    );
  });
});
