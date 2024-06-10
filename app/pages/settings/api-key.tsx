import { useState } from "react";
import IconThing from "@/components/IconThing";
import SettingsLayout from "@/components/layout/SettingsLayout";
import Card from "@/components/ui/Card";
import { VscKey } from "react-icons/vsc";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { Tooltip } from "react-tooltip";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

const ApiKeySettings = () => {
  const { data, isLoading } = useSWR("/app/api-key", fetcher);

  const [copied, setCopied] = useState(false);

  const [show, setShow] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <SettingsLayout loading={isLoading}>
      <Tooltip id="api-key" />
      <Card>
        <div className="border-b border-grey">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <IconThing icon={VscKey} />
              <h2 className="font-medium">API Key</h2>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 flex gap-3 justify-between items-center">
          <p
            className={`text-grey-100 ${show ? "blur-0" : "blur-md"} transition-all cursor-pointer`}
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
    </SettingsLayout>
  );
};

export default ApiKeySettings;
