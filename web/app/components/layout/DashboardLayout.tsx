import { Link, useLocation } from "@remix-run/react";
import {
  ChartHistogramIcon,
  Folder01Icon,
  Home01Icon,
  Settings01Icon,
} from "hugeicons-react";
import { FC, ReactNode } from "react";
import { TbBolt } from "react-icons/tb";

const DashboardLayout: FC<{
  children: ReactNode;
  title: string;
  maintitle?: string;
  sublinks?: {
    index: {
      href: string;
      title: string;
    };
    links: {
      href: string;
      title: string;
    }[];
  };
}> = ({ children, title, sublinks, maintitle }) => {
  const sidebarlinks = [
    { icon: Home01Icon, href: "/dashboard", text: "Dashboard" },
    { icon: Folder01Icon, href: "/projects", text: "Projects" },
    { icon: ChartHistogramIcon, href: "/insights", text: "Insights" },
    { icon: Settings01Icon, href: "/settings", text: "Settings" },
  ];

  const location = useLocation();

  return (
    <div className="flex">
      <div className="sticky top-0 flex flex-col w-16 border-r items-center border-l border-grey h-screen">
        <div className="border-b border-grey h-16 w-full flex items-center justify-center">
          <div className="bg-accent size-10 rounded-3xl flex items-center justify-center font-black">
            S.
          </div>
        </div>
        <div className="flex flex-col gap-y-7 mt-6 px-4">
          {sidebarlinks.map((link, i) => (
            <Link to={link.href} key={i} unstable_viewTransition>
              <link.icon
                className={`${location.pathname === link.href ? "text-accent" : "text-grey-100"} hover:text-accent transition-colors`}
              />
            </Link>
          ))}
        </div>
      </div>
      {sublinks && (
        <div className="sticky top-0 flex flex-col w-64 px-3 border-r items-center border-l border-grey h-screen">
          <div className="flex items-center h-16 w-full">
            <h2 className="font-medium">{title}</h2>
          </div>
          <div className="w-full flex flex-col gap-y-3 text-sm">
            <Link
              to={sublinks.index.href}
              className={`px-3 border w-full py-2 ${location.pathname === sublinks.index.href ? "bg-accent/5 rounded-full border-accent/50" : "hover:text-accent transition-colors border-transparent"}`}
              unstable_viewTransition
            >
              {sublinks.index.title}
            </Link>

            {sublinks.links.map((_, i) => (
              <Link
                unstable_viewTransition
                key={i}
                to={_.href}
                className={`flex items-center gap-x-2 px-3 border w-full py-2 rounded-full ${location.pathname === _.href ? "bg-accent/5 border-accent/50" : "hover:text-accent transition-colors border-transparent"}`}
              >
                <TbBolt size={18} />
                {_.title}
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="w-full">
        <div className="sticky top-0 bg-black border-b border-grey px-10 flex items-center h-16 w-full">
          <h2 className="font-medium">{maintitle}</h2>
        </div>
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
