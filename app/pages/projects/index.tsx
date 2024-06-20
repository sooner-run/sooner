import ProjectCard from "@/components/ProjectCard";
import ProjectsLayout from "@/components/layout/ProjectsLayout";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

const Projects = () => {
  const { data: projects } = useSWR("/v1/projects", fetcher);
  return (
    <ProjectsLayout>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
        {projects?.map((project: any, i: number) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
    </ProjectsLayout>
  );
};

export default Projects;
