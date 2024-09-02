import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(username, email, password);
      navigate("/login");
    } catch (err) {
      setError("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="card w-96 bg-gray-800 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center text-2xl font-bold text-white">
            SignUp
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
              <span className="label-text text-gray-400">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered bg-gray-700 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onClick={handleSignUp}
            >
              Sign Up
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
                Already have an account?{" "}
                <Link to="/login" className="text-primary">
                  Sign In here!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
