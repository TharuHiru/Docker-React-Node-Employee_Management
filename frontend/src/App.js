import React, { useState } from 'react'; // import the core library
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components

import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';

// employees is the state variable to store an employee object and setEmployees is a function to update the employee state
function App() {
  const [employees, setEmployees] = useState([]);

  const addEmployee = (employee) => {
    setEmployees([...employees, { ...employee, id: Date.now() }]);
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const updateEmployee = (id, updatedEmployee) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === id ? { ...employee, ...updatedEmployee } : employee
      )
    );
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Route for the Login page */}
          <Route path="/" element={<Login />} />

          {/* Route for the Signup page */}
          <Route path="/signup" element={<Signup />} />

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