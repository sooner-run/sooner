/* eslint-disable @typescript-eslint/naming-convention */
import { request } from "../configs/axios";

interface Props {
  api_key: string;
  payload: {};
}

export const sendPulse = async ({ api_key, payload }: Props) => {
  if (api_key) {
    try {
      await request.post("/pulses", payload, {
        headers: {
          Authorization: `Bearer ${api_key}`,
        },
      });
    } catch (error) {
      console.error("Error sending pulse:", error);
    }
  }
};
