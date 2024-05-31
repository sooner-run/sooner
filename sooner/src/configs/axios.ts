import axios from "axios";

export const request = axios.create({
  baseURL: "http://localhost:1716/v1",
});
