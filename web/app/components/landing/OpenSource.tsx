import React from "react";
import { BorderBeam } from "../magicui/border-beam";
import { TbBrandOpenSource } from "react-icons/tb";
import Ripple from "../magicui/ripple";
import Marquee from "../magicui/marquee";
import { Link } from "@remix-run/react";

const OpenSource = () => {
  return (
    <div className="px-44 pb-20">
      <div className="relative overflow-hidden border border-white/5 rounded-2xl py-10 flex items-center flex-col">
        <Ripple />
        <div className="size-14 bg-grey/50 rounded-2xl flex items-center justify-center relative">
          <BorderBeam borderWidth={2} duration={5} />
          <TbBrandOpenSource size={30} className="text-white" />
        </div>
        <h2 className="my-2 text-lg text-white">Opensource from day zero</h2>

        <Marquee pauseOnHover>
          <Link
            to="https://github.com/sooner-run/sooner"
            className="text-6xl font-medium hover:text-white/70 transition-colors my-16"
            target="_blank"
          >
            Star on GitHub <span className="opacity-0">----</span>
          </Link>
        </Marquee>
      </div>
    </div>
  );
};

export default OpenSource;
