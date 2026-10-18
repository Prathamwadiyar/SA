"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);
export function MotionProvider(){
 const path=usePathname();
 useEffect(()=>{
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  const fine=window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
  let lenis:Lenis|null=null;
  let ctx:gsap.Context|null=null;
  const tick=(time:number)=>lenis?.raf(time*1000);
  const init=()=>{
   if(!reduced.matches && fine.matches){
    lenis=new Lenis({duration:1.15,smoothWheel:true, syncTouch:false});
    lenis.on("scroll", ()=>ScrollTrigger.update());
    gsap.ticker.add(tick);
   }
   if(!reduced.matches){
    ctx=gsap.context(()=>{
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el)=>{
       gsap.fromTo(el,{opacity:0,y:28},{opacity:1,y:0,duration:.9,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 90%",once:true}});
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el)=>{
       if(fine.matches)gsap.fromTo(el,{yPercent:-4},{yPercent:4,ease:"none",scrollTrigger:{trigger:el.parentElement,start:"top bottom",end:"bottom top",scrub:true}});
      });
    });
   }
   ScrollTrigger.refresh();
  };
  // Let App Router commit the new route before collecting its triggers.
  const id=requestAnimationFrame(init);
  return ()=>{cancelAnimationFrame(id);ctx?.revert();gsap.ticker.remove(tick);lenis?.destroy();};
 },[path]);
 return null;
}
