import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthState } from "./context/authContext";
import Summary from "./pages/Summary";
import SQLQueryGenerator from "./pages/SQLQueryGenerator";
import JSConverter from "./pages/JSConverter";
import SciFiImage from "./pages/SciFiImage";
import Notes from "./pages/Notes";
import { Toaster } from "react-hot-toast";
import Loading from "./pages/Loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isAuthStatusLoading } = AuthState();

  if (isAuthStatusLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return <>{children}</>; // wrap the children in a fragment
};

function App() {
  const { isAuthenticated } = AuthState();

  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/summary"
          element={
            <ProtectedRoute>
              <Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sql-query"
          element={
            <ProtectedRoute>
              <SQLQueryGenerator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/js-converter"
          element={
            <ProtectedRoute>
              <JSConverter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scifi-image"
          element={
            <ProtectedRoute>
              <SciFiImage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
