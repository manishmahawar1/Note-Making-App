import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URI;

  axios.defaults.withCredentials = true;

  // signup
  const signup = async (data) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/user/signup`,
        data,
      );
      toast.success("Signup successful");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("Signup failed");
    }
  };

  // login
  const login = async (data) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/user/login`,
        data,
      );

      setUser(response.data.user);
      toast.success("Login successful");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };

  // logout
  const logout = async () => {
    try {
      await axios.post(`${backendUrl}/api/v1/user/logout`);
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/v1/user/me`);

      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    setUser,
    signup,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
