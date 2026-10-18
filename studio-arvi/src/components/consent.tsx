"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
const id=process.env.NEXT_PUBLIC_GA_ID;
export function Consent(){
 const [choice,setChoice]=useState<"unknown"|"accepted"|"rejected">("unknown");
 useEffect(()=>{try {const v=localStorage.getItem("arvi-analytics-consent");if(v==="accepted"||v==="rejected")setChoice(v)} catch {}},[]);
 const decide=(v:"accepted"|"rejected")=>{try{localStorage.setItem("arvi-analytics-consent",v)}catch{}setChoice(v)};
 if(!id)return null;
 return <>{choice==="accepted"&&<><Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive"/><Script id="arvi-analytics" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`}</Script></>}
 {choice==="unknown"&&<aside className="consent-banner" aria-label="Analytics preference"><p>We use optional analytics to understand how this website is used. No analytics load unless you accept.</p><div><button className="button button-outline" onClick={()=>decide("rejected")}>Decline</button><button className="button button-ivory" onClick={()=>decide("accepted")}>Allow analytics</button></div></aside>}</>;
}
