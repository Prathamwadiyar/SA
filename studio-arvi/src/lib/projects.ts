import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
const root=path.join(process.cwd(),"src/content/projects");
const schema=z.object({
 slug:z.string().regex(/^[a-z0-9-]+$/),title:z.string().min(2),summary:z.string().min(20),
 projectType:z.enum(["commissioned","studio","concept"]),category:z.string(),
 year:z.union([z.number(),z.string()]).optional(),coverImage:z.string().startsWith("/"),coverImageAlt:z.string().min(5),
 featured:z.boolean().default(false),published:z.boolean().default(false),
 seoTitle:z.string().optional(),seoDescription:z.string().optional(),services:z.array(z.string()).default([]),
 technologies:z.array(z.string()).default([]),accentTheme:z.string().optional(),
 clientName:z.string().optional(),websiteUrl:z.string().url().optional(),
 });
export type Project=z.infer<typeof schema>;
export type ProjectWithContent=Project&{body:string};
function readAll():ProjectWithContent[]{
 if(!fs.existsSync(root))return [];
 const files=fs.readdirSync(root).filter(x=>x.endsWith(".mdx"));
 const loaded=files.map(filename=>{const raw=fs.readFileSync(path.join(root,filename),"utf8");const {data,content}=matter(raw);const meta=schema.parse(data);if(meta.slug!==filename.slice(0,-4))throw new Error(`MDX project slug mismatch: ${filename}`);return {...meta,body:content}});
 const slugs=loaded.map(x=>x.slug);if(new Set(slugs).size!==slugs.length)throw new Error("Duplicate project slug");
 return loaded;
}
export function getPublishedProjects(){return readAll().filter(x=>x.published).sort((a,b)=>Number(b.featured)-Number(a.featured));}
export function getProject(slug:string){return getPublishedProjects().find(x=>x.slug===slug)}
