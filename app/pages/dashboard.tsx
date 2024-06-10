import { PiFireSimpleFill } from "react-icons/pi";
import { TbClockFilled } from "react-icons/tb";
import Heatmap from "@/components/Heatmap";
import IconThing from "@/components/IconThing";
import AllProjects from "@/components/Projects";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { StatsResponse } from "@/types";
import Stats from "@/components/Stats";

const Dashboard = () => {
  const { data, isLoading } = useSWR<StatsResponse>("/v1/stats", fetcher);

  return (
    <DashboardLayout
      title="Dashboard"
      maintitle="Dashboard"
      loading={isLoading}
    >
      <div className="flex items-center flex-col gap-y-3 w-full lg:px-52 px-5">
        <Stats codetime={data?.codetime!} />
        <div className="flex item-center gap-x-3 w-full">
          <Card className="p-4 flex items-center justify-between">
            <div className="font-medium">
              <div className="flex items-center gap-x-2">
                <IconThing icon={PiFireSimpleFill} />
                <p>Streak</p>
              </div>
            </div>
            <p className="text-sm font-semibold">{data?.streak} days</p>
          </Card>
          <Card className="p-4 flex items-center justify-between">
            <div className="font-medium">
              <div className="flex items-center gap-x-2">
                <IconThing icon={TbClockFilled} />
                <p>Daily average</p>
              </div>
            </div>
            <p className="text-sm font-semibold">{data?.daily_average}</p>
          </Card>
        </div>
        <Heatmap values={data?.activity!} />
        <AllProjects />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
