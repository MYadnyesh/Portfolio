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
import { About } from "@/components/sections/About";
import { NextStep } from "@/components/sections/NextStep";
import { Contact } from "@/components/sections/Contact";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
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
        <About />
        <NextStep />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
