import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext";

const currentUser = {
  id: "243",
  username: "123",
  email: "123@gmail.com",
};

localStorage.setItem("user", JSON.stringify(currentUser));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
