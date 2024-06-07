import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData, useLocation } from "@remix-run/react";
import { ReactNode } from "react";
import { IoChevronBack } from "react-icons/io5";
import { TbBolt } from "react-icons/tb";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { fetchLoader } from "@/utils/loader";

export async function loader(args: LoaderFunctionArgs) {
  const projects_ = await fetchLoader(args, "/v1/projects");
  return json({ projects: await projects_.json() });
}

const ProjectsLayout = ({ children }: { children: ReactNode }) => {
  const SubLinks = () => {
    const { projects } = useLoaderData<typeof loader>();
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
          {JSON.stringify(projects)}

          {/* {projects?.map((_: any, i: number) => (
            <Link
              unstable_viewTransition
              key={i}
              to={_.url}
              className={`flex items-center gap-x-2 px-3 border w-full py-2 rounded-full ${location.pathname === _.href ? "bg-accent/5 border-accent/50" : "hover:text-accent transition-colors border-transparent"}`}
            >
              <TbBolt size={18} />
              {_.name}
            </Link>
          ))} */}
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
