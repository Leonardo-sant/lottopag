import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const routes = ["/", "/solucoes", "/implantacao", "/contato"];

export default function sitemap(): MetadataRoute.Sitemap {
  // O sitemap só lista URLs depois que o domínio de publicação for confirmado.
  if (!siteConfig.isDomainConfirmed) return [];
  return routes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
