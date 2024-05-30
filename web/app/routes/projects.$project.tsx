import { faker } from "@faker-js/faker";
import { ArrowDown01Icon } from "hugeicons-react";
import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import LineChart from "~/components/LineChart";
import ProjectsLayout from "~/components/layout/ProjectsLayout";
import Card from "~/components/ui/Card";
import { getColorForLanguage } from "~/utils/getColorForLanguage";

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

  return (
    <ProjectsLayout>
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
      <Card className="my-4 p-4">
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
    </ProjectsLayout>
  );
};

export default Project;
