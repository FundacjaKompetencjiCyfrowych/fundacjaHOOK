import { describe, expect, it } from "vitest";

import { mapMetadata } from "../../sanity/metadata/mapMetadata";

describe("mapMetadata", () => {
  it("handles missing options and uses safe defaults when seo is missing", () => {
    expect(mapMetadata()).toEqual({});
    expect(mapMetadata(null)).toEqual({});
    const defaults = {
      openGraph: {},
      twitter: { card: "summary" },
      robots: { index: true, follow: true },
    };
    expect(mapMetadata({})).toEqual(defaults);
    expect(mapMetadata({ seo: null })).toEqual(defaults);
  });

  it("maps all supported seo fields", () => {
    expect(
      mapMetadata({
        pathname: "/post",
        origin: "https://example.com",
        seo: {
          title: "Example title",
          description: "Example description",
          canonical: "https://example.com/post",
          twitterCreator: "@example",
          ogImage: {
            asset: {
              url: "https://example.com/og-image.jpg",
            },
          },
        },
      })
    ).toEqual({
      title: "Example title",
      description: "Example description",
      alternates: {
        canonical: "https://example.com/post",
      },
      openGraph: {
        title: "Example title",
        description: "Example description",
        url: "https://example.com/post",
        images: [{ url: "https://example.com/og-image.jpg" }],
      },
      twitter: {
        card: "summary_large_image",
        title: "Example title",
        description: "Example description",
        images: ["https://example.com/og-image.jpg"],
        creator: "@example",
      },
      robots: { index: true, follow: true },
    });
  });

  it("merges individual defaults and generates a canonical for the current page", () => {
    expect(
      mapMetadata({
        pathname: "/materials?area=health#downloads",
        origin: "https://example.com",
        seo: {
          title: "Materials",
          description: "  ",
          robots: { noIndex: false },
        },
        defaults: {
          title: "Default title",
          description: "Default description",
          canonical: "https://example.com/",
          ogImage: { asset: { url: "https://example.com/default.jpg" } },
          robots: { noIndex: true, noFollow: true },
        },
      })
    ).toEqual({
      title: "Materials",
      description: "Default description",
      alternates: { canonical: "https://example.com/materials" },
      openGraph: {
        title: "Materials",
        description: "Default description",
        url: "https://example.com/materials",
        images: [{ url: "https://example.com/default.jpg" }],
      },
      twitter: {
        card: "summary_large_image",
        title: "Materials",
        description: "Default description",
        images: ["https://example.com/default.jpg"],
      },
      robots: { index: true, follow: false },
    });
  });
});
