import axios from "axios";

const API_URL = "http://192.168.100.71:3000";
// const API_URL = "http://10.197.74.117:3000";

export const api = axios.create({
  baseURL: API_URL,
});
