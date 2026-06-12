import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CHAT_API_URL || "http://localhost:8000/api",
});

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL || "http://localhost:8001/api",
});
