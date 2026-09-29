import { Hero } from "@/components/sections/Hero";
import { Approach } from "@/components/sections/Approach";
import { PublicRecord } from "@/components/sections/PublicRecord";
import { Projects } from "@/components/sections/Projects";
import { Capabilities } from "@/components/sections/Capabilities";
import { TShapedEngineering } from "@/components/sections/TShapedEngineering";
import { AISystems } from "@/components/sections/AISystems";
// Testimonials hidden until real quotes are added
// import { Testimonials } from "@/components/sections/Testimonials";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { Explorations } from "@/components/sections/Explorations";
import { LatestContent } from "@/components/sections/LatestContent";
import { About } from "@/components/sections/About";
import { NextStep } from "@/components/sections/NextStep";
import { Contact } from "@/components/sections/Contact";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { hasContent } from "@/content/posts";

export default function Home() {
  return (
    <>
      <Navigation showContent={hasContent} />
      <main id="main-content">
        <Hero />
        <Approach />
        <PublicRecord />
        <Projects />
        <TShapedEngineering />
        <Capabilities />
        <AISystems />
        {/* <Testimonials /> */}
        <SplitFeature />
        <Explorations />
        <LatestContent />
        <About />
        <NextStep />
        <Contact />
      </main>
      <Footer showContent={hasContent} />
    </>
  );
}
