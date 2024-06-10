import React from "react";
import Card from "./ui/Card";
import { ArrowRight01Icon } from "hugeicons-react";
import { CodeTimeKeys, StatsResponse } from "@/types";

const Stats = ({ codetime }: { codetime: StatsResponse["codetime"] }) => {
  return (
    <Card className="p-4 shrink-0 divide-x divide-grey grid grid-cols-2 items-center gap-x-5 gap-y-7 lg:grid-cols-4 first:pl-0 last:pr-0">
      {Object?.keys(codetime).map((range, i) => (
        <div className="px-2" key={i}>
          <div className="group cursor-pointer p-2">
            <div className="flex items-center justify-between text-grey-100">
              <p className="text-sm font-semibold">{range}</p>
              <ArrowRight01Icon
                size={15}
                className="group-hover:text-white transition-colors"
              />
            </div>
            <p className="font-medium flex items-center gap-x-2 text-sm mt-3">
              {codetime[range as CodeTimeKeys].time}

              {/* <ArrowRight02Icon size={15} className="text-grey-100" />

            <span
              className={`text-xs ${data[range].percentage.startsWith("+") ? "text-green-500" : "text-red-500"}`}
            >
              {data[range].percentage}
            </span> */}
            </p>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default Stats;
