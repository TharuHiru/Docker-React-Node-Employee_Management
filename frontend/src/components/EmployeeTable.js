// Import React and hooks from 'react' module
import React, { useState } from 'react';

// Defines the EmployeeTable component
function EmployeeTable({ employees, deleteEmployee, updateEmployee }) {
  // Tracks the ID of the employee currently being edited
  const [editMode, setEditMode] = useState(null);
  // Stores the details of the employee currently being edited
  const [editedEmployee, setEditedEmployee] = useState({});

  // Handle the edit button of the table rows
  const handleEdit = (employee) => {
    setEditMode(employee.Id);
    setEditedEmployee(employee);
  };

  // Handle changes to the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({ ...editedEmployee, [name]: value });
  };

  // Handle the update button in the table
  const handleUpdate = () => {
    // Validate required fields
    if (!editedEmployee.empId || !editedEmployee.firstName || !editedEmployee.email) {
      alert('Emp ID, First Name, and Email are required!');
      return;
    }
    updateEmployee(editMode, editedEmployee);
    setEditMode(null); // Exit edit mode
  };

  return (
    <div>
      <h2>Employee List</h2>
      {employees.length === 0 ? (
        <p>No employees added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>DOB</th>
              <th>Date of Joining</th>
              <th>Salary</th>
              <th>Designation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.Id}>
                {editMode === employee.Id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="empId"
                        value={editedEmployee.empId}
                        onChange={handleChange}
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="firstName"
                        value={editedEmployee.firstName}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="lastName"
                        value={editedEmployee.lastName}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <select
                        name="department"
                        value={editedEmployee.department}
                        onChange={handleChange}
                      >
                        <option value="">--Select--</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                        <option value="Engineering">Engineering</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="email"
                        name="email"
                        value={editedEmployee.email}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="mobileNo"
                        value={editedEmployee.mobileNo}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="country"
                        value={editedEmployee.country}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="state"
                        value={editedEmployee.state}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="city"
                        value={editedEmployee.city}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="dob"
                        value={editedEmployee.dob}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="dateOfJoining"
                        value={editedEmployee.dateOfJoining}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="salary"
                        value={editedEmployee.salary}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="designation"
                        value={editedEmployee.designation}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <button onClick={handleUpdate}>Save</button>
                      <button onClick={() => setEditMode(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{employee.empId}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.department}</td>
                    <td>{employee.email}</td>
                    <td>{employee.mobileNo}</td>
                    <td>{employee.country}</td>
                    <td>{employee.state}</td>
                    <td>{employee.city}</td>
                    <td>{employee.dob}</td>
                    <td>{employee.dateOfJoining}</td>
                    <td>{employee.salary}</td>
                    <td>{employee.designation}</td>
                    <td>
                      <button onClick={() => handleEdit(employee)}>Edit</button>
                      <button onClick={() => deleteEmployee(employee.empId)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeTable;
