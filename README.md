# Employee Management System

This is a simple Employee Management System built with **Node.js**, **Express**, **MongoDB**, and **React.js**. It allows the management of employee details, including adding, viewing, and updating employee information such as employee ID, name, email, salary, and more.

## Features

- **Add Employee**: Add new employees with all necessary details, including their photo.
- **Employee List**: View a list of all employees in the system.
- **Employee Details**: View, update, and delete employee details.
- **Validation**: Form validation to ensure data integrity (e.g., email format, required fields, etc.).
- **Toast Notifications**: Informative messages shown to the user for success or error events.

## Technologies Used

- **Backend**:
  - **Node.js**: JavaScript runtime for building the server-side application.
  - **Express.js**: Web framework for Node.js to handle HTTP requests.
  - **MongoDB**: NoSQL database to store employee data.
  - **Mongoose**: MongoDB object modeling tool for Node.js.
  - **Multer**: Middleware to handle file uploads (for employee photos).
  
- **Frontend**:
  - **React.js**: JavaScript library for building the user interface.
  - **React Toastify**: Library for showing toast notifications.
  - **Axios**: HTTP client for making API requests to the backend.

## Setup Instructions

### Prerequisites

- Node.js (version 14 or later)
- MongoDB (can be run locally or use a cloud-based MongoDB like Atlas)

### Backend Setup

1. **Clone the repository**:

    ```bash
    git clone <your-repository-url>
    cd employee-management
    ```

2. **Navigate to the backend folder**:

    ```bash
    cd backend
    ```

3. **Install dependencies**:

    ```bash
    npm install
    ```

4. **Set up MongoDB**:
   - Ensure you have MongoDB running locally, or you can use a cloud instance (MongoDB Atlas).
   - Update the connection string in the `backend/config/db.js` file, if necessary.

5. **Run the server**:

    ```bash
    npm start
    ```

    The backend will start on `http://localhost:5000`.

### Frontend Setup

1. **Navigate to the frontend folder**:

    ```bash
    cd frontend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Run the React app**:

    ```bash
    npm start
    ```

    The frontend will run on `http://localhost:3000`.

### API Endpoints

- **POST /api/employees**: Add a new employee.
- **GET /api/employees**: Get the list of all employees.
- **GET /api/employees/:empId**: Get employee details by employee ID.
- **PUT /api/employees/:empId**: Update employee details.
- **DELETE /api/employees/:empId**: Delete employee details.

### Project structure
employee-management/ │ ├── backend/ │ ├── config/ │ │ └── db.js # MongoDB connection setup │ ├── models/ │ │ └── EmployeeDetails.js # Employee schema │ ├── routes/ │ │ └── employeeRoutes.js # Routes for employee operations │ ├── app.js # Express application setup │ └── server.js # Server entry point │ └── frontend/ ├── src/ │ ├── components/ │ │ ├── EmployeeForm.js # Form component for adding employees │ │ └── EmployeeList.js # Component to display employee list │ ├── App.js # Main app component │ └── index.js # React entry point └── README.md # Project documentation file
dd
