import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="card w-96 bg-gray-800 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center text-2xl font-bold text-white">
            Login
          </h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-400">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input input-bordered bg-gray-700 text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text text-gray-400">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered bg-gray-700 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-control mt-6">
            <button
              className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div className="text-center mt-4">
            <a
              href="#"
              className="link link-hover text-sm text-gray-400 hover:text-gray-300"
            >
              Forgot password?
            </a>
            <div className="text-center mt-2">
              <p className="mt-4 text-center">
                Dont't have an account?{" "}
                <Link to="/signup" className="text-primary">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
