import { ArrowRight01Icon, ArrowRight02Icon } from "hugeicons-react";
import { IconType } from "react-icons";
import { PiFireSimpleFill } from "react-icons/pi";
import { TbClockFilled } from "react-icons/tb";
import Heatmap from "@/components/Heatmap";
import IconThing from "@/components/IconThing";
import AllProjects from "@/components/Projects";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { CodeTimeKeys, StatsResponse } from "./types";

const Dashboard = () => {
  const { data } = useSWR<StatsResponse>("/v1/stats", fetcher);

  if (!data) return <></>;

  const extras: { [key: string]: { value: string; icon: IconType } } = {
    Streak: {
      value: `${data.streak} day${data.streak !== 1 && "s"}`,
      icon: PiFireSimpleFill,
    },
    "Daily average": { value: data.daily_average, icon: TbClockFilled },
  };

  return (
    <DashboardLayout title="Dashboard" maintitle="Dashboard">
      <div className="flex items-center flex-col gap-y-3 w-full lg:px-52 px-5">
        <Card className="p-4 shrink-0 divide-x divide-grey grid grid-cols-2 items-center gap-x-5 gap-y-7 lg:grid-cols-4 first:pl-0 last:pr-0">
          {Object.keys(data?.codetime).map((range, i) => (
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
                  {data.codetime[range as CodeTimeKeys].time}

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
        <div className="flex item-center gap-x-3 w-full">
          {Object.keys(extras).map((extra, i) => (
            <Card className="p-4 flex items-center justify-between" key={i}>
              <div className="font-medium">
                <div className="flex items-center gap-x-2">
                  <IconThing icon={extras[extra].icon} />
                  <p>{extra}</p>
                </div>
              </div>
              <p className="text-sm font-semibold">{extras[extra].value}</p>
            </Card>
          ))}
        </div>
        <Heatmap values={data.activity} />
        <AllProjects />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
