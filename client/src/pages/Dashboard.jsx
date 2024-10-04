import React, { useState, useEffect } from "react";
import {
  getUserData,
  setAuthToken,
  getEmployees,
  deleteEmployee,
} from "../Services/apiService";
import { useAuth } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (token) {
          setAuthToken(token);
        } else {
          setAuthToken(null);
        }
        const data = await getUserData();
        const employeeList = await getEmployees();
        setUserData(data);
        setEmployees(employeeList);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  if (loading) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400">{error}</div>;
  }

  const handleRowClick = (employeeID) => {
    navigate(`/employees/details/${employeeID}`);
  };
  const handleDeleteEmployee = async (employeeId) => {
    try {
      await deleteEmployee(employeeId, token);
      setEmployees(
        employees.filter((employee) => employee.employeeID !== employeeId)
      );
      console.log("Employee deleted with ID:", employeeId);
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="container mx-auto">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          {/* Navigation */}
          <nav className="mb-6 text-gray-400 flex justify-between items-center">
            <div>
              <Link to="/" className="text-blue-400 hover:underline">
                Home
              </Link>
              {" > "}
              <span className="text-gray-600">Dashboard</span>
            </div>
          </nav>

          <h1 className="text-4xl font-bold mb-6 text-white text-center">
            Employee Management Dashboard
          </h1>

          <div className="mb-8 text-center">
            <p className="text-lg mb-2 text-gray-300">
              Welcome,{" "}
              <span className="font-semibold">
                {userData?.username || "User"}
              </span>
            </p>
            <p className="text-lg text-gray-300">
              Email: {userData?.email || "Not available"}
            </p>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">
                Manage Employees
              </h2>
              <Link
                to="/employees/create"
                className="btn btn-success bg-green-600 hover:bg-green-700 text-white flex items-center"
              >
                <FaUserPlus className="mr-2" /> Add New Employee
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="table-auto w-full bg-gray-800 rounded-lg border border-gray-500">
                <thead className="bg-gray-600 text-white ">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Phone</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr
                      key={employee.employeeID}
                      className="text-gray-300 hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleRowClick(employee.employeeID)}
                    >
                      <td className="border border-gray-500 px-4 py-2">
                        {employee.firstName} {employee.lastName}
                      </td>
                      <td className="border border-gray-500 px-4 py-2">
                        {employee.email}
                      </td>
                      <td className="border border-gray-500 px-4 py-2">
                        {employee.phone}
                      </td>
                      <td className="border border-gray-500 px-4 py-2 text-center flex justify-center">
                        <Link
                          to={`/employees/edit/${employee.employeeID}`}
                          className="btn btn-sm btn-warning text-white mr-2 flex items-center"
                          onClick={(e) => e.stopPropagation()} // Prevent navigation to details page
                        >
                          <FaEdit className="mr-1" /> Edit
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEmployee(employee.employeeID);
                          }}
                          className="btn btn-sm btn-error text-white flex items-center"
                        >
                          <FaTrash className="mr-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
