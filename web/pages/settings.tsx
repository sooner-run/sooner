import { useRouter } from "next/router";
import React from "react";

const Settings = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.push("/settings/profile");
  }, []);

  return <></>;
};

export default Settings;
