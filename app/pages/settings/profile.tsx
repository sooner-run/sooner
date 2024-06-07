import { PiEnvelopeSimpleBold } from "react-icons/pi";
import IconThing from "@/components/IconThing";
import SettingsLayout from "@/components/layout/SettingsLayout";
import Card from "@/components/ui/Card";
import { TiUserOutline } from "react-icons/ti";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

const ProfileSettings = () => {
  const { data } = useSWR("/app/profile", fetcher);

  return (
    <SettingsLayout>
      <div className="flex gap-4 flex-col">
        <Card>
          <div className="border-b border-grey">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                <IconThing icon={PiEnvelopeSimpleBold} />
                <h2 className="font-medium">Email</h2>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 flex gap-3">
            <p className="text-grey-100">{data?.email}</p>
          </div>
        </Card>
        <Card>
          <div className="border-b border-grey">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                <IconThing icon={TiUserOutline} />
                <h2 className="font-medium">Username</h2>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 flex gap-3">
            <p className="text-grey-100">@{data?.username}</p>
          </div>
        </Card>
      </div>
    </SettingsLayout>
  );
};

export default ProfileSettings;
