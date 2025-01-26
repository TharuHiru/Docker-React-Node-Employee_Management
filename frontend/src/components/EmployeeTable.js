import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/EmployeeTable.css';

//functional component employee table
function EmployeeTable() {
  const navigate = useNavigate(); // go back to previous page
  const [editMode, setEditMode] = useState(null); //Tracks which employee is being edited (stores their ID).
  const [editedEmployee, setEditedEmployee] = useState({}); //Stores the details of the employee being edited.
  const [employees, setEmployees] = useState([]); // list of all the employees
  const [searchTerm, setSearchTerm] = useState(''); // search keyword typed by the user
  const [selectedDepartment, setSelectedDepartment] = useState(''); // track the selectef department


  // delete an employee from the given ID
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

  //handle the edit mode of the employee
  const handleEdit = (employee) => {
    const editableFields = {
      empId: employee.empId || '',
      firstName: employee.firstName || '',
      lastName: employee.lastName || '',
      address: employee.address || '',
      department: employee.department || '',
      email: employee.email || '',
      mobileNo: employee.mobileNo || '',
      dob: employee.dob ? new Date(employee.dob).toISOString().split('T')[0] : '', // Handle date formatting
      dateOfJoining: employee.dateOfJoining ? new Date(employee.dateOfJoining).toISOString().split('T')[0] : '',
      salary: employee.salary || '',
      designation: employee.designation || '',
    };
    setEditMode(employee._id);
    setEditedEmployee(editableFields);
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
                <th>Address</th>
                <th>Department</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>DOB</th>
                <th>Date of Joining</th>
                <th>Salary</th>
                <th>Designation</th>
                <th>Profile Photo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
  {filteredEmployees.map((employee) => {
    const isEditing = editMode === employee._id;

    return (
      <tr key={employee._id}>
        {isEditing ? (
          <>
            <td>
              <span>{editedEmployee.empId}</span>
            </td>
            <td>
              <input
                type="text"
                name="firstName"
                value={editedEmployee.firstName || ''}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="lastName"
                value={editedEmployee.lastName || ''}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="address"
                value={editedEmployee.address || ''}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="department"
                value={editedEmployee.department || ''}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="email"
                name="email"
                value={editedEmployee.email || ''}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="mobileNo"
                value={editedEmployee.mobileNo || ''}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="date"
                name="dob"
                value={editedEmployee.dob || ''}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="date"
                name="dateOfJoining"
                value={editedEmployee.dateOfJoining || ''}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="number"
                name="salary"
                value={editedEmployee.salary || ''}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="designation"
                value={editedEmployee.designation || ''}
                onChange={handleChange}
              />
            </td>
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
            <td>{employee.address}</td>
            <td>{employee.department}</td>
            <td>{employee.email}</td>
            <td>{employee.mobileNo}</td>
            <td>{employee.dob}</td>
            <td>{employee.dateOfJoining}</td>
            <td>{employee.salary}</td>
            <td>{employee.designation}</td>
            <td>
              <img
                src={`http://localhost:5000/uploads/${employee.photo}`}
                alt="Profile"
                className="profile-photo"
              />
            </td>
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
    );
  })}
</tbody>

          </table>
        )}
      </div>
    </>
  );
}

export default EmployeeTable;
