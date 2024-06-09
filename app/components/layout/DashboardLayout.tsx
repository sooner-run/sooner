import Link from "next/link";
import {
  ChartHistogramIcon,
  Folder01Icon,
  Home01Icon,
  Settings01Icon,
} from "hugeicons-react";
import { FC, ReactNode } from "react";
import { Tooltip } from "react-tooltip";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion } from "framer-motion";

const DashboardLayout: FC<{
  children: ReactNode;
  title?: string;
  maintitle?: ReactNode;
  sublinks?: ReactNode;
}> = ({ children, title, sublinks, maintitle }) => {
  const sidebarlinks = [
    { icon: Home01Icon, href: "/dashboard", text: "Dashboard" },
    { icon: Folder01Icon, href: "/projects", text: "Projects" },
    { icon: ChartHistogramIcon, href: "/insights", text: "Insights" },
    { icon: Settings01Icon, href: "/settings", text: "Settings" },
  ];

  const location = useRouter();

  const variants = {
    hidden: { opacity: 0, x: -100 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex">
      <Head>
        <title>{`${title} ~ Sooner`}</title>
      </Head>
      <Tooltip id="route" />
      <div className="sticky top-0 flex flex-col w-16 border-r items-center border-l border-grey h-screen">
        <div className="border-b border-grey h-16 w-full flex items-center justify-center">
          <img src="/sooner-logo.svg" className="w-8" alt="" />
        </div>
        <div className="flex flex-col gap-y-7 mt-6 px-4">
          {sidebarlinks.map((link, i) => (
            <Link
              href={link.href}
              key={i}
              data-tooltip-id="route"
              data-tooltip-content={link.text}
            >
              <link.icon
                className={`${
                  location.pathname.includes(link.href)
                    ? "text-accent"
                    : "text-grey-100"
                } hover:text-accent transition-colors`}
              />
            </Link>
          ))}
        </div>
      </div>
      {sublinks && sublinks}
      <div className="w-full">
        <div className="sticky top-0 bg-black border-b border-grey px-10 flex items-center h-16 w-full">
          <h2 className="font-medium">{maintitle}</h2>
        </div>
        <motion.div
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          className="pt-4 pb-16"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardLayout;
