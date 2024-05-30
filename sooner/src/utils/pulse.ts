/* eslint-disable @typescript-eslint/naming-convention */
import axios from "axios";

interface Props {
  api_key: string;
  payload: {};
}

export const sendPulse = async ({ api_key, payload }: Props) => {
  if (api_key) {
    console.log(payload);
    try {
      const { data } = await axios.post(
        "http://localhost:1716/pulse",
        payload,
        {
          headers: {
            Authorization: `Bearer ${api_key}`,
          },
        }
      );

      console.log(data);
    } catch (error) {
      console.error("Error sending pulse:", error);
    }
  }
};
