import axios from "axios";

const API = axios.create({
  baseURL: "https://skillconnect-backend-3e6v.onrender.com/api", 
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
