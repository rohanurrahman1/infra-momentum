import { useEffect } from "react";
import { LeadModalProvider } from "@/components/lead-modal";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { VideoSection } from "@/components/sections/video-section";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyItWorks } from "@/components/sections/why-it-works";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  useEffect(() => {
    document.title =
      "Infrakore | B2B Lead Generation for Ontario Roofing & Exterior Contractors";
  }, []);

  return (
    <LeadModalProvider>
      <div className="min-h-screen" style={{ background: "#0F1713" }}>
        <SiteNav />
        <main>
          <Hero />
          <VideoSection />
          <HowItWorks />
          <WhyItWorks />
          <Testimonials />
          <Faq />
          <FinalCta />
        </main>
        <SiteFooter />
      </div>
    </LeadModalProvider>
  );
}
