/* eslint-disable @typescript-eslint/naming-convention */
import axios from "axios";

interface Props {
  api_key: string;
  payload: {};
}

export const sendPulse = async ({ api_key, payload }: Props) => {
  if (api_key) {
    try {
      const { data } = await axios.post(
        "http://localhost:1716/pulses",
        payload,
        {
          headers: {
            Authorization: `Bearer ${api_key}`,
          },
        }
      );
    } catch (error) {
      console.error("Error sending pulse:", error);
    }
  }
};
