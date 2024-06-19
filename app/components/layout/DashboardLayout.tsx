import Link from "next/link";
import {
  Bug02Icon,
  ChartHistogramIcon,
  Folder01Icon,
  Home01Icon,
  Settings01Icon,
} from "hugeicons-react";
import { FC, ReactNode, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion } from "framer-motion";
import { CgSpinner } from "react-icons/cg";

const DashboardLayout: FC<{
  children: ReactNode;
  title?: string;
  maintitle?: ReactNode;
  sublinks?: ReactNode;
  loading?: boolean;
  error?: any;
}> = ({ children, title, sublinks, maintitle, loading, error }) => {
  const sidebarlinks = [
    { icon: Home01Icon, href: "/dashboard", text: "Dashboard" },
    { icon: Folder01Icon, href: "/projects", text: "Projects" },
    { icon: ChartHistogramIcon, href: "/insights", text: "Insights" },
    { icon: Settings01Icon, href: "/settings", text: "Settings" },
    { icon: Bug02Icon, href: "/bug-report", text: "Report a bug" },
  ];

  const location = useRouter();

  const variants = {
    hidden: { opacity: 0, x: 100 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  };

  useEffect(() => {
    console.log(error);
  }, []);

  return (
    <div className="flex text-white">
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
        <div className="sticky top-0 bg-black border-b border-grey px-10 flex items-center h-16 w-full z-10">
          <h2 className="font-medium">{maintitle}</h2>
        </div>
        <motion.div
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          className="pt-4 pb-16"
        >
          {loading ? (
            <div className="py-10 flex items-center justify-center">
              <CgSpinner size={30} className="animate-spin" />
            </div>
          ) : (
            children
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardLayout;
