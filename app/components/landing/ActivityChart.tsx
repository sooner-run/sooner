import React, { useEffect, useState } from "react";
import Heatmap from "../Heatmap";
import ReactCalendarHeatmap from "react-calendar-heatmap";
import { getClassByTime } from "@/utils/getClassByTime";
import { formatCount } from "@/utils/formatCount";
import { faker } from "@faker-js/faker";
import { Tooltip } from "react-tooltip";
import AnimatedShinyText from "../magicui/animated-shiny-text";
import { BorderBeam } from "../magicui/border-beam";

const ActivityChart = () => {
  const [values, setValues] = useState<{ date: Date; count: number }[]>([]);

  useEffect(() => {
    const startDate = new Date("2024-01-01");
    const endDate = new Date("2024-12-31");
    const data = [];

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const date = new Date(d);
      const count = faker.number.int({ min: 0, max: 50_400_000 });
      data.push({ date, count });
    }
    setValues(data);
  }, []);
  return (
    <div className="lg:px-20 px-5 landing mt-10">
      <div className="relative border border-white/5 rounded-2xl p-10">
        <BorderBeam duration={5} />
        <div className="mb-10">
          <AnimatedShinyText className="text-center text-2xl font-medium">
            Awesome activity chart
          </AnimatedShinyText>
          <p className="text-center">
            See how much time you spend coding each day of the year.
          </p>
        </div>

        <div className="relative">
          <Tooltip id="codetime-tooltip" />
          <ReactCalendarHeatmap
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
                "data-tooltip-content": `${formatCount(count)} on ${new Date(date).toLocaleDateString()}`,
                "data-tooltip-id": "codetime-tooltip",
              };
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;
