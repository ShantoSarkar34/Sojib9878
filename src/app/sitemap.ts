import type { MetadataRoute } from "next"

import { getProjects } from "@/features/projects/queries"
import { siteConfig } from "@/constants/site"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects()

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
