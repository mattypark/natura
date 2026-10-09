import { MotionProvider } from "@/components/chrome/MotionProvider";
import { Nav } from "@/components/chrome/Nav";
import { PageChrome } from "@/components/chrome/PageChrome";
import { Preloader } from "@/components/chrome/Preloader";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { RingStage } from "@/components/ring/RingStage";
import { AgentOrbit } from "@/components/sections/AgentOrbit";
import { Hero } from "@/components/sections/Hero";
import { ManyMinds } from "@/components/sections/ManyMinds";
import { RingFeatures } from "@/components/sections/RingFeatures";
import { SensorStory } from "@/components/sections/SensorStory";

export default function Home() {
  return (
    <MotionProvider>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SmoothScroll />
      <Preloader />
      <PageChrome />
      <RingStage />
      <Nav />
      <main id="main-content" style={{ position: "relative", zIndex: 10 }}>
        <div id="top" />
        <Hero />
        <RingFeatures />
        <SensorStory />
        <ManyMinds />
        <AgentOrbit />
        <div style={{ height: "100vh" }} />
      </main>
    </MotionProvider>
  );
}
