import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/employeeForm.css';

function EmployeeForm({ addEmployee }) {
  const [employee, setEmployee] = useState({
    empId: "",
    firstName: "",
    lastName: "",
    department: "",
    email: "",
    mobileNo: "",
    dob: "",
    dateOfJoining: "",
    photo: null,
    address: "",
    salary: "",
    designation: "",
  });

  const navigate = useNavigate(); // Navigation hook

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setEmployee({ ...employee, [name]: type === "file" ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!employee.empId || !employee.firstName || !employee.email) {
      alert("Employee ID, First Name, and Email are required!");
      return;
    }

    try {
      const formData = new FormData();
      for (const key in employee) {
        formData.append(key, employee[key]);
      }

      const response = await axios.post('http://localhost:5000/api/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('Employee added successfully');
        addEmployee(response.data); // Pass to parent component
        setEmployee({
          empId: "",
          firstName: "",
          lastName: "",
          department: "",
          email: "",
          mobileNo: "",
          dob: "",
          dateOfJoining: "",
          photo: null,
          address: "",
          salary: "",
          designation: "",
        });
        // Navigate to dashboard or another page if needed
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Error adding employee. Please try again.');
    }
  };

  const handleBackClick = () => {
    navigate('/dashboard'); // or any other route you want to navigate to
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="employee-form">
      <button type="button" onClick={handleBackClick} className="back-btn">
      <span>&larr;</span> Back
      </button>
      <h1>Add Employee</h1>
        

        <label htmlFor="empId">Employee ID:</label>
        <input
          type="text"
          name="empId"
          placeholder="Enter Employee ID"
          value={employee.empId}
          onChange={handleChange}
          required
        />

        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name="firstName"
          placeholder="Enter First Name"
          value={employee.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          placeholder="Enter Last Name"
          value={employee.lastName}
          onChange={handleChange}
        />

        <label htmlFor="department">Department:</label>
        <select name="department" value={employee.department} onChange={handleChange} required>
          <option value="">--Select Department--</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Engineering">Engineering</option>
        </select>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={employee.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="mobileNo">Mobile No:</label>
        <input
          type="text"
          name="mobileNo"
          placeholder="Enter Mobile Number"
          value={employee.mobileNo}
          onChange={handleChange}
        />

        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={employee.dob}
          onChange={handleChange}
        />

        <label htmlFor="dateOfJoining">Date of Joining:</label>
        <input
          type="date"
          name="dateOfJoining"
          value={employee.dateOfJoining}
          onChange={handleChange}
        />

        <label htmlFor="photo">Photo:</label>
        <input type="file" name="photo" onChange={handleChange} />

        <label htmlFor="address">Address:</label>
        <textarea
          name="address"
          placeholder="Enter Address"
          value={employee.address}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="salary">Salary:</label>
        <input
          type="text"
          name="salary"
          placeholder="Enter Salary"
          value={employee.salary}
          onChange={handleChange}
        />

        <label htmlFor="designation">Designation:</label>
        <input
          type="text"
          name="designation"
          placeholder="Enter Designation"
          value={employee.designation}
          onChange={handleChange}
        />

        <button type="submit" className="submit-btn">Submit</button>

        
      </form>
    </div>
  );
}

export default EmployeeForm;
