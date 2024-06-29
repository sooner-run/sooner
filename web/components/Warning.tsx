import React from "react";
import { HiMiniInformationCircle } from "react-icons/hi2";

const Warning = ({ text }: { text: string }) => {
  return (
    <div className="bg-orange-500/20 text-orange-600 border border-orange-500 rounded-2xl flex p-2 items-start gap-x-2">
      <HiMiniInformationCircle size={20} />
      <div className="">
        <p className="font-semibold text-sm">Heads up!</p>
        <p className="text-xs">{text}</p>
      </div>
    </div>
  );
};

export default Warning;
