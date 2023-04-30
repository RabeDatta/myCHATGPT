import { api } from "@/api/apiInstances";
import { createContext, useContext, useEffect, useState } from "react";
import { contextType, currentUserType } from "./contextType";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({} as contextType);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<currentUserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthStatusLoading, setIsAuthStatusLoading] = useState(true); // Add this line

  const navigate = useNavigate();

  const checkAuthStatus = async () => {
    setIsAuthStatusLoading(true); // Set loading to true when the check starts

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
    } finally {
      setIsAuthStatusLoading(false); // Set loading to false when the check has completed
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
    console.log("------------------- CHECKING AUTH --------------------");
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        logout,
        checkAuthStatus,
        isAuthStatusLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthState = () => {
  return useContext(AuthContext);
};
