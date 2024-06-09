import Card from "./ui/Card";
import { IoIosFolderOpen } from "react-icons/io";
import IconThing from "./IconThing";
import { IoArrowForwardOutline } from "react-icons/io5";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
// import { useEffect } from "react";
import { axios, axiosPublic } from "@/utils/axios";

const AllProjects = () => {
  const { data: projects } = useSWR("/v1/projects", fetcher);

  /*** Would need this in the future. */ /***Coming back to this 2 days later, why tf did I think I would need it in the future??? I have no idea, I'll keep it anyway just in case, maybe there's actually a reason. */
  // const fetchProjects = async () => {
  //   try {
  //     const { data } = await axios.get("/v1/projects");
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchProjects();
  // }, []);

  /*********************************/

  return (
    <Card>
      <div className="border-b border-grey">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <IconThing icon={IoIosFolderOpen} />
            <h2 className="font-medium">Projects</h2>
          </div>
          <Link href="/projects">
            <IoArrowForwardOutline />
          </Link>
        </div>
      </div>
      <div className="px-4 py-3 grid gap-3 grid-cols-3">
        {projects?.map((project: any, i: number) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
    </Card>
  );
};

export default AllProjects;
