import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/site";
import { getPublishedProjects } from "@/lib/projects";
export default function sitemap():MetadataRoute.Sitemap{const site=siteOrigin();if(!site)return [];const routes=["","/work","/expertise","/studio","/contact","/privacy"];return [...routes.map(route=>({url:`${site}${route}`,changeFrequency:"monthly" as const,priority:route===""?1:.6})),...getPublishedProjects().map(p=>({url:`${site}/work/${p.slug}`,changeFrequency:"monthly" as const,priority:.7}))]}
