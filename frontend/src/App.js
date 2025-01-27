import React, { useState } from 'react'; // Import core library
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import Dashboard from './components/Dashboard'; 

function App() {
  const [employees, setEmployees] = useState([]);

  const addEmployee = (employee) => {
    setEmployees([...employees, { ...employee, id: Date.now() }]);
    toast.success('Employee added successfully!'); // Success toast
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
    toast.error('Employee deleted successfully!'); // Error toast
  };

  const updateEmployee = (id, updatedEmployee) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === id ? { ...employee, ...updatedEmployee } : employee
      )
    );
    toast.info('Employee updated successfully!'); // Info toast
  };

  return (
    <Router>
      <div className="app">
        {/* Toast Container */}
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          {/* Route for the Login page */}
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />

          {/* Route for the Signup page */}
          <Route path="/signup" element={<Signup />} />

          <Route path="/employee-form" element={<EmployeeForm addEmployee={addEmployee} />} />
          <Route path="/employee-table" element={<EmployeeTable />} />

          {/* Route for the main Employee Management System */}
          <Route
            path="/employee-management"
            element={
              <div>
                <h1>Employee Management System</h1>
                <EmployeeForm addEmployee={addEmployee} />
                <EmployeeTable
                  employees={employees}
                  deleteEmployee={deleteEmployee}
                  updateEmployee={updateEmployee}
                />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
