// import axios from "axios";

interface Props {
  api_key: string;
  payload: {};
}

export const sendPulse = async ({ api_key, payload }: Props) => {
  if (api_key) {
    console.log(payload);
    // try {
    //   await axios.post("https://example.com/pulse", payload, {
    //     headers: {
    //       Authorization: `Bearer ${api_key}`,
    //     },
    //   });
    // } catch (error) {
    //   console.error("Error sending pulse:", error);
    // }
  }
};
