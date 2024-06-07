import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProjectCard from "~/components/ProjectCard";
import ProjectsLayout from "~/components/layout/ProjectsLayout";
import { fetchLoader } from "~/utils/loader";

export async function loader(args: LoaderFunctionArgs) {
  return fetchLoader(args, "/v1/projects");
}

const Projects = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <ProjectsLayout>
      <div className="grid grid-cols-3 gap-4">
        {JSON.stringify(data)}

        {/* {data.map((project: any, i: number) => (
          <ProjectCard key={i} {...project} />
        ))} */}
      </div>
    </ProjectsLayout>
  );
};

export default Projects;
