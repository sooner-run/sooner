import type { MetaFunction } from "@remix-run/node";
import Hero from "~/components/landing/Hero";
import Navbar from "~/components/landing/Navbar";
import Screenshot from "~/components/landing/Screenshot";

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
    <div className="text-zinc-400/80 text-sm">
      <Navbar />
      <Hero />
      <Screenshot />
    </div>
  );
}
