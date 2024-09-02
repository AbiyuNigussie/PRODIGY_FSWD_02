import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider"; // Import your AuthProvider

const Home = () => {
  const navigate = useNavigate();
  const { token } = useAuth(); // Access token from AuthProvider

  const handleDashboard = () => {
    if (token) navigate("/dashboard");
    else navigate("login");
  };

  return (
    <>
      {/* Hero Section */}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div>
            <h1 className="text-5xl font-bold">
              Welcome to Employee Management
            </h1>
            <p className="py-6">
              Simplify managing your employees' profiles with our comprehensive
              tools.
            </p>
            <button className="btn btn-primary" onClick={handleDashboard}>
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-10 bg-base-100">
        <h2 className="text-4xl font-bold text-center mb-8">Key Features</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="card w-96 bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Create Employee Profiles</h3>
              <p>
                Easily add new employees to your system with complete profile
                details.
              </p>
            </div>
          </div>
          <div className="card w-96 bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Update Employee Information</h3>
              <p>
                Keep employee profiles up-to-date by editing their details
                anytime.
              </p>
            </div>
          </div>
          <div className="card w-96 bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">View Employee Profiles</h3>
              <p>
                Access detailed profiles to review all necessary employee
                information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
