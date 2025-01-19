import React, { useState } from "react";
import axios from 'axios';
import '../styles/employeeForm.css';

function EmployeeForm({ addEmployee }) {
  const [employee, setEmployee] = useState({
    empId: "",
    firstName: "",
    lastName: "",
    department: "",
    email: "",
    mobileNo: "",
    country: "",
    state: "",
    city: "",
    dob: "",
    dateOfJoining: "",
    photo: null,
    address: "",
    salary: "",
    designation: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setEmployee({ ...employee, [name]: type === "file" ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employee.empId || !employee.firstName || !employee.email) {
      alert("Emp ID, First Name, and Email are required!");
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
        addEmployee(response.data);
        setEmployee({
          empId: "",
          firstName: "",
          lastName: "",
          department: "",
          email: "",
          mobileNo: "",
          country: "",
          state: "",
          city: "",
          dob: "",
          dateOfJoining: "",
          photo: null,
          address: "",
          salary: "",
          designation: "",
        });
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Error adding employee. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Add Employee</h1>
        
        <label htmlFor="empId">Employee ID:</label>
        <input
          type="text"
          name="empId"
          placeholder="Emp ID"
          value={employee.empId}
          onChange={handleChange}
        />

        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={employee.firstName}
          onChange={handleChange}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={employee.lastName}
          onChange={handleChange}
        />

        <label htmlFor="department">Department:</label>
        <select name="department" value={employee.department} onChange={handleChange}>
          <option value="">--Select Department--</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Engineering">Engineering</option>
        </select>

        <label htmlFor="email">Email ID:</label>
        <input
          type="email"
          name="email"
          placeholder="Email ID"
          value={employee.email}
          onChange={handleChange}
        />

        <label htmlFor="mobileNo">Mobile No:</label>
        <input
          type="text"
          name="mobileNo"
          placeholder="Mobile No"
          value={employee.mobileNo}
          onChange={handleChange}
        />

        <label htmlFor="country">Country:</label>
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={employee.country}
          onChange={handleChange}
        />

        <label htmlFor="state">State:</label>
        <input
          type="text"
          name="state"
          placeholder="State"
          value={employee.state}
          onChange={handleChange}
        />

        <label htmlFor="city">City:</label>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={employee.city}
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
          placeholder="Address"
          value={employee.address}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="salary">Salary:</label>
        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={employee.salary}
          onChange={handleChange}
        />

        <label htmlFor="designation">Designation:</label>
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={employee.designation}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
