import { faker } from "@faker-js/faker";
import { Clock01Icon } from "hugeicons-react";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import BarChart from "~/components/BarChart";
import DashboardLayout from "~/components/layout/DashboardLayout";
import Card from "~/components/ui/Card";
import { getColorForLanguage } from "~/utils/getColorForLanguage";
import { time_to_human } from "~/utils/time_to_human";

const Insights = () => {
  const [languages] = useState(
    Array.from({ length: 8 }).map(() => ({
      language: faker.helpers.arrayElement([
        "HTML",
        "CSS",
        "JavaScript",
        "PHP",
        "Typescript",
        "SQL",
      ]),
      time: faker.number.int({ min: 1_000_000, max: 5_000_000 }),
    }))
  );

  const [projects] = useState(
    Array.from({ length: 8 }).map(() => ({
      project: faker.internet.domainWord(),
      time: faker.number.int({ min: 1_000_000, max: 5_000_000 }),
    }))
  );

  return (
    <DashboardLayout title="Insights" maintitle="Insights">
      <div className="px-52 flex flex-col gap-y-5">
        <Card className="p-4">
          <h3 className="font-medium text-grey-100">Weekday average</h3>
          <div className="my-4">
            <BarChart
              data={[600000, 203725, 542029, 553902, 908765, 876539, 608741]}
              labels={[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ]}
            />
          </div>
        </Card>

        <div className="flex gap-x-5">
          <Card className="p-4">
            <h3 className="mb-4 text-grey-100 font-medium">Top languages</h3>
            {languages
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
                  <p className="flex items-center gap-x-3">
                    {time_to_human(l.time)}
                    <Clock01Icon size={20} />
                  </p>
                </div>
              ))}
          </Card>
          <Card className="p-4">
            <h3 className="mb-4 text-grey-100 font-medium">Top projects</h3>
            {projects
              .sort((a, b) => b.time - a.time)
              .map((p, i) => (
                <div
                  className="flex justify-between w-full my-4 text-sm"
                  key={i}
                >
                  <p>{p.project}</p>
                  <p className="flex items-center gap-x-3">
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
