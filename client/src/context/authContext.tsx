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
