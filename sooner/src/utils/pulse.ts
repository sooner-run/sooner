/* eslint-disable @typescript-eslint/naming-convention */
import request from "../configs/axios";

interface Props {
  payload: {};
}

export const sendPulse = async ({ payload }: Props) => {
  try {
    await request.post("/pulses", payload);
  } catch (error) {
    console.error("Error sending pulse:", error);
  }
};
