import React, { useState } from "react";
import axios from 'axios';
import background from "../assets/2.png";

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
      const response = await axios.post('http://localhost:5000/api/employees', employee, {
        headers: {
          'Content-Type': 'application/json',
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
    <>
      <style>
        {`
          .form-container {
            background-image: url(${background});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          form {
            max-width: 650px;
            width: 100%;
            background: rgba(255, 255, 255, 0.36); /* Transparent white */
            padding: 60px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
            font-family: Arial, sans-serif;
            color: #333;
          }

          form h1 {
            text-align: center;
            color: rgb(229, 222, 243);
            margin-bottom: 20px;
          }

          form input,
          form select,
          form textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 14px;
          }

          form textarea {
            resize: none;
            height: 80px;
          }

          form input[type="file"] {
            padding: 3px;
          }

          form button {
            background: rgb(45, 15, 110);
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.3s ease, transform 0.2s ease;
          }

          form button:hover {
            background: rgb(30, 10, 90);
            transform: scale(1.05);
          }

          form button:active {
            background: rgb(20, 5, 70);
          }

          @media (max-width: 768px) {
            form {
              padding: 40px;
            }

            form input,
            form select,
            form textarea {
              font-size: 13px;
            }

            form button {
              font-size: 14px;
              padding: 8px 16px;
            }
          }
        `}
      </style>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Add Employee</h1>
          <input
            type="text"
            name="empId"
            placeholder="Emp ID"
            value={employee.empId}
            onChange={handleChange}
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={employee.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={employee.lastName}
            onChange={handleChange}
          />
          <select name="department" value={employee.department} onChange={handleChange}>
            <option value="">--Select Department--</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Engineering">Engineering</option>
          </select>
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={employee.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="mobileNo"
            placeholder="Mobile No"
            value={employee.mobileNo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={employee.country}
            onChange={handleChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={employee.state}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={employee.city}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dob"
            value={employee.dob}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dateOfJoining"
            value={employee.dateOfJoining}
            onChange={handleChange}
          />
          <input type="file" name="photo" onChange={handleChange} />
          <textarea
            name="address"
            placeholder="Address"
            value={employee.address}
            onChange={handleChange}
          ></textarea>
          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={employee.salary}
            onChange={handleChange}
          />
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
    </>
  );
}

export default EmployeeForm;