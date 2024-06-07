import Card from "./ui/Card";
import { IoIosFolderOpen } from "react-icons/io";
import IconThing from "./IconThing";
import { Link, useLoaderData } from "@remix-run/react";
import { IoArrowForwardOutline } from "react-icons/io5";
import ProjectCard from "./ProjectCard";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { fetchLoader } from "~/utils/loader";

export async function loader(args: LoaderFunctionArgs) {
  const projects_ = await fetchLoader(args, "/v1/projects");
  return json({ projects: await projects_.json() });
}

const AllProjects = () => {
  const { projects } = useLoaderData<typeof loader>();

  return (
    <Card>
      <div className="border-b border-grey">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <IconThing icon={IoIosFolderOpen} />
            <h2 className="font-medium">Projects</h2>
          </div>
          <Link to="/projects" unstable_viewTransition>
            <IoArrowForwardOutline />
          </Link>
        </div>
      </div>
      <div className="px-4 py-3 flex gap-3">
        {projects.map((project: any, i: number) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
    </Card>
  );
};

export default AllProjects;
