import { Clock01Icon } from "hugeicons-react";
import { GoDotFill } from "react-icons/go";
import BarChart from "@/components/BarChart";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import { getColorForLanguage } from "@/utils/getColorForLanguage";
import { time_to_human } from "@/utils/time_to_human";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { InsightsData } from "@/types";

const Insights = () => {
  const { data, isLoading } = useSWR<InsightsData>("/v1/insights", fetcher);

  return (
    <DashboardLayout title="Insights" maintitle="Insights" loading={isLoading}>
      <div className="flex flex-col gap-y-5">
        <Card className="p-4">
          <h3 className="font-medium text-grey-100">Weekday average</h3>
          <div className="my-4">
            <BarChart
              data={data?.weekday_average.map((_) => _.time)!}
              labels={data?.weekday_average.map((_) => _.day)!}
            />
          </div>
        </Card>

        <div className="flex gap-5 lg:flex-nowrap flex-wrap">
          <Card className="p-4 lg:w-1/2">
            <h3 className="mb-4 text-grey-100 font-medium">Top languages</h3>
            {data?.top_languages
              .sort((a, b) => b.time - a.time)
              .map((l, i) => (
                <div
                  className="flex justify-between w-full my-4 text-sm"
                  key={i}
                >
                  <p className="flex items-center gap-x-1">
                    <GoDotFill
                      color={getColorForLanguage(l.language)!}
                      size={20}
                    />

                    {l.language}
                  </p>
                  <p className="flex items-center gap-x-3 text-xs">
                    {time_to_human(l.time)}
                    <Clock01Icon size={20} />
                  </p>
                </div>
              ))}
          </Card>
          <Card className="p-4 lg:w-1/2">
            <h3 className="mb-4 text-grey-100 font-medium">Top projects</h3>
            {data?.top_projects
              .sort((a, b) => b.time - a.time)
              .map((p, i) => (
                <div
                  className="flex justify-between w-full my-4 text-sm"
                  key={i}
                >
                  <p>{p.project}</p>
                  <p className="flex items-center gap-x-3 text-xs">
                    {time_to_human(p.time)}
                    <Clock01Icon size={20} />
                  </p>
                </div>
              ))}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Insights;
