import { Link, useLocation } from "@remix-run/react";
import React, { ReactNode } from "react";
import DashboardLayout from "~/components/layout/DashboardLayout";

const SettingsLayout = ({ children }: { children: ReactNode }) => {
  const routes = [
    {
      name: "Profile",
      href: "/settings/profile",
    },
    {
      name: "API Key",
      href: "/settings/api-key",
    },
  ];

  const SubLinks = () => {
    return (
      <div className="sticky top-0 flex flex-col w-64 px-3 border-r items-center border-l border-grey h-screen">
        <div className="flex items-center h-16 w-full">
          <h2 className="font-medium">Settings</h2>
        </div>
        <div className="w-full flex flex-col gap-y-1 text-sm">
          {routes.map((_, i) => (
            <Link
              unstable_viewTransition
              key={i}
              to={_.href}
              className={`flex items-center gap-x-2 px-3 border w-full py-2 rounded-full ${location.pathname === _.href ? "bg-accent/5 border-accent/50" : "hover:text-accent transition-colors border-transparent"}`}
            >
              {_.name}
            </Link>
          ))}

          <button className="px-3 w-full hover:text-accent transition-colors text-left rounded-full py-2">
            Sign out
          </button>
        </div>
      </div>
    );
  };

  const location = useLocation();
  return (
    <DashboardLayout
      title="Settings"
      maintitle={
        routes.find((r) => r.href === location.pathname)?.name || "Settings"
      }
      sublinks={<SubLinks />}
    >
      <div className="w-full px-32">{children}</div>
    </DashboardLayout>
  );
};

export default SettingsLayout;
