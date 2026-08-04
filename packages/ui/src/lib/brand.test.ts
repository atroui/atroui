import { afterEach, describe, expect, it } from "vitest";

import { DEFAULT_BRAND, getBrand, getBrandMailto } from "./brand";
import {
  buildPageMetadata,
  getDefaultDescription,
  getDefaultTitle,
  getPageSeo,
  getSiteBrand,
  getSiteDomain,
} from "./seo";

function clearBrandEnv() {
  delete process.env.NEXT_PUBLIC_SITE_NAME;
  delete process.env.NEXT_PUBLIC_SITE_DOMAIN;
  delete process.env.NEXT_PUBLIC_SITE_EMAIL;
  delete process.env.NEXT_PUBLIC_SITE_URL;
  delete process.env.NEXT_PUBLIC_SITE_TAGLINE;
}

describe("getBrand", () => {
  afterEach(clearBrandEnv);

  it("returns AtroUI defaults", () => {
    const brand = getBrand();
    expect(brand.name).toBe(DEFAULT_BRAND.name);
    expect(brand.domain).toBe(DEFAULT_BRAND.domain);
    expect(brand.email).toBe(DEFAULT_BRAND.email);
  });

  it("reads NEXT_PUBLIC_SITE_* overrides", () => {
    process.env.NEXT_PUBLIC_SITE_NAME = "Acme";
    process.env.NEXT_PUBLIC_SITE_DOMAIN = "acme.test";
    process.env.NEXT_PUBLIC_SITE_EMAIL = "hi@acme.test";
    process.env.NEXT_PUBLIC_SITE_URL = "https://acme.test/";

    const brand = getBrand();
    expect(brand.name).toBe("Acme");
    expect(brand.domain).toBe("acme.test");
    expect(brand.email).toBe("hi@acme.test");
    expect(brand.siteUrl).toBe("https://acme.test");
  });

  it("builds mailto from brand email", () => {
    expect(getBrandMailto()).toBe(`mailto:${DEFAULT_BRAND.email}`);
    expect(getBrandMailto("Hello")).toBe(
      `mailto:${DEFAULT_BRAND.email}?subject=Hello`
    );

    process.env.NEXT_PUBLIC_SITE_EMAIL = "hi@acme.test";
    expect(getBrandMailto("Hi there")).toBe(
      "mailto:hi@acme.test?subject=Hi%20there"
    );
  });
});

describe("seo helpers", () => {
  afterEach(clearBrandEnv);

  it("builds a default title from brand", () => {
    expect(getDefaultTitle()).toContain(getSiteBrand());
  });

  it("buildPageMetadata includes brand siteName", () => {
    process.env.NEXT_PUBLIC_SITE_NAME = "Acme";
    process.env.NEXT_PUBLIC_SITE_URL = "https://acme.test";

    const meta = buildPageMetadata({
      title: "Hello",
      description: "World",
      path: "/hello",
    });

    expect(meta.openGraph?.siteName).toBe("Acme");
    expect(meta.openGraph?.title).toBe("Hello — Acme");
  });

  it("resolves brand SEO at call time, not module load", () => {
    // Module is already imported above — env changes must still apply.
    expect(getSiteBrand()).toBe(DEFAULT_BRAND.name);
    expect(getSiteDomain()).toBe(DEFAULT_BRAND.domain);

    process.env.NEXT_PUBLIC_SITE_NAME = "LateBrand";
    process.env.NEXT_PUBLIC_SITE_DOMAIN = "late.test";
    process.env.NEXT_PUBLIC_SITE_TAGLINE = "Ships late overrides";

    expect(getSiteBrand()).toBe("LateBrand");
    expect(getSiteDomain()).toBe("late.test");
    expect(getDefaultTitle()).toBe("LateBrand — Ships late overrides");
    expect(getDefaultDescription()).toContain("late.test");
    expect(getPageSeo().home.title).toBe("LateBrand — Ships late overrides");
    expect(getPageSeo().about.description).toContain("LateBrand");
  });
});
