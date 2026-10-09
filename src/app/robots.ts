import type { MetadataRoute } from "next";

// Unofficial design study: keep every crawler out.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
