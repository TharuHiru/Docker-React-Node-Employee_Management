//Import react and hooks from 'react' module
import React, { useState } from 'react';

//Function for inintializing the state
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
    designation: ""
    });
  //"Employee" is an object to save the employee data
  //"Set employee is the function to uodate the employee object" , Initially Both name and position are empty strings.

  //A function that runs when the user types in a form field.
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setEmployee({ ...employee, [name]: type === "file" ? files[0] : value });

  };

  //Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); //Prevent the default browser behavior of reloading the page

    //Form validation part
    if (!employee.empId || !employee.firstName || !employee.email) {
      alert("Emp ID, First Name, and Email are required!");
      return;
    }

    addEmployee(employee); // Calls the addEmployee function (passed as a prop) with the form data.
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
      designation: ""
     }); //Reset the form
  };

  return (
    <form onSubmit={handleSubmit}
    style={{
        maxWidth: "650px",
        margin: "auto",
        background: "#f9f9f9",
        padding: "60px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
        > {/*Calls handleSubmit when the form is submitted.*/}
         <h2 style={{ textAlign: "center", color: "rgb(45, 15, 110)", marginBottom: "20px" }}>
        Add Employee
      </h2>

      <input
        type="text"
        name="empId"
        placeholder="Emp ID"
        value={employee.empId} // Binds the input value to the name field in the state.
        onChange={handleChange}// Updates the state whenever the user types in the input.
        style={inputStyle}
      />
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={employee.firstName}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={employee.lastName}
        onChange={handleChange}
        style={inputStyle}
      />
      <select
        name="department"
        value={employee.department}
        onChange={handleChange}
        style={inputStyle}
      >
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
        style={inputStyle}
      />
      <input
        type="text"
        name="mobileNo"
        placeholder="Mobile No"
        value={employee.mobileNo}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={employee.country}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={employee.state}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={employee.city}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="date"
        name="dob"
        placeholder="Date of Birth"
        value={employee.dob}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="date"
        name="dateOfJoining"
        placeholder="Date of Joining"
        value={employee.dateOfJoining}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="file"
        name="photo"
        onChange={handleChange}
        style={inputStyle}
      />
      <textarea
        name="address"
        placeholder="Address"
        value={employee.address}
        onChange={handleChange}
        style={{
          ...inputStyle,
          resize: "none",
          height: "80px",
        }}
      ></textarea>
      <input
        type="text"
        name="salary"
        placeholder="Salary"
        value={employee.salary}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="text"
        name="designation"
        placeholder="Designation"
        value={employee.designation}
        onChange={handleChange}
        style={inputStyle}
      />
      <button
        type="submit"
        style={{
          background: "rgb(255, 255, 255)",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Submit
      </button>
    </form>
  );
}
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "14px",
};

export default EmployeeForm; //Makes the EmployeeForm component available for use in other files. 
