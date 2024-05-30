import { useLocation } from "@remix-run/react";
import React, { ReactNode } from "react";
import DashboardLayout from "~/components/layout/DashboardLayout";

const ProjectsLayout = ({ children }: { children: ReactNode }) => {
  const pjs = [
    {
      name: "uploadfly",
      time: "23h 44m 31s",
      language: "typescript",
    },
    {
      name: "logdrop",
      time: "13h 14m 23s",
      language: "elixir",
    },
    {
      name: "vibrantt",
      time: "11h 13m 49s",
      language: "javascript",
    },
  ];

  const location = useLocation();
  return (
    <DashboardLayout
      title="Projects"
      maintitle={location.pathname.split("/")[2] || "Projects"}
      sublinks={{
        index: {
          href: "/projects",
          title: "Overview",
        },
        links: pjs.map((_) => ({
          href: `/projects/${_.name.toLowerCase()}`,
          title: _.name,
        })),
      }}
    >
      <div className="w-full px-14">{children}</div>
    </DashboardLayout>
  );
};

export default ProjectsLayout;
