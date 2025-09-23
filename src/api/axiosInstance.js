import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// Customer API URL
export const apiCust = axios.create({ baseURL: apiUrl });

// Admin API URL
export const apiAdmin = axios.create({ baseURL: apiUrl });

const token = localStorage.getItem("token");
if (token) {
  apiAdmin.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
