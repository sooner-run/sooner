import ActivityChart from "@/components/landing/ActivityChart";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import OpenSource from "@/components/landing/OpenSource";
import Screenshot from "@/components/landing/Screenshot";
import TeamFeatures from "@/components/landing/TeamFeatures";
import TimeTracked from "@/components/landing/TimeTracked";

export default function Index() {
  return (
    <div className="text-zinc-400/80 text-sm">
      <Navbar />
      <Hero />
      <Screenshot />
      <TimeTracked />
      <Features />
      <ActivityChart />
      <TeamFeatures />
      <OpenSource />
      <Footer />
    </div>
  );
}
