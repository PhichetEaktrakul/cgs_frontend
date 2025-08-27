import axios from "axios";
import { useAuth } from "../context/AuthContext";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

// Add JWT token to every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or from AuthContext
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
