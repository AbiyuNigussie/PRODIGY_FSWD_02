import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./providers/AuthProvider";
import { Component } from "react";
import ProtectedRoute from "./route/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Layout from "./components/layouts/Layout";
import EmployeeCreate from "./pages/EmployeeCreate";
import EmployeeEdit from "./pages/EmployeeEdit";
import EmployeeDetails from "./pages/EmployeeDetails";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/employees/create"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <EmployeeCreate />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/employees/edit/:id"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <EmployeeEdit />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/employees/details/:id"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <EmployeeDetails />
                </Layout>
              }
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
