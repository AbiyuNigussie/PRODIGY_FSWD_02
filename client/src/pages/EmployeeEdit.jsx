import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "../Services/apiService";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaCalendarAlt,
  FaDollarSign,
  FaBuilding,
  FaSave,
} from "react-icons/fa";
import { useAuth } from "../providers/AuthProvider";

const EmployeeEdit = () => {
  const { token } = useAuth();
  const { id } = useParams(); // Employee ID from the URL
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitled: "",
    hireDate: "",
    salary: "",
    department: "",
  });
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const data = await getEmployeeById(id, token);
        const formattedHireDate = data.hireDate
          ? data.hireDate.split("T")[0]
          : "";
        data.hireDate = formattedHireDate;
        setEmployee(data);
      } catch (error) {
        setNotification({
          message: "Failed to fetch employee data.",
          type: "error",
        });
      }
    };

    fetchEmployeeData();
  }, [id, token]);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      employee.firstName &&
      employee.lastName &&
      employee.email &&
      employee.phone &&
      employee.jobTitled &&
      employee.hireDate &&
      employee.salary &&
      employee.department
    ) {
      try {
        await updateEmployee(id, employee, token);
        setNotification({
          message: "Employee updated successfully!",
          type: "success",
        });
      } catch (error) {
        setNotification({
          message: "Failed to update employee. Please try again.",
          type: "error",
        });
      }
    } else {
      setNotification({
        message: "Please fill in all the required fields.",
        type: "error",
      });
    }
  };

  const closeNotification = () => {
    setNotification({ message: "", type: "" });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center relative">
      {notification.message && (
        <div
          className={`fixed top-6 right-6 p-4 rounded-lg shadow-lg text-white z-50 ${
            notification.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <span>{notification.message}</span>
          <button className="ml-4 font-bold" onClick={closeNotification}>
            X
          </button>
        </div>
      )}

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Edit Employee
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-400 flex items-center mb-2">
              <FaUser className="mr-2" /> First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={employee.firstName}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter first name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-400 flex items-center mb-2">
              <FaUser className="mr-2" /> Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={employee.lastName}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter last name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-400 flex items-center mb-2">
              <FaEnvelope className="mr-2" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-400 flex items-center mb-2">
              <FaPhone className="mr-2" /> Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={employee.phone}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-400 flex items-center mb-2">
              <FaBriefcase className="mr-2" /> Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              value={employee.jobTitled}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter job title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-400 flex items-center mb-2">
              <FaDollarSign className="mr-2" /> Salary
            </label>
            <input
              type="number"
              name="salary"
              value={employee.salary}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter salary"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-400 flex items-center mb-2">
              <FaBuilding className="mr-2" /> Department
            </label>
            <input
              type="text"
              name="department"
              value={employee.department}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter department"
              required
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-400 flex items-center mb-2">
              <FaCalendarAlt className="mr-2" /> Hire Date
            </label>
            <input
              type="date"
              name="hireDate"
              value={employee.hireDate}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center"
          >
            <FaSave className="mr-2" /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeEdit;
