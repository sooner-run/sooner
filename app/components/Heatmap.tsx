import Card from "./ui/Card";
import IconThing from "./IconThing";
import { BiSolidGridAlt } from "react-icons/bi";
import CalendarHeatmap from "react-calendar-heatmap";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { Tooltip } from "react-tooltip";
import { getClassByTime } from "@/utils/getClassByTime";
import { formatCount } from "@/utils/formatCount";

const Heatmap = () => {
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

  const formatDate = (date: Date): string => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString();

    // Adding ordinal suffix to the day
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
    return formattedDate.replace(String(day), dayWithSuffix);
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
              "data-tooltip-content": `${formatCount(count)} on ${new Date(date).toLocaleDateString()}`,
              "data-tooltip-id": "codetime-tooltip",
            };
          }}
        />
      </div>
    </Card>
  );
};

export default Heatmap;
