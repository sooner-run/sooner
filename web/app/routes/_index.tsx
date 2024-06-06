import type { MetaFunction } from "@remix-run/node";
import ActivityChart from "~/components/landing/ActivityChart";
import Features from "~/components/landing/Features";
import Hero from "~/components/landing/Hero";
import Navbar from "~/components/landing/Navbar";
import Screenshot from "~/components/landing/Screenshot";
import TeamFeatures from "~/components/landing/TeamFeatures";

export const meta: MetaFunction = () => {
  return [
    { title: "Sooner" },
    {
      name: "description",
      content: "Best Time Tracking Extension For VS Code",
    },
  ];
};

export default function Index() {
  return (
    <div className="text-zinc-400/80 text-sm pb-20">
      <Navbar />
      <Hero />
      <Screenshot />
      <Features />
      <ActivityChart />
      <TeamFeatures />
    </div>
  );
}
