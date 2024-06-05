import React from "react";
import { BorderBeam } from "../magicui/border-beam";

const Screenshot = () => {
  return (
    <div className="relative rounded-2xl w-[90%] mx-auto my-20 shadow-2xl border border-zinc-800 shadow-accent/10">
      <BorderBeam />
      <img src="/screenshot.png" className="rounded-2xl" />
      <div className="w-full h-full absolute top-0 right-0 rounded-2xl bg-gradient-to-b from-transparent to-zinc-950 to-95%"></div>
    </div>
  );
};

export default Screenshot;
