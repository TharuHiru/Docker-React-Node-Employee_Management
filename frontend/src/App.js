import React, { useState } from 'react'; // import the core library

//import the two components from the components folder
import EmployeeForm from './components/EmployeeForm'; 
import EmployeeTable from './components/EmployeeTable';

// employees is the state variable to store an employee object and stEmployee is a function to update the employee state
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
    <div className="app">
      <h1>Employee Management System</h1>
      <EmployeeForm addEmployee={addEmployee} />
      <EmployeeTable
        employees={employees}
        deleteEmployee={deleteEmployee}
        updateEmployee={updateEmployee}
      />
    </div>
  );
}

export default App;
