import Card from "./ui/Card";
import IconThing from "./IconThing";
import { BiSolidGridAlt } from "react-icons/bi";
import CalendarHeatmap from "react-calendar-heatmap";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { getClassByTime } from "@/utils/getClassByTime";
import { formatCount } from "@/utils/formatCount";
import { PulseData } from "@/types";
import { time_to_human } from "@/utils/time_to_human";

const Heatmap = ({ values }: { values: PulseData[] }) => {
  const formatDate = (date: Date): string => {
    const formattedMonthYear = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(date);

    const day = date.getDate();
    const ordinalSuffix = (n: number) => {
      if (n > 3 && n < 21) return "th";
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const dayWithSuffix = day + ordinalSuffix(day);
    return `${dayWithSuffix} ${formattedMonthYear}`;
  };

  return (
    <Card>
      <Tooltip id="codetime-tooltip" />
      <div className="border-b border-grey">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <IconThing icon={BiSolidGridAlt} />
            <h2 className="font-medium">Activity</h2>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 !text-grey-100">
        <CalendarHeatmap
          startDate={new Date("2023-12-31")}
          endDate={new Date("2024-12-31")}
          values={values}
          gutterSize={2}
          classForValue={(value) => {
            if (!value) {
              return "color-scale-0";
            }
            const { count } = value;

            return getClassByTime(count);
          }}
          tooltipDataAttrs={(value: { count: number; date: Date }) => {
            const { count, date } = value;
            return {
              "data-tooltip-content": ` ${count === 0 ? "No activity" : `${time_to_human(count)}`} on ${formatDate(new Date(date))}`,
              "data-tooltip-id": "codetime-tooltip",
            };
          }}
        />
      </div>
    </Card>
  );
};

export default Heatmap;
