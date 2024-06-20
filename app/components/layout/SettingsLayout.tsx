import React, { ReactNode } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { axios } from "@/utils/axios";

const SettingsLayout = ({
  children,
  loading,
}: {
  children: ReactNode;
  loading?: boolean;
}) => {
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
              key={i}
              href={_.href}
              className={`flex items-center gap-x-2 px-3 border w-full py-2 rounded-full ${location.pathname === _.href ? "bg-accent/5 border-accent/50" : "hover:text-accent transition-colors border-transparent"}`}
            >
              {_.name}
            </Link>
          ))}

          <button
            className="px-3 w-full hover:text-accent transition-colors text-left rounded-full py-2"
            onClick={async () => {
              await axios.post("/auth/logout");
              location.push("/login");
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  };

  const location = useRouter();
  return (
    <DashboardLayout
      title="Settings"
      maintitle={
        routes.find((r) => r.href === location.pathname)?.name || "Settings"
      }
      sublinks={<SubLinks />}
      loading={loading}
    >
      <div className="w-full">{children}</div>
    </DashboardLayout>
  );
};

export default SettingsLayout;
