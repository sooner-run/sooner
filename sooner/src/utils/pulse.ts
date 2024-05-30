/* eslint-disable @typescript-eslint/naming-convention */
import axios from "axios";

interface Props {
  api_key: string;
  payload: {};
}

export const sendPulse = async ({ api_key, payload }: Props) => {
  if (api_key) {
    try {
      await axios.post("http://localhost:1716/v1/pulses", payload, {
        headers: {
          Authorization: `Bearer ${api_key}`,
        },
      });
    } catch (error) {
      console.error("Error sending pulse:", error);
    }
  }
};
