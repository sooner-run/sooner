import { Link, useLocation } from "@remix-run/react";
import { ReactNode } from "react";
import { IoChevronBack } from "react-icons/io5";
import { TbBolt } from "react-icons/tb";
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

  const SubLinks = () => {
    return (
      <div className="sticky top-0 flex flex-col w-64 px-3 border-r items-center border-l border-grey h-screen">
        <div className="flex items-center h-16 w-full">
          <h2 className="font-medium">Projects</h2>
        </div>
        <div className="w-full flex flex-col gap-y-1 text-sm">
          <Link
            to={"/projects"}
            className={`px-3 border w-full py-2 ${location.pathname === "/projects" ? "bg-accent/5 rounded-full border-accent/50" : "hover:text-accent transition-colors border-transparent"}`}
            unstable_viewTransition
          >
            Overview
          </Link>

          {pjs
            .map((_) => ({
              href: `/projects/${_.name.toLowerCase()}`,
              title: _.name,
            }))
            .map((_, i) => (
              <Link
                unstable_viewTransition
                key={i}
                to={_.href}
                className={`flex items-center gap-x-2 px-3 border w-full py-2 rounded-full ${location.pathname === _.href ? "bg-accent/5 border-accent/50" : "hover:text-accent transition-colors border-transparent"}`}
              >
                <TbBolt size={18} />
                {_.title}
              </Link>
            ))}
        </div>
      </div>
    );
  };

  const location = useLocation();
  return (
    <DashboardLayout
      title="Projects"
      maintitle={
        location.pathname !== "/projects" ? (
          <div className="flex items-center gap-x-2">
            <Link to="/projects" unstable_viewTransition>
              <IoChevronBack size={20} />
            </Link>
            {location.pathname.split("/")[2]}
          </div>
        ) : (
          "Projects"
        )
      }
      sublinks={<SubLinks />}
    >
      <div className="w-full px-14">{children}</div>
    </DashboardLayout>
  );
};

export default ProjectsLayout;
