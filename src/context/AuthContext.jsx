import { createContext, useContext, useState } from "react";
import axios from "axios";
/*------------------Authentication Context For Admin*/
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [admin, setAdmin] = useState(localStorage.getItem("admin") || null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const login = async (username, password) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/login`, {
        username,
        password,
      });
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);

      setAdmin(username);
      localStorage.setItem("admin", username);

      return true;
    } catch (err) {
      console.error(err.response?.data || err.message);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  };

  const value = { token, admin, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
