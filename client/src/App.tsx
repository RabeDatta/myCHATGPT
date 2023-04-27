import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthState } from "./context/authContext";
import Summary from "./pages/Summary";
import KeyPoints from "./pages/KeyPoints";
import SQLQueryGenerator from "./pages/SQLQueryGenerator";
import JSConverter from "./pages/JSConverter";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { currentUser } = AuthState();
  if (!currentUser) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return <>{children}</>; // wrap the children in a fragment
};

function App() {
  const { currentUser } = AuthState();

  return (
    <div className="App">
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
          element={!currentUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!currentUser ? <Register /> : <Navigate to="/" />}
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
          path="/keypoints"
          element={
            <ProtectedRoute>
              <KeyPoints />
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
      </Routes>
    </div>
  );
}

export default App;
