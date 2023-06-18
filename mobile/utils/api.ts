import axios from "axios";

const API_URL = "http://192.168.7.50:3000";

export const api = axios.create({
  baseURL: API_URL,
});
