import axios from "axios";

const axiosReq = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// export const newAbortSignal = (timeoutMs: number) => {
//   const abortController = new AbortController();
//   setTimeout(() => abortController.abort(), timeoutMs || 0);

//   return abortController.signal;
// };

export { axiosReq as axios };
