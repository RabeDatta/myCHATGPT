import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3071/api",
  withCredentials: true,
});
