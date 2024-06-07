import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ArrowRight01Icon, ArrowRight02Icon } from "hugeicons-react";
import { IconType } from "react-icons";
import { PiFireSimpleFill } from "react-icons/pi";
import { TbClockFilled } from "react-icons/tb";
import Heatmap from "~/components/Heatmap";
import IconThing from "~/components/IconThing";
import AllProjects from "~/components/Projects";
import DashboardLayout from "~/components/layout/DashboardLayout";
import Card from "~/components/ui/Card";
import { fetchLoader } from "~/utils/loader";

export async function loader(args: LoaderFunctionArgs) {
  const stats_ = await fetchLoader(args, "/v1/stats");
  return json({ stats: await stats_.json() });
}

const Dashboard = () => {
  const data: {
    [key: string]: {
      time: string;
      percentage: string;
    };
  } = {
    Today: {
      time: "5h 42m",
      percentage: "-11%",
    },
    // Yesterday: {
    //   time: "7 hrs 34 mins",
    //   percentage: "+24%",
    // },
    "Last 7 days": {
      time: "86h 52m",
      percentage: "-2%",
    },
    "Last 30 days": {
      time: "502h 16m",
      percentage: "+211%",
    },
    "All time": {
      time: "2,093h 19m",
      percentage: "+41%",
    },
  };

  const { stats } = useLoaderData<typeof loader>();

  const extras: { [key: string]: { value: string; icon: IconType } } = {
    Streak: { value: `${stats.streak} days`, icon: PiFireSimpleFill },
    "Daily average": { value: "7h 33m", icon: TbClockFilled },
  };

  return (
    <DashboardLayout title="Dashboard" maintitle="Dashboard">
      <div className="flex items-center flex-col gap-y-3 w-full px-52">
        <Card className="p-4 shrink-0 divide-x divide-grey grid grid-cols-2 items-center gap-x-5 gap-y-7 lg:grid-cols-4 first:pl-0 last:pr-0">
          {Object.keys(data).map((range, i) => (
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
                  {data[range].time}

                  <ArrowRight02Icon size={15} className="text-grey-100" />

                  <span
                    className={`text-xs ${data[range].percentage.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                  >
                    {data[range].percentage}
                  </span>
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
        <Heatmap />
        <AllProjects />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
