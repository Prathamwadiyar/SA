import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ProjectWithContent } from "@/lib/projects";
export function WorkGrid({projects}:{projects:ProjectWithContent[]}){
 if(!projects.length)return <div className="empty-archive"><p>The archive is being thoughtfully assembled.</p><Link className="text-link" href="/contact">Start a conversation ↗</Link></div>;
 return <div className="work-grid">{projects.map((p,i)=><Link className={`work-card work-card-${i%3+1}`} href={`/work/${p.slug}`} key={p.slug} aria-label={`View ${p.title}, ${p.projectType} project`}><div className="work-cover"><Image src={p.coverImage} alt={p.coverImageAlt} fill sizes="(max-width: 750px) 100vw, 65vw" className="project-image"/><div className="work-cover-overlay"><span>{p.projectType.toUpperCase()} / {p.category.toUpperCase()}</span><span className="work-hover-arrow"><ArrowUpRight size={20}/></span></div></div><div className="work-card-info"><div><span className="eyebrow">{String(i+1).padStart(2,"0")} / {p.category.toUpperCase()}</span><h2>{p.title}</h2><p>{p.summary}</p></div><ArrowUpRight size={23}/></div></Link>)}</div>
}
