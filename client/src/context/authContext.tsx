/* 
import { api } from "@/api/apiInstances";
import { createContext, useContext, useEffect, useState } from "react";
import { contextType, currentUserType } from "./contextType";
import { useNavigate } from "react-router-dom";

//export const AuthContext = createContext<contextType | null>(null);
export const AuthContext = createContext({} as contextType);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<currentUserType | null>(
    () => JSON.parse(localStorage.getItem("user") as string) || null
  );

  const navigate = useNavigate();

  console.log("currentUser", currentUser);

  const login = async (loginData: { email: string; password: string }) => {
    const { data } = await api.post("/auth/login", loginData);
    setCurrentUser(data.user);
    return data.message;
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setCurrentUser(null);
    navigate("/");
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthState = () => {
  return useContext(AuthContext);
};
*/

import { api } from "@/api/apiInstances";
import { createContext, useContext, useEffect, useState } from "react";
import { contextType, currentUserType } from "./contextType";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext({} as contextType);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<currentUserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  console.log("currentUser", currentUser);

  const checkAuthStatus = async () => {
    try {
      const response = await api.get("/auth/auth-status");

      if (response.status === 200) {
        setCurrentUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
        navigate("/login");
      }
    } catch (error) {
      setCurrentUser(null);
      setIsAuthenticated(false);

      console.log(error);
    }
  };

  const login = async (loginData: { email: string; password: string }) => {
    const { data } = await api.post("/auth/login", loginData);
    await checkAuthStatus();
    return data.message;
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setCurrentUser(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  useEffect(() => {
    console.log("-------------------RUNNING--------------------");
    checkAuthStatus();
  }, [location]);

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, login, logout, checkAuthStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthState = () => {
  return useContext(AuthContext);
};
