import Link from "next/link";
import Card from "./ui/Card";
import { GoDotFill } from "react-icons/go";
import { getColorForLanguage } from "@/utils/getColorForLanguage";

const ProjectCard = ({
  name,
  time,
  top_language,
  time_human_readable,
  url,
}: {
  name: string;
  time: string;
  top_language: string;
  time_human_readable: string;
  url: string;
}) => {
  return (
    <Link href={url} className="w-full">
      <Card className="p-3 font-medium cursor-pointer hover:bg-grey-300/60 transition-colors">
        <h2 className="text-grey-100">{name}</h2>
        <h1 className="text-2xl my-5">{time_human_readable}</h1>
        <div className="flex items-center gap-x-1">
          <GoDotFill color={getColorForLanguage(top_language)!} size={30} />
          <p className="text-grey-100">{top_language}</p>
        </div>
      </Card>
    </Link>
  );
};

export default ProjectCard;
