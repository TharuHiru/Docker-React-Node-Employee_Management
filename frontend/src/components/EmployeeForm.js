import React, { useState } from 'react';

function EmployeeForm({ addEmployee }) {
  const [employee, setEmployee] = useState({ name: '', position: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employee.name || !employee.position) {
      alert('All fields are required!');
      return;
    }
    addEmployee(employee);
    setEmployee({ name: '', position: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={employee.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        value={employee.position}
        onChange={handleChange}
      />
      <button type="submit">Add Employee</button>
    </form>
  );
}

export default EmployeeForm;
