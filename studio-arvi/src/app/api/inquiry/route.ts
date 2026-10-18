import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { z } from "zod";
export const runtime="nodejs";
const projectTypes=["Web Design & Development","Creative Digital Experiences","Brand Identity & Creative Direction","Website Optimization & Evolution","Something else"] as const;
const values=["Under ₹50,000","₹50,000 – ₹1,50,000","₹1,50,000 – ₹5,00,000","₹5,00,000+","Prefer to discuss"] as const;
const timelines=["As soon as practical","1–2 months","3–4 months","5+ months","Prefer to discuss"] as const;
const schema=z.object({name:z.string().trim().min(2).max(120),email:z.string().trim().email().max(240),company:z.string().trim().max(120).default(""),type:z.enum(projectTypes),description:z.string().trim().min(15).max(4000),budget:z.union([z.enum(values),z.literal("")]).default(""),timeline:z.union([z.enum(timelines),z.literal("")]).default(""),website:z.string().max(500).optional().default("")}).strict();
function fail(message:string,status:number){return NextResponse.json({message},{status,headers:{"Cache-Control":"no-store"}})}
async function allowRateLimit(request:NextRequest):Promise<boolean>{
 const url=process.env.UPSTASH_REDIS_REST_URL,token=process.env.UPSTASH_REDIS_REST_TOKEN;
 if(!url||!token)return false;
 const rawIp=request.headers.get("x-vercel-forwarded-for")||request.headers.get("x-real-ip")||request.headers.get("x-forwarded-for")?.split(",")[0]||"unknown";
 const hashed=createHash("sha256").update(rawIp).digest("hex").slice(0,28);
 const key=`arvi:inquiry:${hashed}`;
 try{
  const res=await fetch(`${url.replace(/\/$/,"")}/pipeline`,{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify([["INCR",key],["EXPIRE",key,3600]]),cache:"no-store",signal:AbortSignal.timeout(3500)});
  if(!res.ok)return false;const arr:unknown=await res.json();return Array.isArray(arr)&&typeof arr[0]==="object"&&arr[0]!==null&&"result" in arr[0]&&Number(arr[0].result)<=5;
 }catch{return false}
}
function escapeHtml(s:string){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]||c))}
export async function POST(request:NextRequest){
 if(!request.headers.get("content-type")?.includes("application/json"))return fail("Unsupported request format.",415);
 const origin=request.headers.get("origin");if(origin&&origin!==new URL(request.url).origin)return fail("Invalid request origin.",403);
 const contentLength=Number(request.headers.get("content-length")||0);if(contentLength>12000)return fail("Your message is too long.",413);
 let input:unknown;try{const text=await request.text();if(text.length>12000)return fail("Your message is too long.",413);input=JSON.parse(text)}catch{return fail("Please check the form and try again.",400)}
 const parsed=schema.safeParse(input);if(!parsed.success)return fail("Please check required fields and try again.",400);
 const data=parsed.data;
 // A filled honeypot should not invoke email delivery.
 if(data.website)return fail("Your inquiry could not be submitted.",400);
 if(!process.env.RESEND_API_KEY||!process.env.CONTACT_TO_EMAIL||!process.env.CONTACT_FROM_EMAIL)return fail("Online inquiries are not yet configured. Please check back shortly.",503);
 if(!await allowRateLimit(request))return fail("Submission is temporarily unavailable or rate-limited. Please try again later.",429);
 const sections=[['Name',data.name],['Email',data.email],['Company',data.company||'—'],['Project type',data.type],['Budget',data.budget||'Not specified'],['Timeline',data.timeline||'Not specified'],['Project brief',data.description]];
 const html=`<div style="font-family:Arial,sans-serif;color:#180F15;max-width:640px;margin:auto"><h1>New Studio Arvi inquiry</h1>${sections.map(([label,value])=>`<p><strong>${escapeHtml(label)}</strong><br>${escapeHtml(value).replace(/\n/g,'<br>')}</p>`).join('')}</div>`;
 try{const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({from:process.env.CONTACT_FROM_EMAIL,to:[process.env.CONTACT_TO_EMAIL],reply_to:data.email,subject:`Studio Arvi inquiry — ${data.type}`,html}),cache:"no-store",signal:AbortSignal.timeout(10000)});
 if(!response.ok){console.error("Inquiry delivery provider rejected request:",response.status);return fail("We couldn't deliver your message right now. Please try again later.",502)}
 return NextResponse.json({message:"Inquiry received."},{status:200,headers:{"Cache-Control":"no-store"}})
 }catch{console.error("Inquiry delivery provider unavailable");return fail("We couldn't deliver your message right now. Please try again later.",502)}
}
