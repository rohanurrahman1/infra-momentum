import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Infrakore — B2B Lead Generation for Ontario Roofing & Exterior Contractors" },
      {
        name: "description",
        content:
          "Personalised emails to the right Ontario property managers, in your inbox every Monday. Built for roofing and exterior contractors.",
      },
      { property: "og:title", content: "Infrakore — Lead generation for Ontario contractors" },
      {
        property: "og:description",
        content:
          "We find the right property managers for your trade, check they're a fit, and have personalised emails waiting in your inbox every Monday.",
      },
    ],
  }),
  component: Index,
});

function Index() {
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
