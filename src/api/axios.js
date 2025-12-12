import axios from "axios";

const API = axios.create({
  baseURL: "https://globetales-zedt.onrender.com/api/auth/",
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("access");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
