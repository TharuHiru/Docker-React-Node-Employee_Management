import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/EmployeeTable.css';

function EmployeeTable({ deleteEmployee }) {
  const navigate = useNavigate(); // Navigation hook
  const [editMode, setEditMode] = useState(null); // Tracks the employee being edited
  const [editedEmployee, setEditedEmployee] = useState({}); // Stores edited employee data
  const [employees, setEmployees] = useState([]); // Stores employee list

  // Fetch employee data on component mount
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

  // Navigate back to the previous page
  const handleBackClick = () => {
    navigate(-1);
  };

  // Enable edit mode for a specific employee
  const handleEdit = (employee) => {
    setEditMode(employee._id);
    setEditedEmployee(employee);
  };

  // Update the editedEmployee state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Update employee data
  const handleUpdate = async () => {
    if (!editedEmployee.empId || !editedEmployee.firstName || !editedEmployee.email) {
      alert('Emp ID, First Name, and Email are required!');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/employees/${editMode}`, editedEmployee);
      if (response.status === 200) {
        setEmployees((prev) =>
          prev.map((employee) => (employee._id === editMode ? editedEmployee : employee))
        );
        setEditMode(null); // Exit edit mode
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Error updating employee. Please try again.');
    }
  };

  return (
    <div className="employee-table-container">
      <button
        type="button"
        onClick={handleBackClick}
        className="back-btn"
        aria-label="Go back to the previous page"
      >
        <span>&larr;</span> Back
      </button>
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
                    {Object.keys(editedEmployee).map((key) => (
                      <td key={key}>
                        <input
                          type={key === 'dob' || key === 'dateOfJoining' ? 'date' : 'text'}
                          name={key}
                          value={editedEmployee[key]}
                          onChange={handleChange}
                          disabled={key === 'empId'}
                        />
                      </td>
                    ))}
                    <td>
                      <button className="update-btn" onClick={handleUpdate}>
                        Save
                      </button>
                      <button
                        className="update-btn cancel-btn"
                        onClick={() => setEditMode(null)}
                      >
                        Cancel
                      </button>
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
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(employee)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteEmployee(employee._id)}
                      >
                        Delete
                      </button>
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
