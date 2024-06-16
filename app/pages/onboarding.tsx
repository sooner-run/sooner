import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { fetcher } from "@/utils/fetcher";
import React, { useState } from "react";
import { HiKey } from "react-icons/hi2";
import { LuCopy, LuCopyCheck, LuKeyRound } from "react-icons/lu";
import { MdVerifiedUser } from "react-icons/md";
import { VscVscode } from "react-icons/vsc";
import { Tooltip } from "react-tooltip";
import useSWR from "swr";

const Onboarding = () => {
  const { data, isLoading } = useSWR("/app/api-key", fetcher);

  const [copied, setCopied] = useState(false);

  const [show, setShow] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    copyToClipboard(data?.key);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <DashboardLayout
      title="Onboarding"
      maintitle="Get started with Sooner"
      loading={isLoading}
    >
      <Tooltip id="api-key" />

      <div className="px-52 flex flex-col gap-y-4">
        <Card className="p-4">
          <h3 className="font-medium flex items-center gap-x-2">
            <HiKey size={20} />
            Copy your API key
          </h3>
          <p className="text-sm text-grey-100 mt-1">
            You need your API key to sync the Sooner VS Code extension with your
            dashboard.
          </p>
          <div className="py-3 flex gap-3 justify-between items-center">
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
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Onboarding;
