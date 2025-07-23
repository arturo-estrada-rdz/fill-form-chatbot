import axios from "axios";
import { environments } from "./environments";

export const apiClient = axios.create({
  baseURL: environments.apiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});
