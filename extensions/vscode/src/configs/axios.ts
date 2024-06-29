import axios from "axios";

export const request = axios.create({
  baseURL: "https://api.sooner.run/v1",
});
