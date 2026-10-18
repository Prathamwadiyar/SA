"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./brand";
import { site } from "@/lib/site";
export function Header(){
 const pathname=usePathname();
 const [open,setOpen]=useState(false); const [theme,setTheme]=useState<"light"|"dark">("dark");
 const [hidden,setHidden]=useState(false); const closeRef=useRef<HTMLButtonElement>(null);const openRef=useRef<HTMLButtonElement>(null);const prev=useRef(0);
 useEffect(()=>{setOpen(false);setHidden(false);},[pathname]);
 useEffect(()=>{
  const update=()=>{const y=window.scrollY;const diff=y-prev.current;if(Math.abs(diff)>4){setHidden(!open&&y>230&&diff>0&&!document.querySelector(".site-header")?.contains(document.activeElement));prev.current=y;}};
  window.addEventListener("scroll",update,{passive:true});return()=>window.removeEventListener("scroll",update)
 },[open]);
 useEffect(()=>{
  const apply=()=>{const mid=100;const els=Array.from(document.querySelectorAll<HTMLElement>("[data-header-theme]"));
    const active=els.filter(el=>{const r=el.getBoundingClientRect();return r.top<=mid && r.bottom>mid}).pop();
    setTheme(active?.dataset.headerTheme==="light"?"light":"dark");};
  apply();window.addEventListener("scroll",apply,{passive:true});window.addEventListener("resize",apply);return()=>{window.removeEventListener("scroll",apply);window.removeEventListener("resize",apply)}
 },[pathname]);
 useEffect(()=>{
  if(!open)return;
  const focusReturnTarget=openRef.current;
  const prevOverflow=document.body.style.overflow;document.body.style.overflow="hidden";closeRef.current?.focus();
  const key=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpen(false);if(e.key==="Tab"){
   const region=document.getElementById("mobile-nav-panel");const focusables=Array.from(region?.querySelectorAll<HTMLElement>('a,button:not([disabled])')||[]);
   const first=focusables[0],last=focusables[focusables.length-1];if(!first||!last)return;
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  }};
  document.addEventListener("keydown",key);return()=>{document.body.style.overflow=prevOverflow;document.removeEventListener("keydown",key);focusReturnTarget?.focus()};
 },[open]);
 return <>
   <header className={`site-header ${theme==="light"?"header-on-light":"header-on-dark"} ${hidden&&!open?"header-hidden":""} ${open?"menu-is-open":""}`}>
    <div className="header-inner container-wide"><Brand/>
     <nav className="desktop-nav" aria-label="Main navigation">{site.nav.map(x=><Link key={x.href} className={pathname===x.href?"active":undefined} href={x.href} aria-current={pathname===x.href?"page":undefined}>{x.label}</Link>)}</nav>
     <div className="nav-actions"><Link href="/contact" className="header-cta">Start a Project <ArrowUpRight size={15}/></Link>
     <button ref={openRef} type="button" onClick={()=>setOpen(true)} className="menu-trigger" aria-label="Open navigation menu" aria-haspopup="dialog" aria-expanded={open}><Menu size={22}/></button></div>
    </div>
   </header>
   {open&&<div className="menu-overlay" role="presentation"><div id="mobile-nav-panel" className="mobile-panel" role="dialog" aria-modal="true" aria-label="Site navigation">
    <div className="mobile-panel-top"><Brand light/><button ref={closeRef} className="menu-close" aria-label="Close navigation menu" onClick={()=>setOpen(false)}><X size={25}/></button></div>
    <div className="mobile-panel-body"><p className="eyebrow">THE STUDIO / NAVIGATION</p>{[...site.nav,{label:"Contact",href:"/contact"}].map((x,i)=><Link key={x.href} href={x.href} className="mobile-nav-link" onClick={()=>setOpen(false)}><span>0{i+1}</span><strong>{x.label}</strong><ArrowUpRight size={24}/></Link>)}
    <Link href="/contact" className="button button-ivory mobile-start" onClick={()=>setOpen(false)}>Start a Project <ArrowUpRight size={18}/></Link></div>
    <p className="mobile-menu-note">INDEPENDENT CREATIVE STUDIO — MADE TO MEAN SOMETHING.</p>
   </div></div>}
  </>;
}
