import ProjectCard from "@/components/ProjectCard";
import ProjectsLayout from "@/components/layout/ProjectsLayout";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

const Projects = () => {
  const { data: projects } = useSWR("v1/projects", fetcher);
  return (
    <ProjectsLayout>
      <div className="grid grid-cols-3 gap-4">
        {projects?.map((project: any, i: number) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
    </ProjectsLayout>
  );
};

export default Projects;
