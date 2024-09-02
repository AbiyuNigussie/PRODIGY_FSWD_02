import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7230",
  header: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async (username, password) => {
  try {
    const response = await api.post("/api/auth/authentication", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const registerUser = async (
  username,
  email,
  password,
  role = "User"
) => {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const getUserData = async () => {
  try {
    const response = await api.get("/api/user/me");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user data"
    );
  }
};

export const getEmployees = async () => {
  try {
    const response = await api.get("/api/employee");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user data"
    );
  }
};

export const getEmployeeById = async (id, token) => {
  try {
    const response = await api.get(`/api/employee/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user data"
    );
  }
};

export const updateEmployee = async (id, employee, token) => {
  try {
    const response = await api.put(`/api/employee/${id}`, employee, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user data"
    );
  }
};

export const createEmployee = async (employeeData, token) => {
  try {
    const response = await api.post("/api/employee", employeeData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
};

export const deleteEmployee = async (employeeId, token) => {
  try {
    const response = await api.delete(`/api/employee/${employeeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete employee:", error);
    throw error;
  }
};

export default api;
