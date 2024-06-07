import { ReactNode } from "react";
import { IoChevronBack } from "react-icons/io5";
import { TbBolt } from "react-icons/tb";
import DashboardLayout from "@/components/layout/DashboardLayout";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Link from "next/link";
import { useRouter } from "next/router";

const ProjectsLayout = ({ children }: { children: ReactNode }) => {
  const location = useRouter();

  const SubLinks = () => {
    const { data: projects } = useSWR("v1/projects", fetcher);

    return (
      <div className="sticky top-0 flex flex-col w-64 px-3 border-r items-center border-l border-grey h-screen">
        <div className="flex items-center h-16 w-full">
          <h2 className="font-medium">Projects</h2>
        </div>
        <div className="w-full flex flex-col gap-y-1 text-sm">
          <Link
            href="/projects"
            className={`px-3 border w-full py-2 ${location.asPath === "/projects" ? "bg-accent/5 rounded-full border-accent/50" : "hover:text-accent transition-colors border-transparent"}`}
          >
            Overview
          </Link>

          {projects?.map((_: any, i: number) => (
            <Link
              key={i}
              href={_.url}
              className={`flex items-center gap-x-2 px-3 border w-full py-2 rounded-full ${location.asPath === _.url ? "bg-accent/5 border-accent/50" : "hover:text-accent transition-colors border-transparent"}`}
            >
              <TbBolt size={18} />
              {_.name}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout
      title="Projects"
      maintitle={
        location.pathname !== "/projects" ? (
          <div className="flex items-center gap-x-2">
            <Link href="/projects">
              <IoChevronBack size={20} />
            </Link>
            {location.asPath.split("/")[2]}
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
