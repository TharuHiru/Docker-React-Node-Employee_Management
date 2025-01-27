import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/employeeForm.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";

// form data for the new employee
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

  //handle changes into input fields
  const handleChange = (e) => {
    const { name, value, type, files } = e.target; // the specific input field

    // if it is a file input, get the first file or get the value
    let updatedValue;
  
    if (type === "file") {
      updatedValue = files[0];
    } else {
      // If it's a number field, convert the value to a number
      if (name === "salary" || name === "mobileNo") {
        updatedValue = value ? parseFloat(value) : "";
      } else {
        updatedValue = value;
      }
    }

    setEmployee({ ...employee, [name]: updatedValue });
  };

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Basic validation
    const nameRegex = /^[a-zA-Z]+$/;
    const mobileRegex = /^[0-9]+$/;
    const salaryRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    const designationRegex = /^[A-Za-z0-9\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    const dob = new Date(employee.dob);
    const dateOfJoining = new Date(employee.dateOfJoining);

    if (!employee.empId || !employee.firstName || !employee.email) {
      toast.error("Employee ID, First Name, and Email are required!");
      return;
    } 
    else if (employee.empId.length < 5) {
      toast.error("Employee ID must be at least 5 characters long!");
      return;
    }
    else if (!nameRegex.test(employee.firstName)) {
      toast.error("First Name must contain only valid characters!");
      return;
    }
    else if (!nameRegex.test(employee.lastName)) {
      toast.error("Last Name must contain only valid characters!");
      return;
    }
    else if (!emailRegex.test(employee.email)){
      toast.error("please insert valid email address")
      return;
    }
    else if (employee.mobileNo.length < 10) {
      toast.error("Please enter a valid Mobile Number!");
      return;
    }
    else if (!mobileRegex.test(employee.mobileNo)) {
      toast.error("Please enter a valid Mobile Number!");
      return;
    } 
    else if (dob >= new Date()) {
      toast.error("Date of Birth must be a past date!");
      return;
    }
    else if (dateOfJoining >= new Date()) {
      toast.error("Date of Joining must be a past date!");
      return;
    }
    else if (!salaryRegex.test(employee.salary)) {
      toast.error("Salary must be a valid number with up to two decimal places!");
      return;
    }
    else if (employee.designation && !designationRegex.test(employee.designation)) {
      toast.error("Designation should not contain special characters!");
      return;
    }
    
    try {
      const formData = new FormData(); // Create a new FormData object
      for (const key in employee) {
        formData.append(key, employee[key]); // Append all the fields
      }

      //send form data into backend
      const response = await axios.post('http://localhost:5000/api/employees', formData, { //API endpoint where the data is send
        headers: {
          'Content-Type': 'multipart/form-data', //Tells the server to expect file and form data.
        },
      });

      // if success then alert and add employee
      if (response.status === 201) {
        toast.success('Employee added successfully');
        addEmployee(response.data); // Pass to parent component
        setEmployee({
          // reset the form
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
        // Navigate to dashboard 
        navigate('/dashboard');
      }
      // handle any error
    } catch (error) {
      console.error('Error adding employee:', error);
      
      // Check if error response has a specific message (Employee ID already exists)
      if (error.response && error.response.data.message) {
        if (error.response.data.message.includes('Employee ID already exists.')) {
          toast.error('Employee ID already exists. Please use a different ID.');
        } else {
          toast.error('Error adding employee. Please try again.');
        }
      } else {
        toast.error('Error adding employee. Please try again.');
      }
    }
  };

  const handleBackClick = () => {
    navigate('/dashboard'); // Navigate to dashboard
  };

  // HTML structure for the form
  return (
    <div className="form-container">
      <Helmet>
        <title>Add Employee | Employee Management System</title>
        <meta name="description" content="Form to add a new employee" />
      </Helmet>
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
        <input 
          type="file" 
          name="photo" 
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleChange} />

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
