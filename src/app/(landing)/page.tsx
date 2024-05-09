"use client"

import About from "@/components/public/About"
import FAQ from "@/components/public/F&Q"
import { Hero } from "@/components/public/Hero"
import { HowItWorks } from "@/components/public/HowItWorks"
import Team from "@/components/public/Teams"
import { Testimonials } from "@/components/public/Testimonials"
import { useSession } from "next-auth/react"
import NavBar from "@/components/public/NavBar";

export default function Home() {
    const session = useSession()
    console.log(session)
    return (
        <>
            <div className="  overflow-x-hidden">
                <NavBar />
                <Hero />
                <About />
                <HowItWorks />
                <Testimonials />
                <Team />
                <FAQ />
            </div>

        </>
    )
}