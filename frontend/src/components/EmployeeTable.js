import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EmployeeTable.css';

// Defines the EmployeeTable component
function EmployeeTable({ deleteEmployee, updateEmployee }) {
  // Tracks the ID of the employee currently being edited
  const [editMode, setEditMode] = useState(null);
  // Stores the details of the employee currently being edited
  const [editedEmployee, setEditedEmployee] = useState({});
  // Stores the list of employees
  const [employees, setEmployees] = useState([]);

  // Fetch employee data from the backend when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  // Handle the edit button of the table rows
  const handleEdit = (employee) => {
    setEditMode(employee._id);
    setEditedEmployee(employee);
  };

  // Handle changes to the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({ ...editedEmployee, [name]: value });
  };

  // Handle the update button in the table
  const handleUpdate = async () => {
    // Validate required fields
    if (!editedEmployee.empId || !editedEmployee.firstName || !editedEmployee.email) {
      alert('Emp ID, First Name, and Email are required!');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/employees/${editMode}`, editedEmployee);
      if (response.status === 200) {
        setEmployees(employees.map((employee) => (employee._id === editMode ? editedEmployee : employee)));
        setEditMode(null); // Exit edit mode
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Error updating employee. Please try again.');
    }
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
              <tr key={employee._id}>
                {editMode === employee._id ? (
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