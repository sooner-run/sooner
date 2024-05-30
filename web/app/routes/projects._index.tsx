import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";
import ProjectCard from "~/components/ProjectCard";
import ProjectsLayout from "~/components/layout/ProjectsLayout";

const Projects = () => {
  const [data, setData] = useState<
    { name: string; time: string; language: string }[]
  >([]);

  useEffect(() => {
    const projects = Array.from({
      length: faker.number.int({ min: 4, max: 22 }),
    }).map(() => ({
      name: faker.internet.domainWord(),
      time: `${faker.number.int({ min: 1, max: 16 })}h ${faker.number.int({ min: 1, max: 59 })}m ${faker.number.int({ min: 16, max: 59 })}s`,
      language: faker.helpers.arrayElement([
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
      ]),
    }));

    setData(projects);
  }, []);

  return (
    <ProjectsLayout>
      <div className="grid grid-cols-3 gap-4">
        {data.map((project, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
    </ProjectsLayout>
  );
};

export default Projects;
