# Employee Management System

## Overview

This project is an **Employee Management System** built with **.NET (Backend)** and **React (Frontend)**. The system allows you to manage employees' information while implementing essential features such as user authentication, employee CRUD operations, and API documentation.

Technologies used:

- **Backend**: .NET Core, Entity Framework, Swagger
- **Frontend**: React, Axios, Daisy UI, Context API

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [System Requirements](#system-requirements)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

---

## Features

- **User Authentication**: Implemented with JWT tokens for secure login and role-based authorization.
- **Employee Management**: CRUD operations for employees (Create, Read, Update, Delete).
- **API**: Backend REST API built with .NET Core and Entity Framework for database management.
- **Frontend**: Developed with React and styled using Daisy UI for a clean and responsive interface.
- **State Management**: Managed using React's Context API for global state across the app.
- **Axios**: Used for making API calls to the backend.
- **Swagger**: API documentation and testing integrated via Swagger.

---

## Technologies Used

### Backend (Server-side)

- **.NET Core**: Framework used to create the Web API.
- **Entity Framework Core**: ORM for interacting with the database.
- **JWT Authentication**: For secure user authentication.
- **Swagger**: Automatically generates API documentation.

### Frontend (Client-side)

- **React**: JavaScript library for building user interfaces.
- **Context API**: For state management across the application.
- **Axios**: For making HTTP requests to the backend API.
- **Daisy UI**: Tailwind CSS components for building a responsive UI.

---

## System Requirements

- **Node.js** (version >= 14)
- **.NET SDK** (version >= 6.0)
- **SQL Server** (or any supported database by Entity Framework)

---

## Installation

### Backend Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/AbiyuNigussie/ems_react_dotnet.git
   cd employee-management-system/API
   ```

2. **Install dependencies**:

   ```bash
   dotnet restore
   ```

3. **Update database connection**:

   - In `appsettings.json`, update the connection string to your local or cloud-based SQL Server.

4. **Apply migrations**:

   ```bash
   dotnet ef database update
   ```

5. **Run the backend server**:
   ```bash
   dotnet run
   ```

### Frontend Setup

1. **Navigate to the frontend directory**:

   ```bash
   cd ../client
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the frontend server**:
   ```bash
   npm start
   ```

---

## Running the Application

Once both backend and frontend servers are up and running, navigate to the following URLs:

- **Backend**: `https://localhost:7194/swagger` (for Swagger API documentation)
- **Frontend**: `http://localhost:5173` (for the React frontend)

---

## API Documentation

API documentation is automatically generated and available at the `/swagger` endpoint of your backend server:

```
https://localhost:7194/swagger
```

Use this to explore and test the available API endpoints, including user authentication and employee management features.

---

## Screenshots

### Landing Page

![Landing Page Screenshot](/screenshots/landing_page.png)

### Signup Page

![Signup Page Screenshot](/screenshots/signup.png)

### Login Page

![login Page Screenshot](/screenshots/login.png)

### Employee Dashboard

![Employee Dashboard Screenshot](/screenshots/employee_dashboard.png)

### Employee Details

![Employee Details Screenshot](/screenshots/employee_detail.png)

### Employee Form

![Employee Form Screenshot](/screenshots/employee_form.png)

### Swagger API

![Swagger API Screenshot](/screenshots/swagger_api.png)

---

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push to your branch.
5. Open a pull request.

---

**Author**: Abiyu Nigussie  
**GitHub**: [https://github.com/AbiyuNigussie](https://github.com/AbiyuNigussie)
