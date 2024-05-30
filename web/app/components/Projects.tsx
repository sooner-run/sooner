import React, { useState } from "react";
import Card from "./ui/Card";
import { IoIosFolderOpen } from "react-icons/io";
import IconThing from "./IconThing";
import { Link } from "@remix-run/react";
import { IoArrowForwardOutline } from "react-icons/io5";
import ProjectCard from "./ProjectCard";

const AllProjects = () => {
  const [data] = useState([
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
  ]);

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
        {data.map((project, i) => (
          <ProjectCard {...project} key={i} />
        ))}
      </div>
    </Card>
  );
};

export default AllProjects;
