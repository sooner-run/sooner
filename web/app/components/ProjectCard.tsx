import { Link } from "@remix-run/react";
import Card from "./ui/Card";
import { GoDotFill } from "react-icons/go";
import { getColorForLanguage } from "~/utils/getColorForLanguage";

const ProjectCard = ({
  name,
  time,
  language,
}: {
  name: string;
  time: string;
  language: string;
}) => {
  return (
    <Link
      to={`/projects/${name.toLowerCase()}`}
      className="w-full"
      unstable_viewTransition
    >
      <Card className="p-3 font-medium cursor-pointer hover:bg-grey-300/60 transition-colors">
        <h2 className="text-grey-100">{name}</h2>
        <h1 className="text-2xl my-5">{time}</h1>
        <div className="flex items-center gap-x-1">
          <GoDotFill color={getColorForLanguage(language)!} size={30} />
          <p className="text-grey-100">{language}</p>
        </div>
      </Card>
    </Link>
  );
};

export default ProjectCard;
