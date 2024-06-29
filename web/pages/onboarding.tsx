import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { fetcher } from "@/utils/fetcher";
import { useLogSnag } from "@logsnag/next";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import { HiArrowLongRight, HiKey, HiMiniArrowLongRight } from "react-icons/hi2";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { MdVerifiedUser } from "react-icons/md";
import { VscVscode } from "react-icons/vsc";
import { Tooltip } from "react-tooltip";
import useSWR from "swr";

const Onboarding = () => {
  const { data, isLoading } = useSWR("/app/api-key", fetcher);
  const [copied, setCopied] = useState(false);
  const [show, setShow] = useState(false);

  const MAX_COUNT = 20;

  const [activationStatus, setActivationStatus] = useState(
    "Waiting for activation..."
  );
  const [activated, setActivated] = useState(false);

  const [requestCount, setRequestCount] = useState(0);

  const handleCopy = () => {
    setCopied(true);
    copyToClipboard(data?.key);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const checkActivationStatus = () => {
    fetcher("/app/extension")
      .then((response) => {
        if (response.activated) {
          setActivated(true);
          setActivationStatus("Extension activated!");
        } else {
          setActivated(false);
          setRequestCount((prevCount) => prevCount + 1);
        }
      })
      .catch((error) => {
        console.error("Error checking activation status:", error);
      });
  };

  useEffect(() => {
    if (activated || requestCount >= MAX_COUNT) return;

    const interval = setInterval(() => {
      checkActivationStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, [activated, requestCount]);

  useEffect(() => {
    if (requestCount >= MAX_COUNT) {
      setActivationStatus("Extension is not activated");
    }
  }, [requestCount]);

  const handleVerifyAgain = () => {
    setRequestCount(0);
    setActivationStatus("Waiting for activation...");
    setActivated(false);
  };

  const { track } = useLogSnag();

  return (
    <DashboardLayout
      title="Onboarding"
      maintitle="Get started with Sooner"
      loading={isLoading}
    >
      <Tooltip id="api-key" />

      <div className="flex flex-col gap-y-4">
        <Card className="p-4">
          <h3 className="font-medium flex items-center gap-x-2">
            <HiKey size={20} />
            Copy your API key
          </h3>
          <p className="text-sm text-grey-100 mt-1">
            You need your API key to sync the Sooner VS Code extension with your
            dashboard.
          </p>
          <div className="mt-3 flex gap-3 justify-between items-center">
            <p
              className={`text-grey-100 border py-1 px-2 border-grey-100/50 rounded-xl text-sm ${show ? "blur-0" : "blur-md"} transition-all cursor-pointer`}
              onClick={() => setShow(!show)}
            >
              {data?.key}
            </p>
            <div className="flex gap-x-2">
              <button
                data-tooltip-id="api-key"
                data-tooltip-content={copied ? "Copied!" : "Copy"}
                onClick={handleCopy}
              >
                {copied ? (
                  <LuCopyCheck size={20} className="text-grey-100" />
                ) : (
                  <LuCopy size={20} className="text-grey-100" />
                )}
              </button>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="font-medium flex items-center gap-x-2">
            <VscVscode size={20} />
            Install and activate Sooner
          </h3>
          <p className="text-sm text-grey-100 mt-1">
            The Sooner extension helps you track your codetime automatically.
          </p>

          <ul className="list-decimal px-4 text-sm mt-5">
            <li>
              Search <span className="font-bold">Sooner</span> in the VS Code
              extensions tab or{" "}
              <Link
                href="https://marketplace.visualstudio.com/items?itemName=sooner.sooner"
                target="_blank"
                className="text-accent"
              >
                click here
              </Link>{" "}
              to install.
            </li>
            <li>
              When the installation is completed click{" "}
              <span className="font-bold">Activate Sooner</span> from the status
              bar and enter the API key above.
            </li>
          </ul>
        </Card>
        <Card className="p-4">
          <h3 className="font-medium flex items-center gap-x-2">
            <MdVerifiedUser size={20} />
            Verify installation
          </h3>
          <p className="text-sm text-grey-100 mt-1">
            Installation will automatically be verified when you activate the
            extension.
          </p>
          <p
            className={`text-sm mt-5 flex items-center gap-x-1 ${activated ? "text-green-500" : requestCount >= MAX_COUNT ? "text-red-500" : ""}`}
          >
            {activationStatus}{" "}
            {activationStatus === "Waiting for activation..." && (
              <CgSpinner className="animate-spin" />
            )}{" "}
          </p>
          {requestCount >= MAX_COUNT && (
            <button
              className="mt-4 py-2 px-4 bg-accent text-xs text-white rounded-md"
              onClick={handleVerifyAgain}
            >
              Verify installation
            </button>
          )}
          {activationStatus === "Extension activated!" && (
            <Link
              href="/dashboard"
              onClick={() => {
                track({
                  channel: "users",
                  event: "Click 'Continue to dashboard' button",
                  icon: "🫰🏼",
                  notify: true,
                });
              }}
            >
              <button className="mt-4 py-2 px-4 bg-accent text-xs text-white rounded-md flex items-center gap-x-2">
                Continue to dashboard <HiMiniArrowLongRight size={20} />
              </button>
            </Link>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Onboarding;
