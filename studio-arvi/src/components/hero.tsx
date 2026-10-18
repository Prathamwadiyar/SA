"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger,useGSAP);
const stages=["Imagine","Design","Build","Experience"] as const;
const rotations=[-13,-4,4,13];
export function Hero(){
 const scope=useRef<HTMLElement>(null);
 useGSAP(()=>{
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cards=gsap.utils.toArray<HTMLElement>(".hero-artifact",scope.current || undefined);
  if(reduced)return;
  const intro=gsap.timeline({defaults:{ease:"power3.out"}});
  intro.fromTo(".hero-brand-intro",{autoAlpha:1,yPercent:0},{autoAlpha:0,yPercent:-102,duration:.75,ease:"power3.inOut"},0)
       .fromTo(".hero-title-line",{yPercent:110,opacity:0},{yPercent:0,opacity:1,duration:1.05,stagger:.14},.45)
       .fromTo(cards,{opacity:0,xPercent:(i:number)=>(1.5-i)*35,yPercent:45,scale:.79,rotation:0},{opacity:1,xPercent:0,yPercent:0,scale:1,rotation:(i:number)=>rotations[i],stagger:.1,duration:1.25},.72)
       .fromTo(".hero-support",{opacity:0,y:15},{opacity:1,y:0,duration:.65,stagger:.1},1.42);
  const media=gsap.matchMedia();
  media.add("(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",()=>{
   const master=gsap.timeline({scrollTrigger:{trigger:scope.current,pin:scope.current?.querySelector(".hero-pin") || undefined,start:"top top",end:"+=185%",scrub:1,anticipatePin:1,invalidateOnRefresh:true}});
   master.to({}, {duration:.2})
     .to(cards,{xPercent:(i:number)=>[-48,-12,18,45][i],yPercent:(i:number)=>[24,-26,-22,25][i],rotation:(i:number)=>[-19,-7,8,19][i],scale:(i:number)=>[.88,1.07,1.08,.9][i],duration:.24,ease:"none"},.2)
     .to(cards,{xPercent:(i:number)=>[132,48,-48,-135][i],yPercent:(i:number)=>[9,5,5,9][i],rotation:0,scale:(i:number)=>[.8,.93,.93,1.03][i],duration:.26,ease:"power2.inOut"},.44)
     .to(cards.slice(0,3),{autoAlpha:0,scale:.8,duration:.12},.64)
     .to(cards[3],{xPercent:-145,yPercent:-18,scale:4.7,rotation:0,duration:.22,ease:"power2.inOut"},.69)
     .to(".hero-copy",{autoAlpha:0,yPercent:-18,duration:.14},.73)
     .to(".hero-wash",{autoAlpha:1,duration:.12,ease:"none"},.86)
     .to({}, {duration:.02});
   return ()=>master.scrollTrigger?.kill();
  });
  return ()=>media.revert();
 },{scope});
 return <section className="hero-shell theme-dark" data-header-theme="dark" ref={scope} aria-label="Studio Arvi introduction">
    <div className="hero-pin"><div className="hero-brand-intro" aria-hidden="true"><strong>studio arvi<span>.</span></strong><p>INDEPENDENT CREATIVE STUDIO</p></div><div className="hero-orbit orbit-one" aria-hidden="true"/><div className="hero-orbit orbit-two" aria-hidden="true"/>
      <div className="container-wide hero-content">
       <div className="hero-copy"><p className="eyebrow hero-support">INDEPENDENT CREATIVE STUDIO — DIGITAL CRAFT WITH PURPOSE</p>
        <h1 className="hero-display"><span className="line-mask"><span className="hero-title-line">Ideas into</span></span><span className="line-mask"><em className="hero-title-line">experiences.</em></span></h1>
        <p className="hero-intro hero-support">Distinctive websites, identities and digital experiences for brands with something to say.</p>
        <Link href="/work" className="hero-work hero-support">Explore our work <span><ArrowUpRight size={19}/></span></Link>
       </div>
       <div className="hero-artifacts" aria-label="Four stages of the creative process">
        {stages.map((stage,i)=><article className={`hero-artifact artifact-${i+1}`} data-artifact={stage.toLowerCase()} key={stage}>
          <div className="artifact-panel">
            <header className="artifact-top"><span>{String(i+1).padStart(2,"0")} / {stage.toUpperCase()}</span><span className="artifact-dot"/></header>
            {i===0&&<div className="artifact-imagine"><span>what if</span><em>we could?</em><div className="idea-stroke"/></div>}
            {i===1&&<div className="artifact-design"><span className="design-large">Aa<span>.</span></span><div className="design-swatch"><i/><i/><i/></div><div className="design-rules"><b/><b/></div></div>}
            {i===2&&<div className="artifact-build"><div className="build-browser"><div className="build-top"><span>studio arvi.</span><span>∙ ∙ ∙</span></div><div className="build-heading">Make the<br/><em>difference.</em></div><div className="build-image"/><div className="build-lines"><b/><b/></div></div></div>}
            {i===3&&<div className="artifact-experience"><div className="experience-mini"><span>studio arvi.</span><span>WORK ↗</span></div><div className="experience-copy">Made to <em>mean</em><br/>something.</div><div className="experience-image"><div className="experience-arc"/></div><div className="experience-bottom">INDEPENDENT CREATIVE STUDIO <ArrowUpRight size={14}/></div></div>}
            <footer className="artifact-foot"><span>STUDIO ARVI</span><span>{String(i+1).padStart(2,"0")} — 04</span></footer>
          </div>
        </article>)}
       </div>
       <div className="hero-bottom hero-support"><span>DESIGN / DEVELOPMENT / EXPERIENCE</span><span className="scroll-cue">SCROLL TO DISCOVER <ArrowDownRight size={17}/></span></div>
      </div>
      <div className="hero-wash" aria-hidden="true"><span>Made to mean <em>something.</em></span></div>
    </div>
   </section>;
}
