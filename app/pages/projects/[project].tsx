import { faker } from "@faker-js/faker";
import { ArrowDown01Icon, Clock01Icon } from "hugeicons-react";
import React, { useEffect, useMemo, useState } from "react";
import { GoDotFill } from "react-icons/go";
import DonutChart from "@/components/DonutChart";
import LineChart from "@/components/LineChart";
import ProjectsLayout from "@/components/layout/ProjectsLayout";
import Card from "@/components/ui/Card";
import { getColorForLanguage } from "@/utils/getColorForLanguage";
import { time_to_human } from "@/utils/time_to_human";
import DotPattern from "@/components/magicui/dot-pattern";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { ProjectData } from "@/types";
import dayjs from "dayjs";
import { truncate } from "@/utils/truncate";
import Warning from "@/components/Warning";

const Project = () => {
  const router = useRouter();
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (router.asPath) {
      const projectId = router.asPath.split("/").pop();
      if (projectId !== "[project]") {
        const startDate = dayjs().subtract(6, "days").toISOString();
        const endDate = dayjs().toISOString();
        setUrl(
          `/v1/projects/${projectId}?start_date=${startDate}&end_date=${endDate}`
        );
      }
    }
  }, [router.asPath]);

  const { data, error, isLoading } = useSWR<ProjectData>(url, fetcher);

  return (
    <ProjectsLayout loading={isLoading}>
      <div className="flex flex-col gap-y-5">
        <Card className="p-4 shrink-0 divide-x divide-grey grid grid-cols-2 items-center gap-x-5 gap-y-7 lg:grid-cols-4 first:pl-0 last:pr-0">
          <div className="px-2">
            <div className="group cursor-pointer p-2">
              <div className="flex items-center justify-between text-grey-100 bg-grey-300 p-2 rounded-3xl">
                <p className="text-sm font-semibold">Last 7 days</p>
                <ArrowDown01Icon
                  size={15}
                  className="group-hover:text-white transition-colors"
                />
              </div>
              <p className="font-medium flex items-center gap-x-2 text-sm mt-3">
                {data?.time_human_readable}
              </p>
            </div>
          </div>
          <div className="px-2">
            <div className="group cursor-pointer p-2">
              <div className="flex items-center justify-between text-grey-100 bg-grey-300 p-2 rounded-3xl">
                <p className="text-sm font-semibold">Branch</p>
                <ArrowDown01Icon
                  size={15}
                  className="group-hover:text-white transition-colors"
                />
              </div>
              <p className="font-medium flex items-center gap-x-2 text-sm mt-3">
                all
              </p>
            </div>
          </div>
          <div className="px-2">
            <div className="group cursor-pointer p-2">
              <div className="flex items-center justify-between text-grey-100">
                <p className="text-sm font-semibold">Top language</p>
              </div>
              <div className="flex items-center gap-x-1 mt-3">
                <GoDotFill
                  color={getColorForLanguage(data?.top_language!)!}
                  size={30}
                />
                <p className="text-sm">{data?.top_language}</p>
              </div>
            </div>
          </div>
          <div className="px-2">
            <div className="group cursor-pointer p-2">
              <div className="flex items-center justify-between text-grey-100">
                <p className="text-sm font-semibold">All time</p>
              </div>
              <p className="font-medium flex items-center gap-x-2 text-sm mt-3">
                {data?.all_time}
              </p>
            </div>
          </div>
        </Card>
        <Card className="relative p-4">
          <DotPattern className="rounded-2xl opacity-15 p-2 pb-7 pl-12" />
          <LineChart
            labels={data?.timeseries.map((t) => t.date)!}
            data={data?.timeseries.map((t) => t.time)!}
          />
        </Card>
        <div className="flex gap-x-4">
          <Card className="p-4">
            <h3>Top languages</h3>
            <div className="p-10">
              <DonutChart
                labels={data?.languages.map((l) => l.language)!}
                data={data?.languages.map((l) => l.time)!}
              />
            </div>
          </Card>
          <div className="w-full">
            <Warning text="The card below will be populated with data in the coming days." />
            <Card className="p-4 mt-2">
              <p className="opacity-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                placeat expedita nesciunt molestiae doloribus, vitae accusamus
                tenetur ad natus eos pariatur saepe nihil porro, inventore at
                ipsa consequuntur voluptate enim id! Distinctio molestias
                blanditiis aliquid libero reprehenderit fugit quis alias
                explicabo, aperiam animi eveniet quo! Temporibus, expedita
                praesentium! Minus tempore nisi soluta ab eum amet inventore,
                quam expedita placeat iure, labore laborum impedit eveniet nam
                molestias quae sit provident, aperiam quis molestiae similique
                aut delectus est? Aperiam cumque deleniti accusantium? Dolor
                exercitationem ex ab esse cumque atque. Voluptates nulla id
                laudantium, eaque, libero, earum aliquid blanditiis atque
                aspernatur maiores dolore.
              </p>
            </Card>
          </div>
        </div>
        <div className="flex items-start gap-x-4">
          <Card className="p-4">
            <h3 className="mb-4 text-grey-100 font-medium">Files</h3>
            {data?.files.map((f, i) => (
              <div className="flex justify-between w-full my-4 text-sm" key={i}>
                <p>{truncate(f.file, 30)}</p>
                <p className="flex items-center gap-x-3">
                  {time_to_human(f.time)}
                  <Clock01Icon size={20} />
                </p>
              </div>
            ))}
          </Card>
          <Card className="p-4">
            <h3 className="mb-4 text-grey-100 font-medium">Branches</h3>
            {data?.branches.map((b, i) => (
              <div className="flex justify-between w-full my-4 text-sm" key={i}>
                <p>{b.branch}</p>
                <p className="flex items-center gap-x-3">
                  {time_to_human(b.time)}
                  <Clock01Icon size={20} />
                </p>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </ProjectsLayout>
  );
};

export default Project;
