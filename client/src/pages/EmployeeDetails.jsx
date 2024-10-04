import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getEmployeeById } from "../Services/apiService";
import { FaArrowLeft, FaEdit } from "react-icons/fa";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const data = await getEmployeeById(id);
        const formattedHireDate = data.hireDate
          ? data.hireDate.split("T")[0]
          : "";
        data.hireDate = formattedHireDate;
        setEmployee(data);
      } catch (error) {
        console.error("Failed to fetch employee details:", error);
        setError("Failed to fetch employee details");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="container mx-auto">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <Link
            to="/dashboard"
            className="text-blue-400 hover:underline flex items-center mb-6"
          >
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </Link>

          <h1 className="text-4xl font-bold mb-6 text-white text-center">
            Employee Details
          </h1>

          <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-gray-300">
            <h2 className="text-2xl font-bold mb-4">
              {employee.firstName} {employee.lastName}
            </h2>
            <p className="mb-2">
              <strong>Email:</strong> {employee.email}
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> {employee.phone}
            </p>
            <p className="mb-2">
              <strong>Department:</strong> {employee.department}
            </p>
            <p className="mb-2">
              <strong>HireDate:</strong> {employee.hireDate}
            </p>
            <p className="mb-2">
              <strong>Salary:</strong> {employee.salary}
            </p>

            <Link
              to={`/employees/edit/${employee.employeeID}`}
              className="btn btn-warning bg-yellow-600 hover:bg-yellow-700 text-white flex items-center mt-6"
            >
              <FaEdit className="mr-2" /> Edit Employee
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
