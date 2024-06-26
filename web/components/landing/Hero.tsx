import DotPattern from "../magicui/dot-pattern";
import { cn } from "@/lib/utils";
import AnimatedShinyText from "../magicui/animated-shiny-text";
import Link from "next/link";
import { SiGithub, SiVisualstudiocode } from "react-icons/si";

const Hero = () => {
  return (
    <div className="lg:px-20 px-5 flex flex-col items-center z-30">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(rgba(255,255,255,0.35),transparent)] z-10"
        )}
      />

      <Link href="https://github.com/sooner-run/sooner" target="_blank">
        <p className="flex items-center gap-x-2 border border-zinc-300/10 py-2 px-4 w-fit rounded-full text-center mt-10 mb-5 hover:border-accent/50 hover:text-white/60 transition-colors duration-500">
          <SiGithub />
          We're opensource. Star on GitHub
        </p>
      </Link>
      <h1 className="lg:text-7xl text-5xl mx-auto text-center font-semibold bg-gradient-to-br from-accent to-white bg-clip-text">
        Time tracking for devs and software teams.
      </h1>
      <p className="lg:text-lg mt-4 lg:w-1/2 mx-auto text-center">
        Gain valuable insights into coding time and productivity with Sooner,
        empowering developers and managers with detailed metrics to enhance
        performance and identify bottlenecks.
      </p>

      <div className="flex gap-x-4 mt-5 items-center">
        <Link
          href="https://marketplace.visualstudio.com/items?itemName=sooner.sooner"
          target="_blank"
          className="flex items-center gap-x-2 border-2 border-zinc-300/10 hover:border-accent transition-colors text-lg px-5 py-3 rounded-full duration-500"
        >
          <SiVisualstudiocode />
          <AnimatedShinyText>Add to VS Code</AnimatedShinyText>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
