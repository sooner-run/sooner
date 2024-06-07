import { faker } from "@faker-js/faker";
import { ArrowDown01Icon, Clock01Icon } from "hugeicons-react";
import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import DonutChart from "@/components/DonutChart";
import LineChart from "@/components/LineChart";
import ProjectsLayout from "@/components/layout/ProjectsLayout";
import Card from "@/components/ui/Card";
import { getColorForLanguage } from "@/utils/getColorForLanguage";
import { time_to_human } from "@/utils/time_to_human";

const Project = () => {
  const [language] = useState(
    faker.helpers.arrayElement([
      "typescript",
      "css",
      "go",
      "rust",
      "javascript",
      "c++",
      "php",
      "java",
      "python",
      "erlang",
      "html",
      "scss",
    ])
  );

  const [files] = useState(
    Array.from({ length: 43 }).map(() => ({
      file: faker.system.fileName(),
      time: faker.number.int({ min: 600_000, max: 100_000_000 }),
    }))
  );
  const [branches] = useState(
    Array.from({ length: 10 }).map(() => ({
      branch: faker.git.branch(),
      time: faker.number.int({ min: 600_000, max: 100_000_000 }),
    }))
  );

  return (
    <ProjectsLayout>
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
                88h 23m 11s
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
                <GoDotFill color={getColorForLanguage(language)!} size={30} />
                <p className="text-sm">{language}</p>
              </div>
            </div>
          </div>
          <div className="px-2">
            <div className="group cursor-pointer p-2">
              <div className="flex items-center justify-between text-grey-100">
                <p className="text-sm font-semibold">All time</p>
              </div>
              <p className="font-medium flex items-center gap-x-2 text-sm mt-3">
                201h 54m 23s
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <LineChart
            labels={[
              "May 22nd",
              "May 23rd",
              "May 24th",
              "May 25th",
              "May 26th",
              "May 27th",
              "May 28th",
            ]}
            data={[4, 10, 7, 8, 14, 8, 9]}
          />
        </Card>
        <div className="flex gap-x-4">
          <Card className="p-4">
            <h3>Top languages</h3>
            <div className="p-10">
              <DonutChart
                labels={[
                  "typescript",
                  "python",
                  "kotlin",
                  "css",
                  "javascript",
                  "elixir",
                  "html",
                ]}
                data={[40670, 69372, 293624, 29393, 202820, 194760]}
              />
            </div>
          </Card>
          <Card className="p-4">
            <DonutChart
              labels={[
                "May 22nd",
                "May 23rd",
                "May 24th",
                "May 25th",
                "May 26th",
                "May 27th",
                "May 28th",
              ]}
              data={[4, 10, 7, 8, 14, 8, 9]}
            />
          </Card>
        </div>
        <div className="flex items-start gap-x-4">
          <Card className="p-4">
            <h3 className="mb-4 text-grey-100 font-medium">Files</h3>
            {files
              .sort((a, b) => b.time - a.time)
              .map((f, i) => (
                <div
                  className="flex justify-between w-full my-4 text-sm"
                  key={i}
                >
                  <p>{f.file}</p>
                  <p className="flex items-center gap-x-3">
                    {time_to_human(f.time)}
                    <Clock01Icon size={20} />
                  </p>
                </div>
              ))}
          </Card>
          <Card className="p-4">
            <h3 className="mb-4 text-grey-100 font-medium">Branches</h3>
            {branches
              .sort((a, b) => b.time - a.time)
              .map((b, i) => (
                <div
                  className="flex justify-between w-full my-4 text-sm"
                  key={i}
                >
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
