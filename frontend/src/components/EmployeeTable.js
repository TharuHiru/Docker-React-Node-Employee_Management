import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/EmployeeTable.css';

function EmployeeTable() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({});
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      setEmployees((prev) => prev.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error(error);
      alert('Could not delete the employee. Please try again.');
    }
  };
  

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

  // Filter employees based on search term and department
  const filteredEmployees = employees.filter((employee) => {
    const nameMatch = `${employee.firstName} ${employee.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const departmentMatch = selectedDepartment
      ? employee.department === selectedDepartment
      : true;
    return nameMatch && departmentMatch;
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle department filter change
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleEdit = (employee) => {
    setEditMode(employee._id);
    setEditedEmployee(employee);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prev) => ({ ...prev, [name]: value }));
  };

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
    <>
      <button
        type="button"
        onClick={handleBackClick}
        className="back-btn"
        aria-label="Go back to the previous page"
      >
        <span>&larr;</span> Back
      </button>
      <h1 style={{ color: 'white' }}>Employee List</h1>

      {/* Search and Filter Section */}
      <div className="employee-search-filter">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          className="department-select"
        >
          <option value="">All Departments</option>
          {Array.from(new Set(employees.map((employee) => employee.department)))
            .sort()
            .map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
        </select>
      </div>

      <div className="employee-table-container">
        {filteredEmployees.length === 0 ? (
          <p>No employees found.</p>
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
                <th>DOB</th>
                <th>Date of Joining</th>
                <th>Salary</th>
                <th>Designation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
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
    </>
  );
}

export default EmployeeTable;
