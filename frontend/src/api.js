import axios from "axios";

const API = axios.create({
  baseURL: "https://library-management-system-w8ev.onrender.com",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;