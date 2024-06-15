/* eslint-disable @typescript-eslint/naming-convention */
import { request } from "../configs/axios";
import { updateStatusBarText } from "../status_bar";

interface Props {
  api_key: string;
  payload: {};
}

export const sendPulse = async ({ api_key, payload }: Props) => {
  if (api_key) {
    try {
      const { data } = await request.post("/pulses", payload, {
        headers: {
          Authorization: `Bearer ${api_key}`,
        },
      });
      updateStatusBarText(data.codetime_today);
    } catch (error) {
      console.error("Error sending pulse:", error);
    }
  }
};
