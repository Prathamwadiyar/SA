import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { Manifesto,SelectedWork,ExpertiseSection,StudioPrinciples,ClosingChapter } from "@/components/sections";
export const metadata: Metadata = { title: "Independent Creative Studio", description: "Studio Arvi creates distinctive websites, identities and digital experiences made to mean something." };
export default function Home(){return <main id="main"><Hero/><Manifesto/><SelectedWork/><ExpertiseSection/><StudioPrinciples/><ClosingChapter/></main>}
